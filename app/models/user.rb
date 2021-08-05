class User < ApplicationRecord
  has_many :tweet, dependent: :destroy
end
