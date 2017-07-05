class RenamePubTableToEvent < ActiveRecord::Migration
  def change
    rename_table :pubs, :event
  end
end
