import React from "react";
import Header from "../../Components/Header";
// import ScrollToTop from "../../../utils/ScrollToTop";
// import Header from "../../components/Header/Header";

const Layout = ({ children }) => {
  return (
    // <ScrollToTop>
    <>
      <Header />
      <main>{children}</main>
    </>
    // </ScrollToTop>
  );
};

export default Layout;
