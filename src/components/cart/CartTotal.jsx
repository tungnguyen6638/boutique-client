import { useSelector } from "react-redux";
import styles from "./CartTotal.module.css";

const CartTotal = () => {
  // Lấy list cart từ redux
  const listCart = useSelector((state) => state.cart.listCart);

  let total = 0;
  // Biến tổng số tiền sẽ bằng total của các item trong cart cộng lại
  listCart.forEach((cart) => {
    total += cart.total;
  });

  return (
    <>
      <div>
        <div className="d-sm-flex flex-column p-5 bg-light align-self-center">
          <h2 className={styles["total-header"]}>Cart total</h2>
          <div className="d-flex gap-4 justify-content-between my-2">
            <p className={styles["total"]}>Subtotal</p>
            <p>{Number(total).toLocaleString("de-DE")} VND</p>
          </div>
          <div className="w-100 bg-dark" style={{ height: "2px" }}></div>
          <div className="d-flex gap-4 justify-content-between mt-2">
            <p className={styles["total"]}>Total</p>
            <p>{Number(total).toLocaleString("de-DE")} VND</p>
          </div>
          <div className={`mt-2 ${styles["coupon"]}`}>
            <input
              className="d-block w-100 mb-2 form-control"
              placeholder="Enter your coupon"
            />
            <button className="btn d-block w-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-gift me-2 mb-1"
                viewBox="0 0 16 16"
              >
                <path d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 14.5V7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A3 3 0 0 1 3 2.506zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43zM9 3h2.932l.023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0zM1 4v2h6V4zm8 0v2h6V4zm5 3H9v8h4.5a.5.5 0 0 0 .5-.5zm-7 8V7H2v7.5a.5.5 0 0 0 .5.5z" />
              </svg>
              Apply coupon
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartTotal;
