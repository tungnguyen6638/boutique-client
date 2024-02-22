import { useSelector, useDispatch } from "react-redux";
import { pagenationActions } from "../../store/pagenationSlice";
import styles from "./Pagenation.module.css";

// Component để phân trang
// Truyền vào đối số là tổng số item, trang hiện tại và phân vùng
// (1 phân vùng gồm 6 item nếu item nằm trong phân vùng nào là tương ứng với trang có index là phân vùng đó)
const paging = (totalResults, currentPage, segments) => {
  let pages = Math.ceil(totalResults / 6);
  let first = false;
  let last = false;
  let tempLength = 0;

  // Lấy khoảng cách để hiển thị trang (tối đa 5 trang)
  const space = [];
  if (currentPage === 1 || currentPage === 2 || currentPage === 3) {
    // Nếu phân vùng nhỏ hơn 6 tức là chỉ có dưới 3 trang thì set khoảng cách bằng số phân vùng (số trang)
    if (segments.length < 6) {
      tempLength = segments.length;
    } else {
      tempLength = 5;
    }
    for (let i = 0; i < tempLength; i++) {
      space.push(i + 1);
    }
  } else if (
    currentPage === pages ||
    currentPage === pages - 1 ||
    currentPage === pages - 2
  ) {
    for (let i = 4; i >= 0; i++) {
      space.push(pages - i);
    }
  } else {
    space.push(currentPage - 2);
    space.push(currentPage - 1);
    space.push(currentPage);
    space.push(currentPage + 1);
    space.push(currentPage + 2);
  }

  if (currentPage === 1) {
    first = true;
  }

  if (currentPage === pages) {
    last = true;
  }

  return { space, first, last };
};

const Pagenation = ({ totalResults, segments }) => {
  const currentPage = useSelector((state) => state.pagenation.currentPage);
  const dispatch = useDispatch();
  const { space, first, last } = paging(totalResults, currentPage, segments);

  return (
    <>
      <ul
        className={`d-flex justify-content-end gap-3 ${styles["pagenation-el"]}`}
      >
        <li
          className={`p-2 ${styles["btn"]} ${
            first === true ? styles["hidden"] : ""
          }`}
        >
          <button
            className="page-link"
            href="#"
            id="btn-prev"
            onClick={() => {
              dispatch(pagenationActions.setCurrentPage(currentPage - 1));
              window.scrollTo(0, 200);
            }}
          >
            Previous
          </button>
        </li>

        {space.map((s, i) => (
          <li
            key={segments[i]}
            className={`py-2 px-3 ${
              space[i] === currentPage ? styles["disable"] : ""
            }`}
          >
            <button
              className="page-link"
              id="page-num"
              onClick={() => {
                dispatch(pagenationActions.setCurrentPage(space[i]));
                window.scrollTo(0, 200);
              }}
            >
              {space[i]}
            </button>
          </li>
        ))}

        <li
          className={`p-2 ${styles["btn"]} ${
            last === true ? styles["hidden"] : ""
          }`}
        >
          <button
            className="page-link"
            id="btn-next"
            onClick={() => {
              dispatch(pagenationActions.setCurrentPage(currentPage + 1));
              window.scrollTo(0, 200);
            }}
          >
            Next
          </button>
        </li>
      </ul>
    </>
  );
};

export default Pagenation;
