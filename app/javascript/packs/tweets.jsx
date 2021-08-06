import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Tweets from "../components/Tweets";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Tweets />, document.getElementById("main"));
});
