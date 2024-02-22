import { Form, Link, NavLink, useRouteLoaderData } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { useEffect } from "react";

const NavBar = () => {
  // Dùng hook useRouteLoaderData để lấy data từ route có id là "root"
  // Data này gồm product và user
  const data = useRouteLoaderData("root");
  const currentUser = data.user;
  // Lấy listCart để hiển thị số item trong cart trên phần điều hướng "Cart"
  const listCart = useSelector((state) => state.cart.listCart);
  const dispatch = useDispatch();

  let total = 0;

  useEffect(() => {
    // Nếu không có user đang đăng nhập (tức là user đã log out) thì sẽ set cart và tổng số item trong cart về lại 0
    if (!currentUser) {
      total = 0;
      dispatch(cartActions.deleteAllCart());
      return;
    }
  }, [currentUser]);

  // Lấy tổng số item trong cart
  listCart.forEach((cart) => {
    total += +cart.quantity;
  });

  return (
    <>
      <div className={styles["nav-bar-container"]}>
        <div className="container">
          <div
            className={`d-flex flex-sm-row flex-column p-3 gap-3 justify-content-between align-items-center ${styles["nav-bar"]}`}
          >
            <div className="d-flex gap-sm-5 gap-3">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? styles["active"] : undefined
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  isActive ? styles["active"] : undefined
                }
              >
                Shop
              </NavLink>
            </div>
            <div className={`${styles["nav-item-group-2"]} d-sm-inline d-none`}>
              <Link to="/" className={styles["logo"]}>
                Boutique
              </Link>
            </div>

            <div className="d-flex gap-sm-3 gap-4">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? styles["active"] : undefined
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className={`bi bi-cart3 ${styles["icon"]}`}
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
                Cart
                <span className="ms-1 px-2 py-1 bg-light rounded border border-warning">
                  {total}
                </span>
              </NavLink>

              {!currentUser && (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? styles["active"] : undefined
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className={`bi bi-person-circle ${styles["icon"]}`}
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path
                      fillRule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                  Login
                </NavLink>
              )}
              {currentUser && (
                <>
                  <Link to="/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className={`bi bi-person-circle ${styles["icon"]}`}
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path
                        fillRule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                      />
                    </svg>
                    {currentUser.name.split(" ")[0]}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className={`bi bi-caret-down-fill ms-2 mb-2}`}
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                  </Link>
                  <Form action="/logout" method="post">
                    <button className={`px-0 ${styles["btn-logout"]}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className={`bi bi-box-arrow-left  ${styles["icon"]}`}
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"
                        />
                      </svg>
                      Logout
                    </button>
                  </Form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
