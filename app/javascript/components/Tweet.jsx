import React, { useState } from "react";
import PropTypes from "prop-types";

async function handleLike(id, callback) {
  const response = await fetch(`/tweets/${id}/like`, { method: "PUT" });
  callback(await response.json());
}

function Tweet(props) {
  return (
    <div className="card">
      <div className="card-body">
        <h6 className="card-subtitle mb-2">{props.user.email}</h6>
        <p className="card-subtitle text-muted mb-2">{props.created_at}</p>
        {props.retweet ? (
          Tweet({
            ...props.retweet,
            handleUpdate: props.handleUpdate,
            isRetweet: true,
          })
        ) : (
          <p className="card-text"> {props.content} </p>
        )}
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => {
            handleLike(props.id, props.handleUpdate);
          }}
        >
          Likes {props.likes}
        </button>
      </div>
    </div>
  );
}

Tweet.defaultProps = {};

Tweet.propTypes = {
  id: PropTypes.number.isRequired,
  isRetweet: PropTypes.bool,
  content: PropTypes.string,
  likes: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  retweet: PropTypes.object,
  handleUpdate: PropTypes.func.isRequired,
};

export default Tweet;
