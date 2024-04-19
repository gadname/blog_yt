class User < ApplicationRecord
    has_many :bookmarks, dependent: :destroy ##userが削除されたらbookmarkも削除される
    has_many :bookmarked_posts, through: :bookmarks, source: :post ##bookmarkを通してpostを取得する
end
