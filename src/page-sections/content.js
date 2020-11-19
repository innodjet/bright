import React from "react";
import Branding from "../components/branding";
import HoursOfOperation from "../components/hoursOfOperation";

const Content = () => {
  return (
    <div className="container">
      <HoursOfOperation />
      <hr />
      <Branding />
    </div>
  );
};

export default Content;
