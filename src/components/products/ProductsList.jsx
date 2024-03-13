import { useRouteLoaderData } from "react-router-dom";
import ProductItem from "./ProductItem";
import styles from "./ProductsList.module.css";
import Popup from "../popup/Popup";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import openSocket from "socket.io-client";
import { fetchUrl, fetchData } from "../../helper/fetchUrl";

const ProductsList = () => {
  const data = useRouteLoaderData("root");
  const isVisible = useSelector((state) => state.popup.isVisible);
  const [products, setProducts] = useState(data.products);

  // 3 item đầu
  const firstFourItems =
    products && products.filter((product, index) => index >= 0 && index <= 3);

  // 3 item tiếp theo
  const nextFourItems =
    products && products.filter((product, index) => index >= 4 && index <= 7);

  const getProducts = async () => {
    const res = await fetchData({ url: fetchUrl("GET_PRODUCTS") });

    if (res.hasError) {
      window.alert(res.message);
    } else {
      setProducts(res.products);
    }
  };

  useEffect(() => {
    // Mở socket để cập nhật cho client khi có thay đổi ở server
    const socket = openSocket(fetchUrl("SERVER_DOMAIN"), {
      transports: ["websocket", "polling", "flashsocket"],
    });

    // Kết nối với socket có key là product
    socket.on("product", (d) => {
      // action là add thì set lại state products
      if (d.action === "add") {
        setProducts([...products, d.product]);
      }
      if (d.action === "edit") {
        const newProduct = products.map((p) => {
          if (p._id === d.product._id) {
            return d.product;
          }
          return p;
        });
        setProducts([...newProduct]);
      }
      if (d.action === "delete") {
        getProducts();
      }
    });
  }, []);

  return (
    <>
      <div className={styles["product-list-container"]}>
        {isVisible && <Popup></Popup>}
        <div className="container">
          <div className="d-flex flex-column align-items-lg-start align-items-center py-3">
            <h2 className={styles["list-header-1"]}>Made the hard way</h2>
            <h3 className={styles["list-header-2"]}>Top trending products</h3>
          </div>
          <div className="row">
            {firstFourItems &&
              firstFourItems.map((product) => (
                <ProductItem key={product._id} page="shop" product={product} />
              ))}
          </div>
          <div className="row ">
            {nextFourItems &&
              nextFourItems.map((product) => (
                <ProductItem key={product._id} page="shop" product={product} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsList;
