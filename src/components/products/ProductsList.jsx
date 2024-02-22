import { useRouteLoaderData } from "react-router-dom";
import ProductItem from "./ProductItem";
import styles from "./ProductsList.module.css";
import Popup from "../popup/Popup";
import { useSelector } from "react-redux";

const ProductsList = () => {
  const productsList = useRouteLoaderData("root");
  const isVisible = useSelector((state) => state.popup.isVisible);

  // 3 item đầu
  const firstFourItems = productsList.data.filter(
    (product, index) => index >= 0 && index <= 3
  );

  // 3 item tiếp theo
  const nextFourItems = productsList.data.filter(
    (product, index) => index >= 4 && index <= 7
  );

  return (
    <>
      <div className={styles["product-list-container"]}>
        {isVisible && <Popup></Popup>}
        <div className="container">
          <div className="d-flex flex-column align-items-lg-start align-items-center py-3">
            <h2 className={styles["list-header-1"]}>Made the hard way</h2>
            <h3 className={styles["list-header-2"]}>Top trending products</h3>
          </div>
          <div className="d-lg-flex justify-content-between gap-3 text-center pt-3 ">
            {firstFourItems &&
              firstFourItems.map((product) => (
                <ProductItem key={product["_id"]["$oid"]} product={product} />
              ))}
          </div>
          <div className="d-lg-flex d-none justify-content-between gap-4 text-center pt-3 pb-4 ">
            {nextFourItems &&
              nextFourItems.map((product) => (
                <ProductItem key={product["_id"]["$oid"]} product={product} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsList;
