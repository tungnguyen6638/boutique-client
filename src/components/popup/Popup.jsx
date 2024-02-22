import styles from "./Popup.module.css";
import { Link, useRouteLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { popupActions } from "../../store/popupSlice";

const Popup = () => {
  const productId = useSelector((state) => state.popup.productId);
  const dispatch = useDispatch();
  const data = useRouteLoaderData("root");
  const [currentProduct, setCurrentProduct] = useState({});

  useEffect(() => {
    // Mỗi khi render component hơajc khi các dependencies (productId, data) thay đổi thì sẽ set lại product hiện tại
    // để render. Product hiện tại là product có id bằng với item có id như trên trong list data
    setCurrentProduct(
      data.data.filter(
        (product) => product["_id"]["$oid"] === productId && product
      )[0]
    );
  }, [productId, data]);

  const closePopupHandler = () => {
    dispatch(popupActions.hidePopup());
  };

  return (
    <>
      {currentProduct && (
        <>
          <div className={styles["overlay"]} onClick={closePopupHandler}></div>
          <div className={`p-md-5 ${styles["current-product"]}`}>
            <div className={`d-md-flex gap-5 ${styles["product-container"]}`}>
              <button
                onClick={closePopupHandler}
                className={styles["btn-close"]}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-x-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </button>
              <div className="w-50">
                <img
                  src={currentProduct.img1}
                  alt="Product detail"
                  className="img-fluid"
                />
              </div>
              <div className={`p-3 ${styles["current-product-content"]}`}>
                <p className={styles["name"]}>{currentProduct.name}</p>
                <p className={styles["price"]}>
                  {Number(currentProduct.price).toLocaleString("de-DE")} VND
                </p>
                <p className={`overflow-auto ${styles["short-desc"]}`}>
                  {currentProduct.short_desc}
                </p>
                <Link
                  to={`/detail/${productId}`}
                  className={`py-2 px-3 ${styles["btn-details"]}`}
                  onClick={() => dispatch(popupActions.hidePopup())}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className={`bi bi-cart3 ${styles["icon"]}`}
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                  </svg>
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Popup;
