import Card from "../UI/Card";
import styles from "./LiveChatPopup.module.css";
import { useSelector } from "react-redux";
import openSocket from "socket.io-client";
import { fetchUrl, fetchData } from "../../helper/fetchUrl";
import { useEffect, useState } from "react";

const LiveChatPopup = () => {
  const isDisplay = useSelector((state) => state.liveChat.isDisplay);
  // Lấy roomId từ localstorage
  const roomId = JSON.parse(localStorage.getItem("roomId")) || null;
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  const socket = openSocket(fetchUrl("SERVER_DOMAIN"), {
    transports: ["websocket"],
  });

  // Lấy chatRoom dựa theo roomId đc lưu ở localStorage
  const getChatRoom = async () => {
    const res = await fetchData({
      url: fetchUrl("GET_CHAT_ROOM", roomId),
    });

    if (res.hasError) {
      setError("No messages");
    } else {
      setError(null);
      setMessages([...res.chatRoom.chatMessages]);
    }
  };

  useEffect(() => {
    getChatRoom();

    socket.on("chat", (c) => {
      if (c.action === "res-to-all") {
        console.log(c.room._id);
        console.log(roomId);
        if (c.room._id === roomId) {
          setMessages([...c.room.chatMessages]);
        }
      }
    });
  }, []);

  useEffect(() => {
    const last = document.getElementsByClassName("last") || null;
    if (last.length !== 0) {
      last[0].scrollIntoView();
    }
  }, [messages, isDisplay]);

  const clientChatHandler = (e) => {
    e.preventDefault();
    const message = e.target.message.value;

    // Trường hợp user nhập vào /end thì sẽ đóng room
    // Xóa room khỏi database
    if (message === "/end") {
      socket.emit("chat", {
        action: "req-delete-from-client",
        roomId: roomId,
      });
      e.target.message.value = "";
      return;
    }

    // emit tới server, nếu lần đầu thì roomId sẽ là mảng rỗng, bên server sẽ xử lý và tạo room
    // Những lần sau server đã gửi roomId thì chỉ việc giao tiếp với server qua roomId đó
    socket.emit("chat", {
      action: "req-from-client",
      message: message,
      roomId: roomId,
    });

    socket.on("chat", (c) => {
      if (c.action === "res-to-client") {
        setError(null);
        // Server sẽ trả cho client roomId và mảng messages,
        // client sẽ lưu roomId vào localStorage để khi load lại trang thì vẫn còn roomId để get lại tin nhắn từ server
        // Đồng thời render messages
        localStorage.setItem("roomId", JSON.stringify(c.roomId));
        setMessages([...c.messages]);
      }

      if (c.action === "res-delete-to-all") {
        getChatRoom();
      }
    });

    e.target.message.value = "";
  };

  return (
    <>
      <Card
        className={`p-4 ${styles["popup"]} ${!isDisplay && styles["hidden"]}`}
      >
        <div>
          <header className="d-flex gap-5 align-items-center justify-content-between pb-4 border-bottom border-warning">
            <div>
              <p className={`${styles["supporter-name"]} mb-0`}>
                Customer Support
              </p>
            </div>
          </header>

          <main className={styles["main"]}>
            <div className="my-3 d-flex flex-column gap-3">
              {error ? (
                <p className="text-danger">{error}</p>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <div
                      id="chat-box"
                      key={message._id}
                      className={`${styles["msg"]} ${
                        message.role === "client"
                          ? "rounded align-self-end me-4 bg-warning"
                          : "rounded align-self-start ms-4 bg-secondary"
                      } ${index === messages.length - 1 && "last"}`}
                    >
                      <p
                        className={`p-2 mb-0 ${
                          message.role !== "client" ? "text-white" : "text-dark"
                        }`}
                      >
                        {message.message}
                      </p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </main>

          <form className="input-group mt-2" onSubmit={clientChatHandler}>
            <input
              type="text"
              className="form-control"
              name="message"
              placeholder="Enter your message..."
              autoComplete="off"
            />
            <button className="btn btn-warning">Send</button>
          </form>
        </div>
      </Card>
    </>
  );
};

export default LiveChatPopup;
