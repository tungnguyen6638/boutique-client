import { Outlet } from "react-router-dom";
import NavBar from "../components/navigation/NavBar";
import LiveChat from "../components/live-chat/LiveChat";

const RootLayout = () => {
  return (
    <>
      <main>
        <NavBar />
        <LiveChat />
        <section>
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default RootLayout;
