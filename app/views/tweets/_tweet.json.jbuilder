json.extract! tweet, :id, :content, :likes, :user, :retweet, :created_at, :updated_at
json.url tweet_url(tweet, format: :json)
