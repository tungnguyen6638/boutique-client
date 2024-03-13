import AdditionalInformation from "../components/additional-information/AdditionalInformation";
import Banner from "../components/banner/Banner";
import Categories from "../components/category/Categories";
import ProductsList from "../components/products/ProductsList";
import { getUser } from "../helper/getUser";
import { fetchUrl, fetchData } from "../helper/fetchUrl";
import Footer from "../components/footer/Footer";

const HomePage = () => {
  return (
    <>
      <Banner />
      <Categories />
      <ProductsList />
      <AdditionalInformation />
      <Footer />
    </>
  );
};

export default HomePage;

// Loader của trang home. Trả về object chứa data product và user
export async function loader() {
  const user = getUser();
  const res = await fetchData({ url: fetchUrl("GET_PRODUCTS") });

  if (res.hasError) {
    return { products: null, user: null };
  } else {
    return { products: res.products, user: user };
  }
}
