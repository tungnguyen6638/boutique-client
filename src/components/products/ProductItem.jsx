import styles from "./ProductItem.module.css";
import { useDispatch } from "react-redux";
import { popupActions } from "../../store/popupSlice";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  // Nếu click vào item thì sẽ dispatch tới popupActions trong slice để hiển thị popup
  const popupHandler = () => {
    dispatch(popupActions.showPopup(product["_id"]["$oid"]));
  };

  return (
    <>
      <button
        onClick={popupHandler}
        className={`w-75 pt-3 px-1 ${styles["item"]}`}
      >
        <picture>
          <img
            src={product.img1}
            style={{ height: "200px", width: "200px" }}
            alt={product.name}
          />
        </picture>
        <div>
          <p className={`pt-4 ${styles["name"]}`}>{product.name}</p>
          <p className={`${styles["price"]}`}>
            {Number(product.price).toLocaleString("de-DE")} VND
          </p>
        </div>
      </button>
    </>
  );
};

export default ProductItem;
