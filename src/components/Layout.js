
import { Outlet } from "react-router-dom";
import TemplateList from "./TemplateList";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="text-white shadow-md">
      <Header />
      <TemplateList />
      <Outlet />
    </div>
  );
};

export default Layout;
