import { useNavigate } from "react-router-dom";
import styles from "./HistoryItem.module.css";

const HistoryItem = ({ item }) => {
  const navigate = useNavigate();

  const viewDetailOrderHandler = async (orderId) => {
    navigate(`/order-detail/${orderId}`);
  };

  return (
    <>
      <tr className={`${styles["order-item"]}`}>
        <td>{item._id}</td>
        <td>{item.user}</td>
        <td>{item.buyerName}</td>
        <td>{item.buyerPhone}</td>
        <td>{item.buyerAddress}</td>
        <td>{Number(item.total).toLocaleString("de-DE")} VND</td>
        <td>{item.deliveryStatus}</td>
        <td>{item.payStatus}</td>
        <td>
          <button
            onClick={(e) => {
              e.preventDefault();
              viewDetailOrderHandler(item._id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-eye-fill"
              viewBox="0 0 16 16"
            >
              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
            </svg>
          </button>
        </td>
      </tr>
    </>
  );
};

export default HistoryItem;
