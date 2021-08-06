import React, { useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import Tweet from "./Tweet";
import NewTweet from "./NewTweet";

const API_URL = "/tweets.json";
const PAGE_SIZE = 10;

function reducer(state, action) {
  switch (action.type) {
    case "fetchStart":
      return { ...state, loading: true, error: false };
    case "fetchSuccess":
      return {
        ...state,
        loading: false,
        page: state.page + 1,
        tweets: [...(state.tweets ? state.tweets : []), ...action.payload],
      };
    case "fetchError":
      return { ...state, loading: false, error: true };
    case "tweetCreate":
      return {
        ...state,
        tweets: [action.tweet, ...state.tweets],
      };
    case "tweetUpdate":
      return {
        ...state,
        tweets: state.tweets.map((t) => {
          if (t.id === action.tweet.id) {
            return action.tweet;
          } else if ((t.retweet && t.retweet.id) === action.tweet.id) {
            return { ...t, retweet: action.tweet };
          } else {
            return t;
          }
        }),
      };
    default:
      console.log(action.type);
      throw new Error();
  }
}

async function fetchTweets({ loading, page }, dispatch) {
  if (loading) {
    return;
  }
  dispatch({ type: "fetchStart" });
  let url = new URL(API_URL, document.location.origin);
  url.searchParams.set("offset", page * PAGE_SIZE);
  url.searchParams.set("limit", PAGE_SIZE);
  try {
    const response = await fetch(url).then((res) => res.json());
    dispatch({ type: "fetchSuccess", payload: response });
  } catch (e) {
    dispatch({ type: "fetchError" });
  }
}

const Tweets = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    tweets: null,
    loading: false,
    error: false,
    page: 0,
  });

  useEffect(() => {
    fetchTweets(state, dispatch);
  }, []);

  return (
    <div>
      <NewTweet
        handleCreate={(t) => dispatch({ type: "tweetCreate", tweet: t })}
      />
      {state.tweets &&
        state.tweets.map((tweet) => (
          <div key={tweet.id} className="mb-3">
            <Tweet
              {...tweet}
              handleUpdate={(t) => dispatch({ type: "tweetUpdate", tweet: t })}
              handleCreate={(t) => dispatch({ type: "tweetCreate", tweet: t })}
            />
          </div>
        ))}
      <div className="row">
        <button className="btn" onClick={() => fetchTweets(state, dispatch)}>
          Show More
        </button>
        {state.loading && <div className="spinner-border" />}
        {state.error && (
          <div>Sorry, there was a problem. Please try again.</div>
        )}
      </div>
    </div>
  );
};

Tweets.defaultProps = {};

Tweets.propTypes = {};

export default Tweets;
