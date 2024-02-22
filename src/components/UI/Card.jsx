import styles from "./Card.module.css";

const Card = (props) => {
  const className = props.className;
  const styleCss = props.styleCss;
  return (
    <div className={`${styles["card"]} ${className}`} style={styleCss}>
      {props.children}
    </div>
  );
};

export default Card;
