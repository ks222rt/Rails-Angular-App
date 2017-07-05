class AddDetailsToEvents < ActiveRecord::Migration
  def change
    add_column :events, :zip_code, :string
    add_column :events, :city, :string
    add_column :events, :name, :string
  end
end
