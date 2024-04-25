class Api::V1::PostsController < ApplicationController
  def index
    @Posts = Post.all  
    render json: @Posts ##json
  end

  def show
    @Post = Post.find(params[:id])
    render json: @Post 
  end

  def create
    @Post = Post.new(post_params)
    if  @Post.save ##
      render json: @Post, status: :created
    else
      render json: @Post.errors, status: :unprocessable_entity ##422エラー(リクエストは来ているが、読み取れない)
    end
  end

  def update
    @Post = Post.find(params[:id])
    if  @Post.update(post_params) 
      render json: @Post
    else
      render json: @Post.errors, status: :unprocessable_entity ##422エラー(リクエストは来ているが、読み取れない)
    end
  end

  def destroy
    @Post = Post.find(params[:id])
    @Post.destroy
  end

  private

  def post_params
    params.require(:post).permit(:title, :content)
  end
end
