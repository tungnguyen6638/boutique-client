import HistoryItem from "./HistoryItem";
import styles from "./HistoryOrders.module.css";
import NoOrder from "../../pages/error/NoOrder";
import { fetchData, fetchUrl } from "../../helper/fetchUrl";
import { useEffect, useState } from "react";
import { getUser } from "../../helper/getUser";
import openSocket from "socket.io-client";

const HistoryOrders = () => {
  const user = getUser();
  const [error, setError] = useState(null);
  const [listOrder, setListOrder] = useState([]);

  const getOrders = async () => {
    const res = await fetchData({
      url: fetchUrl("FIND_ORDERS"),
      method: "POST",
      body: JSON.stringify({ email: user.email, password: user.password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.hasError) {
      setError(res.message);
    } else {
      setError(null);
      setListOrder([...res.orders]);
    }
  };

  useEffect(() => {
    getOrders();

    const socket = openSocket(fetchUrl("SERVER_DOMAIN"), {
      transports: ["websocket", "polling", "flashsocket"],
    });

    socket.on("order", (o) => {
      if (o.action === "add") {
        setListOrder([...listOrder, o.order]);
      }
    });
  }, []);

  return (
    <>
      <section className="my-5">
        <div className="container overflow-auto">
          <table
            className={`text-center text-wrap table table-striped ${styles["tbl"]}`}
          >
            <thead>
              <tr>
                <th>ID ORDER</th>
                <th>ID USER</th>
                <th>NAME</th>
                <th>PHONE</th>
                <th>ADDRESS</th>
                <th>TOTAL</th>
                <th>DELIVERY</th>
                <th>STATUS</th>
                <th>DETAIL</th>
              </tr>
            </thead>
            <tbody>
              {listOrder &&
                listOrder.map((historyItem) => {
                  return (
                    <HistoryItem key={historyItem._id} item={historyItem} />
                  );
                })}
            </tbody>
          </table>
          {listOrder.length === 0 && <NoOrder />}
          {error && <p className="text-center text-danger">{error}</p>}
        </div>
      </section>
    </>
  );
};

export default HistoryOrders;
