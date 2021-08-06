import React, { useState } from "react";
import PropTypes from "prop-types";

async function handleNewTweet(content, callback = () => {}) {
  const response = await fetch(`/tweets`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tweet: { content } }),
  });
  callback(await response.json());
}

const NewTweet = (props) => {
  const [content, setContent] = useState("");
  return (
    <div className="mb-3">
      <textarea
        className="form-control mb-1"
        placeholder="What's happening?"
        onInput={(e) => setContent(e.target.value)}
        value={content}
      />
      <button
        className="btn btn-primary"
        onClick={() => {
          setContent("");
          handleNewTweet(content, props.handleCreate);
        }}
      >
        Share
      </button>
    </div>
  );
};

export default NewTweet;
