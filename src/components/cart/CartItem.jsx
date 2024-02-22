import styles from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { useEffect } from "react";

const CartItem = ({ cart }) => {
  // Tạo dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    // Dùng useEffect để khi quantity thay đổi thì sẽ dispatch để xóa item đi (cụ thể là khi quantity của cart = 0)
    // khi item đó bị xóa thì sẽ ko render item đó
    if (cart.quantity === 0) {
      dispatch(cartActions.deleteCart(cart));
    }
  }, [cart.quantity]);

  // Xử lý tăng quantity
  const increaseQuantityHanlder = () => {
    // dispatch tới action updateCart của redux với payload là 1 object với những thông tin của cart này
    // nhưng quantity và total sẽ được thay đổi ( cụ thể là quantity tăng lên 1 và total sẽ
    // là quantity cũ + 1 nhân với giá tiền
    dispatch(
      cartActions.updateCart({
        ...cart,
        quantity: +cart.quantity + 1,
        total: cart.product.price * (+cart.quantity + 1),
      })
    );
  };

  // Xử lý giảm quantity
  const decreseQuantityHanlder = () => {
    // tương tự như tăng quantity nhưng sẽ - 1 quantity đi
    dispatch(
      cartActions.updateCart({
        ...cart,
        quantity: +cart.quantity - 1,
        total: cart.product.price * (+cart.quantity - 1),
      })
    );
  };

  // Xóa item trong cart
  const removeHandler = () => {
    // dispatch tới action deleteCart
    dispatch(cartActions.deleteCart(cart));
  };

  return (
    <>
      <tr className={`${styles["cart-product-item"]}`}>
        <td className={`${styles["cart-product-img"]}`}>
          <img
            src={cart.product.img1}
            alt={cart.product.name}
            className="img-fluid "
          />
        </td>
        <td>{cart.product.name}</td>
        <td>{Number(cart.product.price).toLocaleString("de-DE")} VND</td>
        <td>
          <button onClick={decreseQuantityHanlder}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-caret-left-fill"
              viewBox="0 0 16 16"
            >
              <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
            </svg>
          </button>
          <span>{cart.quantity}</span>
          <button onClick={increaseQuantityHanlder}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-caret-right-fill"
              viewBox="0 0 16 16"
            >
              <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
            </svg>
          </button>
        </td>
        <td>{Number(cart.total).toLocaleString("de-DE")} VND</td>
        <td>
          <button onClick={removeHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
            </svg>
          </button>
        </td>
      </tr>
    </>
  );
};

export default CartItem;
