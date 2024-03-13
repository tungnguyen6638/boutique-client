import { Link, useRouteLoaderData } from "react-router-dom";
import styles from "./AdditionalInformation.module.css";

const AdditionalInformation = () => {
  const data = useRouteLoaderData("root");

  return (
    <>
      <div className={styles["add-container"]}>
        <div className={`container py-5 px-5 ${styles["shipping-container"]}`}>
          <div className="d-sm-flex justify-content-between">
            <div>
              <h2 className={styles["add-header"]}>Free Shipping</h2>
              <p className={styles["add-text"]}>Free shipping worldwide</p>
            </div>
            <div>
              <h2 className={styles["add-header"]}>24 x 7 Service</h2>
              <p className={styles["add-text"]}>Free shipping worldwide</p>
            </div>
            <div>
              <h2 className={styles["add-header"]}>Festival Offer</h2>
              <p className={styles["add-text"]}>Free shipping worldwide</p>
            </div>
          </div>
        </div>

        {!data.user && (
          <div className={`container`}>
            <div className="d-sm-flex justify-content-between py-5">
              <div>
                <h2 className={styles["add-header"]}>Let's be friends!</h2>
                <p className={styles["add-text-friends"]}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatem, id?
                </p>
              </div>
              <div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your email address"
                  />
                  <div
                    className={`input-group-append ${styles["btn-subcribe"]}`}
                  >
                    <Link to="/register" className={`btn`}>
                      Button
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdditionalInformation;
