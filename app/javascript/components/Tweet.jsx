import React, { useState } from "react";
import PropTypes from "prop-types";

const Tweet = (props) => {
  return <div className="card">{props.content}</div>;
};

Tweet.defaultProps = {};

Tweet.propTypes = {
  content: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
};

export default Tweet;
