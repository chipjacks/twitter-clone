class Tweet < ApplicationRecord
  belongs_to :user
  has_many :retweets, class_name: "Tweet", foreign_key: "retweet_id"
  belongs_to :retweet, class_name: "Tweet", optional: true
end
