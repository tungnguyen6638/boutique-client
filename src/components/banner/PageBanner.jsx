import styles from "./PageBanner.module.css";

const PageBanner = () => {
  // Lấy url để render đường dẫn
  const url = new URL(window.location);

  return (
    <>
      <div className={`${styles["page-banner"]}`}>
        <div className="container d-sm-flex px-5 pt-5 align-items-center justify-content-between ">
          <h1 className={styles["page-banner-header"]}>
            {url.pathname.substring(1)}
          </h1>
          <p className={styles["page-banner-link"]}>
            {url.pathname.substring(1)}
          </p>
        </div>
      </div>
    </>
  );
};

export default PageBanner;
