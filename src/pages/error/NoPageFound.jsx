import styles from "./NoPageFound.module.css";

const NoPageFound = () => {
  return (
    <p className={`text-warning text-center font-bold ${styles["error"]}`}>
      Oopp, something went wrong!!!
    </p>
  );
};

export default NoPageFound;
