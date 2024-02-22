import AdditionalInformation from "../components/additional-information/AdditionalInformation";
import Banner from "../components/banner/Banner";
import Categories from "../components/category/Categories";
import ProductsList from "../components/products/ProductsList";
import { getUser } from "../helper/getUser";

const HomePage = () => {
  return (
    <>
      <Banner />
      <Categories />
      <ProductsList />
      <AdditionalInformation />
    </>
  );
};

export default HomePage;

// Loader của trang home. Trả về object chứa data product và user
export async function loader() {
  try {
    const url =
      "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74";
    const res = await fetch(url);
    const data = await res.json();
    const user = getUser();
    return { data: data, user: user };
  } catch (err) {
    throw err;
  }
}
