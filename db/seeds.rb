# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Tweet.all.each { |u| u.destroy }
User.all.each { |u| u.destroy }

luke = User.create(email: 'luke@gmail.com', password: 'password')
julie = User.create(email: 'julie@outlook.com', password: 'password')
ron = User.create(email: 'ron@tacos.eat', password: 'password')

100.times do |i|
  Tweet.create(user: luke, content: 'I tweet every day. Day ' ++ (100 - i).to_s, likes: 0, created_at: Date.today - i, updated_at: Date.today - i)
end

t1 = Tweet.create(user: luke,
             content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
             likes: 5)

t2 = Tweet.create(user: julie, retweet: t1, likes: 1)

t3 = Tweet.create(user: ron, content: 'Tacos burritos tostidos potatoes beans rice and more.', likes: 1)

