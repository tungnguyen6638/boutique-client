import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import styles from "./CartTable.module.css";
import { Link } from "react-router-dom";
import NoProductInCart from "../../pages/error/NoProductInCart";

const CartTable = () => {
  // Lấy listCart từ redux
  const listCart = useSelector((state) => state.cart.listCart);

  return (
    <>
      <div>
        <h2 className={`ps-3 pb-4 ${styles["cart-table-header"]}`}>
          Shopping Cart
        </h2>
        <div className="overflow-auto">
          <table
            className={`text-center text-wrap table table-striped ${styles["tbl"]}`}
          >
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {listCart &&
                listCart.map((cartItem) => {
                  return (
                    <CartItem key={cartItem.product._id} cart={cartItem} />
                  );
                })}
            </tbody>
          </table>
          {/* Nếu không có listCart render NoProductInCart component */}
          {!listCart || (listCart.length === 0 && <NoProductInCart />)}
        </div>

        <div
          className={`d-sm-flex justify-content-between gap-4 p-2 border ${styles["btn-group"]}`}
        >
          <Link to="/shop" className="btn">
            Continue shopping
          </Link>
          <Link to="/checkout" className="btn">
            Proceed to checkout
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartTable;
