import React, { Component } from "react";
import "./App.css";
import Nav from "./page-sections/nav";
import Footer from "./page-sections/footer";
import Content from "./page-sections/content";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav></Nav>
        <Content />
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
