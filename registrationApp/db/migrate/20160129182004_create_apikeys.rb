class CreateApikeys < ActiveRecord::Migration
  def change
    create_table :apikeys do |t|
      t.string :key
      t.string :device
      t.belongs_to :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
