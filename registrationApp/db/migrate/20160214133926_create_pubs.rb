class CreatePubs < ActiveRecord::Migration
  def change
    create_table :pubs do |t|
      t.string :address
      t.float :latitude
      t.float :longitude

      t.timestamps null: false
    end
  end
end
