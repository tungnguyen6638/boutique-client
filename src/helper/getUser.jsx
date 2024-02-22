import { redirect } from "react-router-dom";

// Hàm để phục vụ việc lấy user trong localStorage
export function getUser() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return currentUser;
}

// Hàm để kiểm tra việc có user login ko, nếu không có thì sẽ điều hướng trang đang truy cập về trang chủ
// (Route protection)
export function checkAuth() {
  const user = getUser();

  if (!user) {
    return redirect("/");
  }
  return null;
}
