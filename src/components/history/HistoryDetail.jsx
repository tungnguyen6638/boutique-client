import { useParams } from "react-router-dom";
import styles from "./HistoryDetail.module.css";
import { fetchUrl, fetchData } from "../../helper/fetchUrl";
import { useEffect, useState } from "react";

const HistoryDetail = () => {
  const params = useParams();
  const [orderDetail, setOrderDetail] = useState();
  const [error, setError] = useState(null);

  // Hàm gọi API để lấy order theo ID
  const getOrder = async () => {
    const res = await fetchData({ url: fetchUrl("GET_ORDER", params.orderId) });

    if (res.hasError) {
      setError(res.message);
    } else {
      setError(null);
      setOrderDetail(res.order);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      {error && <p className="text-center text-danger">{error}</p>}
      {!error && (
        <section>
          <div className={`${styles["detail-user"]}`}>
            <div className="container d-sm-flex flex-column px-5 pt-5 ">
              <h1>Information Order</h1>
              <p>ID User : {orderDetail && orderDetail.user._id}</p>
              <p>Buyer Name : {orderDetail && orderDetail.buyerName}</p>
              <p>Phone : {orderDetail && orderDetail.buyerPhone}</p>
              <p>Address : {orderDetail && orderDetail.buyerAddress}</p>
              <p>Total : {orderDetail && orderDetail.total}</p>
            </div>
          </div>

          <table
            className={`container my-5 text-center text-wrap table table-striped ${styles["tbl"]}`}
          >
            <thead>
              <tr>
                <th>ID PRODUCT</th>
                <th>IMAGE</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>COUNT</th>
              </tr>
            </thead>
            <tbody>
              {orderDetail &&
                orderDetail.cartItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.productId._id}</td>
                    <td>
                      <img
                        className="img-fluid"
                        style={{ width: "100px" }}
                        src={`${fetchUrl(
                          "IMAGE_URL",
                          item.productId.images[0]
                        )}`}
                        alt="Product"
                      />
                    </td>
                    <td>{item.productId.name}</td>
                    <td>
                      {Number(item.productId.price).toLocaleString("de-DE")} VND
                    </td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
};

export default HistoryDetail;
