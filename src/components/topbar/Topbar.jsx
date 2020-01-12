import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './Topbar.css'

const Topbar = () => (
  <div className={"h-8"}>
    <Navbar bg={"dark"} variant={"dark"} expand={"lg"}>
        <Navbar.Brand>
            Beercrawl
        </Navbar.Brand>
    </Navbar>
  </div>
);

export default Topbar;