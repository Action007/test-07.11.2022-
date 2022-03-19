import React from "react";
import ScrollToTop from "../../../utils/ScrollToTop";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const Layout = ({ children }) => {
  return (
    <ScrollToTop>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </ScrollToTop>
  );
};

export default Layout;
