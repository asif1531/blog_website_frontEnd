import React from 'react';
import { Navbar,NavbarBrand } from 'reactstrap';

export default function Header() {
  return (
    <>
      <Navbar
        className="my-0"
        dark
      >
        <NavbarBrand href="/">
          BlogWeb
        </NavbarBrand>
      </Navbar>
    </>
  )
}
