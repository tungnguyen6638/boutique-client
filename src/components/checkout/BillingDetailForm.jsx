import styles from "./BillingDetailForm.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { cartActions } from "../../store/cartSlice";

const BillingDetailForm = () => {
  // Các hook cần cho việc submit form
  const dispatch = useDispatch();
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  // Lấy listCart từ redux để tính tổng số tiền để submit form
  const listCart = useSelector((state) => state.cart.listCart);
  const total = Number(listCart.reduce((total, cart) => total + cart.total, 0));

  // Hàm submit form : Khi submit thì sẽ alert ra thông tin người mua và tổng số tiền
  const submitHandler = (event) => {
    event.preventDefault();

    const billingDetail = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      address: addressRef.current.value,
      total: total,
    };

    window.alert(
      `Your order is done : \nName : ${billingDetail.name} \nEmail : ${billingDetail.email} \nPhone : ${billingDetail.phone} \nAddress : ${billingDetail.address} \nTotal : ${billingDetail.total}`
    );

    // Xóa các trường thông tin và xóa listCart trong redux
    nameRef.current.value = "";
    emailRef.current.value = "";
    phoneRef.current.value = "";
    addressRef.current.value = "";
    dispatch(cartActions.deleteAllCart());
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
            />
          </div>
          <div className="form-group pt-4">
            <label className="pb-2">Email: </label>
            <input
              type="text"
              ref={emailRef}
              className="form-control"
              placeholder="Enter Your Email Here!"
            />
          </div>
          <div className="form-group pt-4">
            <label className="pb-2">Phone number:</label>
            <input
              type="text"
              ref={phoneRef}
              className="form-control"
              placeholder="Enter Your Phone Number Here!"
            />
          </div>
          <div className="form-group pt-4">
            <label className="pb-2">Address:</label>
            <input
              type="text"
              ref={addressRef}
              className="form-control"
              placeholder="Enter Your Address Here!"
            />
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
