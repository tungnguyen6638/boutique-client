import OrderDetail from "./OrderDetail";
import BillingDetailForm from "./BillingDetailForm";
import styles from "./CheckoutForm.module.css";

const CheckoutForm = () => {
  return (
    <>
      <div className={styles["checkout-container"]}>
        <div className="container">
          <div className="d-lg-flex gap-5">
            <BillingDetailForm />
            <OrderDetail />
          </div>
        </div>
      </div>
    </>
  );
};
export default CheckoutForm;
