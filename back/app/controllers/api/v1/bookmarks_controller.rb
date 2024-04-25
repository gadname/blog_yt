class Api::BookmarksController < ApplicationController
    before_action :set_bookmark, only: [:destroy]
  
    def index
      render json: { bookmarks: Bookmark.all }
    end
  
    def create
      @bookmark = Bookmark.find_or_create_by!(post_id: bookmark_params, user_id: current_user.id)
      render json: { bookmarks: Bookmark.all }
    end
  
    def destroy
      @bookmark.destroy!
      
      render json: { bookmarks: Bookmark.all }
    end
  
    private
  
    def bookmark_params
        params.require(:bookmark).permit(:post_id) ##HTTPリクエストから受け取ったパラメータを扱う
    end ##post_idのみを許可してbookmarkを作成する
  
    def set_bookmark ##bookmarkを削除する
      @bookmark = Bookmark.find_by(
        post_id: params[:id],
        user_id: current_user.id
      )
    end
  end