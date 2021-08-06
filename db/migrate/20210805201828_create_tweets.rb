class CreateTweets < ActiveRecord::Migration[6.1]
  def change
    create_table :tweets do |t|
      t.text :content
      t.integer :likes, null: false, default: 0
      t.references :user, null: false, foreign_key: true
      t.references :retweet, foreign_key: { to_table: :tweets }

      t.timestamps
    end
  end
end
