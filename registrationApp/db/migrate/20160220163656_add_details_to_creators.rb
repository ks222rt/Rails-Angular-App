class AddDetailsToCreators < ActiveRecord::Migration
  def change
    add_column :creators, :username, :string
    add_column :creators, :password, :string
  end
end
