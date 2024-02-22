import Card from "../UI/Card";
import backgroundImage from "../../images/banner1.jpg";
import styles from "./SigninForm.module.css";
import { Form, Link, redirect, useActionData } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticateActions } from "../../store/authenticateSlice";

const SigninForm = () => {
  // Khi submit fail sẽ trả về các giá trị để người dùng biết mình nhập sai cái gì
  // và các giá trị đó là giá trị trả về của action nên dùng hook useActionData() để lấy nó
  // actionData sẽ là object với 2 property emailFail và passwordFail với 2 trường hợp
  // email hoặc password nhập ko đúng
  // (sẽ giải thích chi tiết hơn ở phần action bên dưới)
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
    if (actionData && (actionData.passwordFail || actionData.emailFail)) {
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
                {/* Xuất ra thông báo nếu email đã tồn tại */}
                {actionData && actionData.emailFail && (
                  <p className="text-danger">Email is not exist</p>
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
                {/* Xuất ra thông náo nếu password không hợp lệ */}
                {actionData && actionData.passwordFail && (
                  <p className="text-danger">Password is incorrect</p>
                )}
              </div>

              <div className={styles["btn-signin"]}>
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

  // Lấy danh sách các users đã có từ localStorage
  const users = JSON.parse(localStorage.getItem("userArr"));
  // Nếu localStorage ko có thì sẽ xuất ra lỗi
  if (!users) {
    return { emailFail: true };
  }

  // filter danh sách, nếu user đã tồn tại thì gán vào biến userExist , nếu ko thì userExist = undefined
  const userExist = users.filter((user) => user.email === userLogin.email)[0];

  // Nếu có tồn tại user trong list
  if (userExist) {
    // kiểm tra password của user nhập vào và user trong list
    if (userExist.password === userLogin.password) {
      // Nếu khớp thì sẽ gán currentUser trong localStorage thành user đó
      localStorage.setItem("currentUser", JSON.stringify(userExist));
      // xuất thông báo ra cho người dùng đã login thành công
      window.alert("Login success");
      // Điều hướng đến trang home
      return redirect("/");
    } else {
      // Nếu user tồn tại mà sai password trả về object có emailFail = false, passwordFail = true
      return { emailFail: false, passwordFail: true };
    }
  } else {
    // Nếu user không tồn tại trả về object có emailFail = true, passwordFail = true
    return { emailFail: true, passwordFail: true };
  }
}
