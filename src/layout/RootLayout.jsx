import { Outlet } from "react-router-dom";
import NavBar from "../components/navigation/NavBar";
import Footer from "../components/footer/Footer";
import LiveChat from "../components/live-chat/LiveChat";

const RootLayout = () => {
  return (
    <>
      <NavBar />
      <LiveChat />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
