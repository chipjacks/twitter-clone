json.extract! tweet, :id, :content, :likes, :user_id, :retweet_id, :created_at, :updated_at
json.url tweet_url(tweet, format: :json)
