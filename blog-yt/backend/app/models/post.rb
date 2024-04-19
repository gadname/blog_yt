class Post < ApplicationRecord ##ActiveRecord::Baseを継承している 設計図
    has_many :bookmarks, dependent: :destroy
    has_many :bookmarked_users, through: :bookmarks, source: :user
end
