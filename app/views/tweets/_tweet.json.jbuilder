json.extract! tweet, :id, :content, :likes, :user, :created_at, :updated_at
json.retweet do
  if tweet.retweet
    json.partial! tweet.retweet, as: :tweet
  else
    nil
  end
end

json.url tweet_url(tweet, format: :json)
