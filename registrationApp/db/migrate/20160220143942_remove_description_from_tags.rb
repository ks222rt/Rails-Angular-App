class RemoveDescriptionFromTags < ActiveRecord::Migration
  def change
    remove_column :tags, :description, :string
  end
end
