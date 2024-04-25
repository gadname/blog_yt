class CreateBookmarks < ActiveRecord::Migration[7.1]
  def change
    create_table :bookmarks do |t|
      t.bigint "user_id", null: false
      t.bigint "post_id", null: false

      t.timestamps
    end

    add_index :bookmarks, :user_id, name: "index_bookmarks_on_user_id"
    add_index :bookmarks, :post_id, name: "index_bookmarks_on_post_id"
  end
end
