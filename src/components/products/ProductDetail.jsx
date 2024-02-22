import { useParams, useRouteLoaderData } from "react-router-dom";
import styles from "./ProductDetail.module.css";
import { useDispatch } from "react-redux";
import { categoryActions } from "../../store/categorySlice";
import { useEffect, useRef } from "react";
import { cartActions } from "../../store/cartSlice";

const ProductDetail = () => {
  // Scroll tới đầu trang
  window.scrollTo(0, 0);

  // Dùng param để lấy productId
  const params = useParams();
  const productId = params.productId;
  // Lấy data từ loader của Route có id là root để lấy user đang login
  const data = useRouteLoaderData("root");
  const currentUser = data.user;
  const dispatch = useDispatch();
  // Lấy dữ liệu của product hiện tại đang được xem
  const productDetail = data.data.filter(
    (product) => product["_id"]["$oid"] === productId
  )[0];

  useEffect(() => {
    // Set category để xài cho Related Product
    dispatch(categoryActions.setCategory(productDetail.category));
  }, [dispatch, productDetail.category]);

  // useRef để lấy thông tin về quantity được nhập
  const quantityRef = useRef();

  // Hành động khi click vào nút Add
  const addCartHandler = () => {
    // Hiện thông báo nếu chưa đăng nhập thì không cho add vào cart
    if (!currentUser) {
      window.alert("Please login to add this product to your cart");
      return;
    }

    const cartItem = {
      product: productDetail,
      quantity: Number(quantityRef.current.value),
      total: Number(productDetail.price) * Number(quantityRef.current.value),
    };

    // Dispatch tới action addCart trong slice
    dispatch(cartActions.addCart(cartItem));
    // Thông báo add thành công
    window.alert("Your product has beed added to cart!!");
  };

  return (
    <>
      <div className={styles["detail-container"]}>
        <div className="container mb-0">
          <div className={`d-sm-flex gap-4 py-5 ${styles["detail"]}`}>
            <picture className="d-sm-flex d-none gap-4 flex-column align-items-center">
              <img
                src={productDetail.img1}
                className="image-fuild w-25"
                alt="Product Detail 1"
              ></img>
              <img
                src={productDetail.img2}
                className="image-fuild w-25"
                alt="Product Detail 2"
              ></img>
              <img
                src={productDetail.img3}
                className="image-fuild w-25"
                alt="Product Detail 3"
              ></img>
              <img
                src={productDetail.img4}
                className="image-fuild w-25"
                alt="Product Detail 4"
              ></img>
            </picture>

            <picture>
              <img
                src={productDetail.img1}
                className="w-100"
                alt="Product Detail 1"
              ></img>
            </picture>

            <div>
              <h2 className="pb-3">{productDetail.name}</h2>
              <p> {Number(productDetail.price).toLocaleString("de-DE")} VND</p>
              <p>{productDetail.short_desc}</p>
              <p>
                Category : <span>{productDetail.category}</span>
              </p>
              <div className="input-group mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Quantity"
                  ref={quantityRef}
                />
                <div className={`input-group-append ${styles["btn-add"]}`}>
                  <button
                    onClick={addCartHandler}
                    className={`btn `}
                    type="button"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className={`py-2 px-3 ${styles["description-header"]}`}>
              Description
            </h2>
            <h3 className={`py-3 ${styles["description-header-3"]}`}>
              Product description
            </h3>
            <p className={`mb-0 pb-4 ps-2 ${styles["long-desc"]}`}>
              {productDetail.long_desc}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
