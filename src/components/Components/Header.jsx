import React from "react";
import { Header as HeaderComponent, Navbar } from "rsuite";

const Header = () => {
  return (
    <HeaderComponent>
      <Navbar appearance="inverse">
        <Navbar.Brand>LOGO</Navbar.Brand>
      </Navbar>
    </HeaderComponent>
  );
};

export default Header;
