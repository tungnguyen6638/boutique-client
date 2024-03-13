import styles from "./BillingDetailForm.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { cartActions } from "../../store/cartSlice";
import { getUser } from "../../helper/getUser";
import { authenticateActions } from "../../store/authenticateSlice";
import { fetchData, fetchUrl } from "../../helper/fetchUrl";
import { useNavigate } from "react-router-dom";

const BillingDetailForm = () => {
  const navigate = useNavigate();
  const user = getUser();

  // Các hook cần cho việc submit form
  const dispatch = useDispatch();
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  // Lấy listCart từ redux để tính tổng số tiền để submit form
  const listCart = useSelector((state) => state.cart.listCart);
  const total = Number(listCart.reduce((total, cart) => total + cart.total, 0));

  // Lấy các state trong redux để cho việc validate
  const nameIsValid = useSelector((state) => state.authenticate.nameIsValid);
  const emailIsValid = useSelector((state) => state.authenticate.emailIsValid);
  const addressIsValid = useSelector(
    (state) => state.authenticate.addressIsValid
  );
  const phoneIsValid = useSelector((state) => state.authenticate.phoneIsValid);
  const nameIsTouched = useSelector(
    (state) => state.authenticate.nameIsTouched
  );
  const emailIsTouched = useSelector(
    (state) => state.authenticate.emailIsTouched
  );
  const addressIsTouched = useSelector(
    (state) => state.authenticate.addressIsTouched
  );
  const phoneIsTouched = useSelector(
    (state) => state.authenticate.phoneIsTouched
  );

  // Hàm submit khi thanh toán
  const submitHandler = async (event) => {
    event.preventDefault();

    const billingDetail = {
      buyerName: nameRef.current.value,
      buyerEmail: emailRef.current.value,
      buyerPhone: phoneRef.current.value,
      buyerAddress: addressRef.current.value,
      cart: listCart,
      total: total,
      email: user.email,
      password: user.password,
    };

    // Gọi đến API post order
    const res = await fetchData({
      url: fetchUrl("POST_ORDER"),
      method: "POST",
      body: JSON.stringify(billingDetail),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.hasError) {
      window.alert(res.message);
    } else {
      window.alert(res.message);
      // Xóa các trường thông tin và xóa listCart trong redux
      nameRef.current.value = "";
      emailRef.current.value = "";
      phoneRef.current.value = "";
      addressRef.current.value = "";
      dispatch(cartActions.deleteAllCart());
      navigate("/");
    }
  };

  return (
    <>
      <div className="flex-fill" onSubmit={submitHandler}>
        <h2 className="pt-3">Billing details</h2>
        <form method="post">
          <div className="form-group pt-4">
            <label className="pb-2">Full name:</label>
            <input
              type="text"
              ref={nameRef}
              className="form-control"
              placeholder="Enter Your Fullname Here!"
              onFocus={() => dispatch(authenticateActions.setNameIstouched())}
              onBlur={() =>
                dispatch(
                  authenticateActions.fullnameValidation(nameRef.current.value)
                )
              }
            />
            {!nameIsValid && !nameIsTouched && (
              <p className="text-danger">Name is not valid</p>
            )}
          </div>
          <div className="form-group pt-4">
            <label className="pb-2">Email: </label>
            <input
              type="text"
              ref={emailRef}
              className="form-control"
              placeholder="Enter Your Email Here!"
              onFocus={() => {
                dispatch(authenticateActions.setEmailIsTouched());
              }}
              onBlur={() =>
                dispatch(
                  authenticateActions.emailValidation(emailRef.current.value)
                )
              }
            />
            {!emailIsValid && !emailIsTouched && (
              <p className="text-danger">Email is invalid</p>
            )}
          </div>
          <div className="form-group pt-4">
            <label className="pb-2">Phone number:</label>
            <input
              type="text"
              ref={phoneRef}
              className="form-control"
              placeholder="Enter Your Phone Number Here!"
              onFocus={() => dispatch(authenticateActions.setPhoneIsTouched())}
              onBlur={() =>
                dispatch(
                  authenticateActions.phoneValidation(phoneRef.current.value)
                )
              }
            />
            {!phoneIsValid && !phoneIsTouched && (
              <p className="text-danger">Please enter correct phone number</p>
            )}
          </div>
          <div className="form-group pt-4">
            <label className="pb-2">Address:</label>
            <input
              type="text"
              ref={addressRef}
              className="form-control"
              placeholder="Enter Your Address Here!"
              onFocus={() =>
                dispatch(authenticateActions.setAddressIsTouched())
              }
              onBlur={() =>
                dispatch(
                  authenticateActions.addressValidation(
                    addressRef.current.value
                  )
                )
              }
            />
            {!addressIsValid && !addressIsTouched && (
              <p className="text-danger">
                Address must not be empty and length is greater than 5
              </p>
            )}
          </div>

          <div className={styles["btn-bill"]}>
            <button type="submit" className="my-4 w-100 btn">
              Place order
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BillingDetailForm;
