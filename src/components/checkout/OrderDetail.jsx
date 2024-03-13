import { useSelector } from "react-redux";

const OrderDetail = () => {
  const listCart = useSelector((state) => state.cart.listCart);

  return (
    <>
      <div className="pb-4">
        <div className="bg-light p-5 align-self-center">
          <div>
            <h3>Your order</h3>
            {listCart &&
              listCart.map((cart) => (
                <div key={cart.product._id}>
                  <div className="d-flex gap-5 justify-content-between mt-3">
                    <p className="fw-bold">{cart.product.name}</p>
                    <p>
                      {Number(cart.product.price).toLocaleString("de-DE")} VND x
                      {cart.quantity}
                    </p>
                  </div>
                  <div
                    className="w-100 bg-dark"
                    style={{ height: "2px" }}
                  ></div>
                </div>
              ))}

            <div className="d-flex gap-5 justify-content-between mt-4">
              <p className="fw-bold text-uppercase">Total</p>
              {!listCart && <p>0 VND</p>}
              {listCart && (
                <p className="display-6">
                  {/* Tính tổng giá tiền bằng cách cộng lại toàn bộ total trong listCart */}
                  {Number(
                    listCart.reduce((total, cart) => total + cart.total, 0)
                  ).toLocaleString("de-DE")}
                  VND
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
