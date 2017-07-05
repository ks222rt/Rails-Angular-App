class Tag < ActiveRecord::Base
  has_and_belongs_to_many :events

  validates_length_of :name, minimum: 1, maximum: 50
  validates_associated :events

end
