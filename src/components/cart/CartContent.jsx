import CartTable from "./CartTable";
import styles from "./CartContent.module.css";
import CartTotal from "./CartTotal";

const CartContent = () => {
  return (
    <>
      <div className={`py-5 ${styles["cart-content"]}`}>
        <div className="container">
          <div className="d-flex flex-lg-row flex-column justify-content-between gap-5">
            <div className="flex-fill">
              <CartTable />
            </div>
            <CartTotal />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartContent;
