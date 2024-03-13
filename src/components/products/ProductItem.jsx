import styles from "./ProductItem.module.css";
import { useDispatch } from "react-redux";
import { popupActions } from "../../store/popupSlice";
import { fetchUrl } from "../../helper/fetchUrl";

const ProductItem = ({ product, page }) => {
  const dispatch = useDispatch();

  // Nếu click vào item thì sẽ dispatch tới popupActions trong slice để hiển thị popup
  const popupHandler = () => {
    dispatch(popupActions.showPopup(product._id));
  };

  return (
    <>
      <button
        onClick={popupHandler}
        className={`${page === "shop" ? "col-lg-3 col-md-6" : "col-md-4"}  ${
          styles["item"]
        }`}
      >
        <picture>
          <img
            src={fetchUrl("IMAGE_URL", product.images[0])}
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
