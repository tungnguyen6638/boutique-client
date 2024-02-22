import FooterItem from "./FooterItem";
import styles from "./Footer.module.css";

const FOOTER_HEADERS = [
  {
    headerName: "Customer Services",
    items: [
      "Help & Contact Us",
      "Returns & Refunds",
      "Online Stores",
      "Terms & Conditions",
    ],
  },
  {
    headerName: "Company",
    items: ["What We Do", "Available Services", "Lastest Posts", "FAQs"],
  },
  {
    headerName: "Social Media",
    items: ["Twitter", "Instagram", "Facebook", "Pinterest"],
  },
];

const Footer = () => {
  return (
    <>
      <div className={styles["footer"]}>
        <div className="container py-4">
          <div
            className={`d-md-flex px-3 justify-content-between ${styles["footer-container"]}`}
          >
            {FOOTER_HEADERS.map((header) => (
              <div key={header.headerName} className={styles["footer-headers"]}>
                <h2 className="pb-3">{header.headerName}</h2>
                {header.items.map((item) => (
                  <ul key={item} className="px-0">
                    <FooterItem footerItem={item} />
                  </ul>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
