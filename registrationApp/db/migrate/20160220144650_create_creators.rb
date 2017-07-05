class CreateCreators < ActiveRecord::Migration
  def change
    create_table :creators do |t|
      t.string :firstname
      t.string :lastname

      t.timestamps null: false
    end
  end
end
