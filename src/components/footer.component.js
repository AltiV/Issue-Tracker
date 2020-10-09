import React, { Component } from "react";

import { Navbar } from "react-bootstrap";

export default class Footer extends Component {
  render() {
    return (
        <Navbar bg="light" variant="light" fixed="bottom">
            React Application created by Alan Vuong
        </Navbar>
    );
  }
}
