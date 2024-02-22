import { useDispatch } from "react-redux";
import styles from "./CategoriesSideBar.module.css";
import { categoryActions } from "../../store/categorySlice";
import { useState } from "react";
import { useParams } from "react-router-dom";

// keyword cho các category
const CATEGORIES = {
  iphone: "iphone",
  ipad: "ipad",
  macbook: "mac",
  airpod: "airpod",
  watch: "watch",
  mouse: "mouse",
  keyboard: "keyboard",
  other: "other",
  all: "all",
};

const CategoriesSideBar = () => {
  const params = useParams();

  // Tạo dispatch
  const dispatch = useDispatch();

  // Hàm xử lý khi click đổi category
  // dispatch tới các actions category tương ứng trong redux
  const changeCategoryHandler = (category) => {
    switch (category) {
      case CATEGORIES.all:
        dispatch(categoryActions.allCategory());
        break;
      case CATEGORIES.iphone:
        dispatch(categoryActions.iphoneCategory());
        break;
      case CATEGORIES.ipad:
        dispatch(categoryActions.ipadCategory());
        break;
      case CATEGORIES.macbook:
        dispatch(categoryActions.macCategory());
        break;
      case CATEGORIES.airpod:
        dispatch(categoryActions.airpodCategory());
        break;
      case CATEGORIES.watch:
        dispatch(categoryActions.watchCategory());
        break;
      case CATEGORIES.mouse:
        dispatch(categoryActions.mouseCategory());
        break;
      case CATEGORIES.keyboard:
        dispatch(categoryActions.keyboardCategory());
        break;
      case CATEGORIES.other:
        dispatch(categoryActions.otherCategory());
        break;
      default:
        break;
    }
  };

  // State để show category ở màn hình điện thoại và máy tính bảng
  const [showCategory, setShowCategory] = useState(false);
  const toggleCategory = () => {
    setShowCategory((prevState) => (prevState = !prevState));
  };

  return (
    <>
      <div>
        <button
          className={`py-4 px-4 mb-0 ${styles["categories-header"]}`}
          onClick={toggleCategory}
        >
          Categories{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className={`bi bi-chevron-double-down ${styles["icon-down"]}`}
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
            />
            <path
              fillRule="evenodd"
              d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
            />
          </svg>
        </button>
        <div
          className={`${styles["categories"]} ${
            !showCategory && styles["hide-categories"]
          }`}
        >
          <div>
            <h2 className={`ps-3 py-2 ${styles["apple"]}`}>Apple</h2>
            <button
              onClick={() => changeCategoryHandler(CATEGORIES.all)}
              className={`ps-3 py-2 d-block`}
            >
              All
            </button>
          </div>
          <div>
            <h2 className={`ps-3 py-2`}>Iphone & Mac</h2>
            <button
              onClick={() => changeCategoryHandler(CATEGORIES.iphone)}
              className={`ps-3 py-2 d-block`}
            >
              Iphone
            </button>
            <button
              onClick={() => changeCategoryHandler(CATEGORIES.ipad)}
              className={`ps-3 py-2 d-block`}
            >
              Ipad
            </button>
            <button
              onClick={() => changeCategoryHandler(CATEGORIES.macbook)}
              className={`ps-3 py-2 d-block`}
            >
              Macbook
            </button>
          </div>
          <div>
            <h2 className={`ps-3 py-2`}>Wireless</h2>
            <button
              onClick={() => changeCategoryHandler(CATEGORIES.airpod)}
              className={`ps-3 py-2 d-block`}
            >
              Airpod
            </button>
            <button
              onClick={() => changeCategoryHandler(CATEGORIES.watch)}
              className={`ps-3 py-2 d-block`}
            >
              Watch
            </button>
          </div>
          <div>
            <h2 className={`ps-3 py-2`}>Other</h2>
            <button
              onClick={() => changeCategoryHandler(CATEGORIES.mouse)}
              className={`ps-3 py-2 d-block`}
            >
              Mouse
            </button>
            <button
              onClick={() => changeCategoryHandler(CATEGORIES.keyboard)}
              className={`ps-3 py-2 d-block`}
            >
              Keyboard
            </button>
            <button
              onClick={() => changeCategoryHandler(CATEGORIES.other)}
              className={`ps-3 py-2 d-block`}
            >
              Other
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesSideBar;
