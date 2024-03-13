import Card from "../UI/Card";
import backgroundImage from "../../images/banner1.jpg";
import styles from "./SigninForm.module.css";
import { Form, Link, redirect, useActionData } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticateActions } from "../../store/authenticateSlice";
import { fetchUrl, fetchData } from "../../helper/fetchUrl";

const SigninForm = () => {
  // Action data để lấy các dữ liệu trả về từ action
  const actionData = useActionData();

  // Tạo dispatch để dispatch giá trị cho redux
  const dispatch = useDispatch();
  // Lấy các state trong redux để cho việc validate
  const emailIsValid = useSelector((state) => state.authenticate.emailIsValid);
  const passwordIsValid = useSelector(
    (state) => state.authenticate.passwordIsValid
  );
  const emailIsTouched = useSelector(
    (state) => state.authenticate.emailIsTouched
  );
  const emailIsExist = useSelector((state) => state.authenticate.emailIsExist);
  const passwordIsTouched = useSelector(
    (state) => state.authenticate.passwordIsTouched
  );
  // Tạo ref để lấy giá trị input
  const emailRef = useRef();
  const passwordRef = useRef();

  // Dùng useEffect để khi actionData thay đổi (khi submit fail) sẽ xóa dòng password nếu người dùng nhập sai password
  useEffect(() => {
    if (actionData && actionData.errMessage) {
      document.querySelector(".signin-password").value = "";
    }
  }, [actionData]);

  return (
    <>
      <div
        className={`py-5 ${styles["signin-container"]}`}
        // Tạo background image cho trang signin
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
        }}
      >
        <div
          className={`container d-flex align-items-center justify-content-center`}
        >
          <Card className={`py-5 w-50 text-center ${styles["form"]}`}>
            <h2 className={`py-3 ${styles["form-header"]}`}>Sign In</h2>

            <Form method="post" className="px-5">
              <div className="my-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  ref={emailRef}
                  // Khi focus vào input thì sẽ set isTouched của email input để xóa error message
                  onFocus={() => {
                    dispatch(authenticateActions.setEmailIsTouched());
                  }}
                  // Khi không focus vào input thì sẽ validate email input
                  onBlur={() =>
                    dispatch(
                      authenticateActions.emailValidation(
                        emailRef.current.value
                      )
                    )
                  }
                />
                {/* Xuất ra thông báo nếu email không hợp lệ */}
                {!emailIsValid && !emailIsTouched && !emailIsExist && (
                  <p className="text-danger">Email is invalid</p>
                )}
              </div>
              <div className="my-3">
                <input
                  type="password"
                  className="form-control signin-password"
                  placeholder="Password"
                  name="password"
                  ref={passwordRef}
                  // Khi focus vào input thì sẽ set isTouched của password input để xóa error message
                  onFocus={() =>
                    dispatch(authenticateActions.setPasswordIsTouched())
                  }
                  // Khi không focus vào input thì sẽ validate password input
                  onBlur={() =>
                    dispatch(
                      authenticateActions.passwordValidation(
                        passwordRef.current.value
                      )
                    )
                  }
                />
                {/* Xuất ra thông báo nếu người dùng nhập password dưới 8 kí tự */}
                {!passwordIsValid && !passwordIsTouched && (
                  <p className="text-danger">
                    Password must be greater than 8 characters
                  </p>
                )}
              </div>

              <div className={styles["btn-signin"]}>
                {actionData && (
                  <p className="text-danger">{actionData.errMessage}</p>
                )}
                <button className={`btn py-2 d-block w-100 my-5`}>
                  Sign in
                </button>
              </div>

              <p className={styles["navigate"]}>
                Create an account ? <Link to="/register">Sign up</Link>
              </p>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SigninForm;

// Tạo action cho Route
export async function action({ request, params }) {
  // Lấy data khi submit form. Form của react-router-dom khi submit sẽ không gửi request đến server mà sẽ gửi đến action của Route
  const req = await request.formData();
  const userLogin = {
    email: req.get("email"),
    password: req.get("password"),
  };

  // Gọi api POST login ở server
  const res = await fetchData({
    url: fetchUrl("POST_LOGIN"),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userLogin),
  });

  if (res.hasError) {
    return { errMessage: res.message };
  } else {
    // Set expires time cho cookies
    let now = new Date();
    let time = now.getTime();
    let expireTime = time + 1000 * 36000;
    now.setTime(expireTime);
    // Lưu email và username vào cookies
    document.cookie = `email=${res.user.email};expires=${now.toUTCString()}`;
    document.cookie = `username=${
      res.user.username
    };expires=${now.toUTCString()}`;
    document.cookie = `password=${
      res.user.password
    };expires=${now.toUTCString()}`;
    // Xuất thông báo đăng nhập thành công
    window.alert(res.message);
    // Điều hướng tới trang chủ
    return redirect("/");
  }
}
