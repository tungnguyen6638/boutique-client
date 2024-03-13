import { memo } from "react";
import ProductItem from "./ProductItem";
import { useSelector } from "react-redux";
import Pagenation from "../pagenation/Pagenation";
import Popup from "../popup/Popup";
import NoProductError from "../../pages/error/NoProductError";

// Hàm lấy segments (mỗi segment là 1 page)
function getSegments(products, totalResults, productsPerPage) {
  // array tạm của product
  const temp = [...products];
  const totalSegments = Math.ceil(totalResults / productsPerPage);
  // Biến tạm để lấy một segment
  const segmentArr = [];
  // Toàn bộ segment
  const allSegmentArr = [];
  for (let i = 0; i < totalSegments; i++) {
    for (let j = 0; j < 6; j++) {
      // Vòng lặp này để lấy 6 phần từ đầu của array tạm để gắn cho segment
      // Lấy xong sẽ cắt array tạm đi
      if (temp.length === 0) {
        break;
      }
      segmentArr.push(temp.shift());
    }
    // Khi kết thúc vòng lặp thì sẽ push segment tạm vào segment tổng rồi reset segment tạm để phục vụ vòng lặp tiếp theo
    allSegmentArr.push([...segmentArr]);
    segmentArr.splice(0, segmentArr.length);
  }

  return allSegmentArr;
}

const ShopProductsList = memo(({ products }) => {
  const segments = getSegments(products, products.length, 6);
  // currentPage được lưu trong redux nên không cần phải truyền vào component Pagenation
  const currentPage = useSelector((state) => state.pagenation.currentPage);
  const isVisible = useSelector((state) => state.popup.isVisible);
  // 6 item được render sẽ là segment của current page vì lấy index trong list segment nên phải trừ 1
  const firstSixItems = segments[currentPage - 1];

  // Nếu không có 6 item thì sẽ render trang error
  if (!firstSixItems) {
    return <NoProductError />;
  }
  const firstLineItems = firstSixItems.filter(
    (product, index) => index >= 0 && index <= 2
  );

  const secondLineItems = firstSixItems.filter(
    (product, index) => index >= 3 && index <= 5
  );

  return (
    <>
      {isVisible && <Popup />}
      {firstSixItems && (
        <div className="d-flex flex-column">
          <div className="row">
            {firstLineItems.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>
          <div className="row">
            {secondLineItems.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>
          <Pagenation totalResults={products.length} segments={segments} />
        </div>
      )}
    </>
  );
});

export default ShopProductsList;
