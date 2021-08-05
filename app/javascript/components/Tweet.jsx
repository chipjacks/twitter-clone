import React, { useState } from "react";
import PropTypes from "prop-types";

const Tweet = (props) => {
  return (
    <div key={props.id} className="card">
      {props.content}
    </div>
  );
};

Tweet.defaultProps = {};

Tweet.propTypes = {
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
};

export default Tweet;
