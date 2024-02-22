import Card from "../UI/Card";
import styles from "./LiveChatPopup.module.css";
import { useSelector } from "react-redux";

const LiveChatPopup = () => {
  const isDisplay = useSelector((state) => state.liveChat.isDisplay);
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
            <div>
              <button className="btn btn-warning">Let's Chat App</button>
            </div>
          </header>

          <main className={styles["main"]}>
            <div className="mt-3"></div>
            <div className={`${styles["msg"]} ${styles["msg-user"]}`}>
              <p className="p-2 mb-0">Xin chào</p>
            </div>
            <div className={`${styles["msg"]} ${styles["msg-user"]}`}>
              <p className="p-2 mb-0">Làm sao để xem sản phẩm</p>
            </div>
            <div className={`${styles["msg"]} ${styles["msg-admin"]}`}>
              <p className="p-2 mb-0">Chào bạn</p>
            </div>
            <div className={`${styles["msg"]} ${styles["msg-admin"]}`}>
              <p className="p-2 mb-0">
                Bạn có thể vào mục shop để xem sản phẩm
              </p>
            </div>
            <div className={`${styles["msg"]} ${styles["msg-user"]}`}>
              <p className="p-2 mb-0">Cảm ơn admin</p>
            </div>
            <div className={`${styles["msg"]} ${styles["msg-admin"]}`}>
              <p className="p-2 mb-0">Không có gì ạ</p>
            </div>
          </main>

          <form className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your message..."
            />
            <button className="btn btn-warning">Send</button>
          </form>
        </div>
      </Card>
    </>
  );
};

export default LiveChatPopup;
