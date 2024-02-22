import { Link, Form, useActionData, redirect } from "react-router-dom";
import Card from "../UI/Card";
import backgroundImage from "../../images/banner1.jpg";
import styles from "./SignupForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authenticateActions } from "../../store/authenticateSlice";
import { useRef } from "react";
import { phoneNumberValidate } from "../../helper/phoneNumberValidate";

const SignupForm = () => {
  // Khi submit fail sẽ trả về các giá trị để người dùng biết mình nhập sai cái gì
  // và các giá trị đó là giá trị trả về của action nên dùng hook useActionData() để lấy nó
  // data sẽ là object với message thông tin nhập bị sai
  const data = useActionData();

  // Tạo dispatch
  const dispatch = useDispatch();
  // Lấy các state trong redux để cho việc validate
  const nameIsValid = useSelector((state) => state.authenticate.nameIsValid);
  const emailIsValid = useSelector((state) => state.authenticate.emailIsValid);
  const passwordIsValid = useSelector(
    (state) => state.authenticate.passwordIsValid
  );
  const phoneIsValid = useSelector((state) => state.authenticate.phoneIsValid);
  const nameIsTouched = useSelector(
    (state) => state.authenticate.nameIsTouched
  );
  const emailIsTouched = useSelector(
    (state) => state.authenticate.emailIsTouched
  );
  const passwordIsTouched = useSelector(
    (state) => state.authenticate.passwordIsTouched
  );
  const phoneIsTouched = useSelector(
    (state) => state.authenticate.phoneIsTouched
  );
  const emailIsExist = useSelector((state) => state.authenticate.emailIsExist);

  // Tạo ref để lấy giá trị input
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();

  return (
    <>
      <div
        className={`py-5 ${styles["signup-container"]}`}
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
            <h2 className={`py-3 ${styles["form-header"]}`}>Sign Up</h2>

            <Form method="post" className="px-5">
              <div className="my-3">
                <input
                  type="text"
                  className="form-control signup-form-input"
                  placeholder="Full Name"
                  name="full-name"
                  ref={nameRef}
                  onFocus={() =>
                    dispatch(authenticateActions.setNameIstouched())
                  }
                  onBlur={() =>
                    dispatch(
                      authenticateActions.fullnameValidation(
                        nameRef.current.value
                      )
                    )
                  }
                />
                {!nameIsValid && !nameIsTouched && (
                  <p className="text-danger">Name is not valid</p>
                )}
              </div>
              <div className="my-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  ref={emailRef}
                  onFocus={() => {
                    dispatch(authenticateActions.setEmailIsTouched());
                    dispatch(authenticateActions.setEmailExist());
                  }}
                  onBlur={() =>
                    dispatch(
                      authenticateActions.emailValidation(
                        emailRef.current.value
                      )
                    )
                  }
                />
                {!emailIsValid && !emailIsTouched && (
                  <p className="text-danger">
                    {!emailIsExist ? "Email is invalid" : "Email is exist"}
                  </p>
                )}
              </div>
              <div className="my-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  ref={passwordRef}
                  onFocus={() =>
                    dispatch(authenticateActions.setPasswordIsTouched())
                  }
                  onBlur={() =>
                    dispatch(
                      authenticateActions.passwordValidation(
                        passwordRef.current.value
                      )
                    )
                  }
                />
                {!passwordIsValid && !passwordIsTouched && (
                  <p className="text-danger">
                    Password must be greater than 8 characters
                  </p>
                )}
              </div>
              <div className="my-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                  name="phone"
                  ref={phoneRef}
                  onFocus={() =>
                    dispatch(authenticateActions.setPhoneIsTouched())
                  }
                  onBlur={() =>
                    dispatch(
                      authenticateActions.phoneValidation(
                        phoneRef.current.value
                      )
                    )
                  }
                />
                {!phoneIsValid && !phoneIsTouched && (
                  <p className="text-danger">
                    Please enter correct phone number
                  </p>
                )}
              </div>
              <div className={styles["btn-signup"]}>
                {data && <p className="text-danger">{data.errMessage}</p>}
                <button className={`btn py-2 d-block w-100 my-5`}>
                  Sign up
                </button>
              </div>

              <p className={styles["navigate"]}>
                Already have an account ? <Link>Click</Link>
              </p>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SignupForm;

// Tạo action cho Route
export async function action({ request, params }) {
  // Lấy data khi submit form. Form của react-router-dom khi submit sẽ không gửi request đến server mà sẽ gửi đến action của Route
  const req = await request.formData();
  const user = {
    name: req.get("full-name"),
    email: req.get("email"),
    password: req.get("password"),
    phone: req.get("phone"),
  };

  // Lấy danh sách các users đã có từ localStorage
  const prevUserArr = JSON.parse(localStorage.getItem("userArr"));
  // validate email
  let checkExistEmail = false;
  if (prevUserArr) {
    prevUserArr.forEach((u) => {
      if (u.email === user.email) {
        checkExistEmail = true;
      }
    });
  }

  // Validate các giá trị lần nữa trước khi submit form
  if (
    user.name === "" ||
    !user.email.includes("@") ||
    user.password.length < 8 ||
    !phoneNumberValidate(user.phone) ||
    checkExistEmail
  ) {
    // Nếu không vượt qua validate thì sẽ trả về message
    return { errMessage: "Some informations is invalid ! Please recorrect!!" };
  }

  // Nếu trong localStorage có mảng user rồi thì thêm tiếp
  if (prevUserArr) {
    localStorage.setItem("userArr", JSON.stringify([...prevUserArr, user]));
    // Nếu không thì thêm mới
  } else {
    localStorage.setItem("userArr", JSON.stringify([user]));
  }

  // Khi đã vượt qua validate
  // Xuất thông báo đăng kí thành công
  window.alert("Sign up success!!");
  // Điều hướng tới trang login
  return redirect("/login");
}
