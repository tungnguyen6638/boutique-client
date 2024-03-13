import { useParams, useRouteLoaderData } from "react-router-dom";
import styles from "./ProductDetail.module.css";
import { useDispatch } from "react-redux";
import { categoryActions } from "../../store/categorySlice";
import { useEffect, useRef, useState } from "react";
import { cartActions } from "../../store/cartSlice";
import { fetchData, fetchUrl } from "../../helper/fetchUrl";
import openSocket from "socket.io-client";
const ProductDetail = () => {
  // Dùng param để lấy productId
  const params = useParams();
  const productId = params.productId;
  // Lấy data từ loader của Route có id là root để lấy user đang login
  const data = useRouteLoaderData("root");
  const currentUser = data.user;
  const dispatch = useDispatch();
  const [productDetail, setProductDetail] = useState();
  const [error, setError] = useState(null);

  // Lấy dữ liệu của product hiện tại đang được xem
  const fetchDetailProduct = async () => {
    const res = await fetchData({ url: fetchUrl("GET_PRODUCT", productId) });

    if (res.hasError) {
      setError(res.message);
    } else {
      setError(null);
      setProductDetail(res.product);
      // Set category để xài cho Related Product
      dispatch(categoryActions.setCategory(res.product.category));
    }
  };

  useEffect(() => {
    fetchDetailProduct();

    const socket = openSocket(fetchUrl("SERVER_DOMAIN"), {
      transports: ["websocket", "polling", "flashsocket"],
    });

    socket.on("amount", (a) => {
      if (a.action === "update") {
        setProductDetail({
          ...a.product,
          amount: a.amount,
        });
      }
    });
  }, []);

  // useRef để lấy thông tin về quantity được nhập
  const quantityRef = useRef();

  // Hành động khi click vào nút Add
  const addCartHandler = () => {
    const quantity = quantityRef.current.value;
    const price = productDetail.price;

    // Hiện thông báo nếu chưa đăng nhập thì không cho add vào cart
    if (!currentUser) {
      window.alert("Please login to add this product to your cart");
      return;
    }

    const cartItem = {
      product: productDetail,
      quantity: Number(quantity),
      total: Number(price) * Number(quantity),
    };

    // Dispatch tới action addCart trong slice
    dispatch(cartActions.addCart(cartItem));
    // Thông báo add thành công
    window.alert("Your product has beed added to cart!!");
  };

  return (
    <>
      {error && <p className="error">{error}</p>}
      {productDetail && (
        <div className={styles["detail-container"]}>
          <div className="container mb-0">
            <div className={`d-sm-flex py-5 ${styles["detail"]}`}>
              <picture className="d-sm-flex d-none gap-4 w-75 flex-column align-items-center">
                <img
                  src={`${fetchUrl("IMAGE_URL", productDetail.images[0])}`}
                  className="image-fuild w-25"
                  alt="Product Detail 1"
                ></img>
                <img
                  src={`${fetchUrl("IMAGE_URL", productDetail.images[1])}`}
                  className="image-fuild w-25"
                  alt="Product Detail 2"
                ></img>
                <img
                  src={`${fetchUrl("IMAGE_URL", productDetail.images[2])}`}
                  className="image-fuild w-25"
                  alt="Product Detail 3"
                ></img>
                <img
                  src={`${fetchUrl("IMAGE_URL", productDetail.images[3])}`}
                  className="image-fuild w-25"
                  alt="Product Detail 4"
                ></img>
              </picture>

              <picture className="w-75">
                <img
                  src={`${fetchUrl("IMAGE_URL", productDetail.images[0])}`}
                  className="w-75"
                  alt="Product Detail 1"
                ></img>
              </picture>

              <div className="w-100">
                <h2 className="pb-3">{productDetail.name}</h2>
                <p>{Number(productDetail.price).toLocaleString("de-DE")} VND</p>
                <p>{productDetail.short_desc}</p>
                <p>
                  Category : <span>{productDetail.category}</span>
                </p>
                <div className="input-group mb-3">
                  <input
                    type="number"
                    className="form-control"
                    defaultValue={1}
                    disabled={productDetail.amount === 0 ? true : false}
                    ref={quantityRef}
                    max={productDetail.amount}
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
                {productDetail.amount !== 0 ? (
                  <p className="text-success">
                    In store : {productDetail.amount}
                  </p>
                ) : (
                  <p className="text-danger">This product is out of stock</p>
                )}
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
      )}
    </>
  );
};

export default ProductDetail;
