import { Link } from "react-router-dom";
import bannerImage from "../../images/banner1.jpg";
import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <>
      <div className={styles["banner-container"]}>
        <div
          className={`container py-4 ${styles["banner-image"]}}`}
          style={{
            backgroundImage: `url(${bannerImage})`,
            backgroundSize: "cover",
            height: "60vh",
          }}
        >
          <div className={`d-flex flex-column mt-5 ms-5 ${styles["banner"]}`}>
            <h3 className="mt-sm-5 ms-sm-5">New Inspiration 2020</h3>
            <p className="mt-sm-1 ms-sm-5">20% off on new season</p>
            <Link to="/shop" className="btn ms-sm-5 py-2 px-4">
              Browse collections
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
