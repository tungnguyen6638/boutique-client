import styles from "./FooterItem.module.css";

const FooterItem = ({ footerItem }) => {
  return (
    <>
      <li className={`${styles["item"]}`}>
        <a href="#">{footerItem}</a>
      </li>
    </>
  );
};

export default FooterItem;
