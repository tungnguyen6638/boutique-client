import { useEffect, useState } from "react";
import CategoriesSideBar from "../category/CategoriesSideBar";
import SearchBar from "../search-bar/SearchBar";
import ShopProductsList from "./ShopProductsList";
import { useSelector } from "react-redux";
import { useRouteLoaderData } from "react-router-dom";

// Render trang shop
const ShopProducts = () => {
  window.scrollTo(100, 100);
  const data = useRouteLoaderData("root");
  // Lấy category
  const categoryState = useSelector((state) => state.category.category);
  // State để phục vụ việc render những product nào sau khi click vào từng mục category
  const [productsAfterFilter, setProductsAfterFilter] = useState([
    ...data.products,
  ]);

  useEffect(() => {
    if (!categoryState) {
      return;
    }
    // Nếu category = all thì set products bằng tất cả data product
    if (categoryState === "all") {
      setProductsAfterFilter(data.products);
    } else {
      // Nếu không thì filter theo category
      const newProducts = data.products.filter(
        (product) => product.category === categoryState
      );
      if (newProducts) {
        setProductsAfterFilter(newProducts);
      }
    }
  }, [categoryState, data.products]);

  return (
    <>
      <div className="container mb-5 d-lg-flex gap-5">
        <CategoriesSideBar />
        <div className="flex-fill">
          <SearchBar />
          <ShopProductsList products={productsAfterFilter} />
        </div>
      </div>
    </>
  );
};

export default ShopProducts;
