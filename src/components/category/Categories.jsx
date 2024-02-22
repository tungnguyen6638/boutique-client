import { Link } from "react-router-dom";
import iphoneCategoryImage from "../../images/product_1.png";
import macCategoryImage from "../../images/product_2.png";
import ipadCategoryImage from "../../images/product_3.png";
import watchCategoryImage from "../../images/product_4.png";
import airpodsCategoryImage from "../../images/product_5.png";
import styles from "./Categories.module.css";

// Render các category ngoài home page
const Categories = () => {
  return (
    <>
      <div className={styles["categories-container"]}>
        <div className="container">
          <div className="d-flex flex-column align-items-center pt-4">
            <h2 className={styles["categories-headers"]}>
              Carefully created collections
            </h2>
            <h3 className={styles["categories-browse-text"]}>
              Browse our categories
            </h3>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <Link to="/shop" className={styles["category"]}>
              <img
                src={iphoneCategoryImage}
                className="img-thumbnail"
                alt="Iphone"
              />
            </Link>
            <Link to="/shop" className={styles["category"]}>
              <img src={macCategoryImage} className="img-thumbnail" alt="Mac" />
            </Link>
          </div>
          <div className="d-flex justify-content-between mt-4 pb-4">
            <Link to="/shop" className={styles["category"]}>
              <img
                src={ipadCategoryImage}
                className="img-thumbnail"
                alt="Ipad"
              />
            </Link>
            <Link to="/shop" className={styles["category"]}>
              <img
                src={watchCategoryImage}
                className="img-thumbnail"
                alt="Watch"
              />
            </Link>
            <Link to="/shop" className={styles["category"]}>
              <img
                src={airpodsCategoryImage}
                className="img-thumbnail"
                alt="AirPods"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
