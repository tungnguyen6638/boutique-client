import { useRouteLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import styles from "./RelatedProducts.module.css";
import Popup from "../popup/Popup";

const RelatedProducts = () => {
  const category = useSelector((state) => state.category.category);
  const data = useRouteLoaderData("root");
  const relatedProducts = data.products.filter(
    (product) => product.category === category
  );

  const isVisible = useSelector((state) => state.popup.isVisible);

  return (
    <>
      <div className={`${styles["related-product-container"]} pt-0 pb-5`}>
        <div className={`container `}>
          {isVisible && <Popup></Popup>}
          <h2 className={styles["related-header"]}>Related Products</h2>
          <div className={`d-flex pt-4 ${styles["related-content"]}`}>
            {relatedProducts &&
              relatedProducts.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RelatedProducts;
