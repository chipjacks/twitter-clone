import React, { useState } from "react";
import PropTypes from "prop-types";

const Tweet = (props) => {
  return (
    <div key={props.id} className="card">
      <div className="card-body">
        <h6 className="card-subtitle mb-2">{props.user.email}</h6>
        <p className="card-subtitle text-muted mb-2">{props.created_at}</p>
        <p className="card-text"> {props.content} </p>
      </div>
    </div>
  );
};

Tweet.defaultProps = {};

Tweet.propTypes = {
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
};

export default Tweet;
