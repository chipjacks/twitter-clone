class TweetsController < ApplicationController
  before_action :set_tweet, only: %i[ show edit update destroy ]
  before_action :logged_in_user
  skip_before_action :verify_authenticity_token, only: [ :like, :retweet, :create ]

  # GET /tweets or /tweets.json
  def index
    @tweets = Tweet
      .includes(:user, retweet: [:user])
      .limit(params[:limit])
      .offset(params[:offset])
      .order(created_at: :desc)
  end

  # GET /tweets/1 or /tweets/1.json
  def show
  end

  # GET /tweets/new
  def new
    @tweet = Tweet.new
  end

  # GET /tweets/1/edit
  def edit
  end

  # POST /tweets or /tweets.json
  def create
    @tweet = Tweet.new(tweet_params)
    @tweet.user = current_user
    @tweet.likes ||= 0

    respond_to do |format|
      if @tweet.save
        format.html { redirect_to @tweet, notice: "Tweet was successfully created." }
        format.json { render :show, status: :created, location: @tweet }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @tweet.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tweets/1 or /tweets/1.json
  def update
    respond_to do |format|
      if @tweet.update(tweet_params)
        format.html { redirect_to @tweet, notice: "Tweet was successfully updated." }
        format.json { render :show, status: :ok, location: @tweet }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @tweet.errors, status: :unprocessable_entity }
      end
    end
  end

  def like
    respond_to do |format|
      @tweet = Tweet.find(params[:id])
      @tweet.likes += 1
      @tweet.save!
      format.json { render :show, status: :ok, location: @tweet }
    end
  end

  def retweet
    respond_to do |format|
      retweet = Tweet.find(params[:id])
      @tweet = Tweet.create(user: current_user, retweet: retweet, likes: 0);
      format.json { render :show, status: :ok, location: @tweet }
    end
  end

  # DELETE /tweets/1 or /tweets/1.json
  def destroy
    @tweet.destroy
    respond_to do |format|
      format.html { redirect_to tweets_url, notice: "Tweet was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tweet
      @tweet = Tweet.find(params[:id])
    end

    def paginate_params
      params.permit(:offset, :limit)
    end

    # Only allow a list of trusted parameters through.
    def tweet_params
      params.require(:tweet).permit(:content, :likes, :retweet_id)
    end
end
