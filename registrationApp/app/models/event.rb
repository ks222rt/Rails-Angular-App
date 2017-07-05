class Event < ActiveRecord::Base
  belongs_to :creator
  has_and_belongs_to_many :tags, dependet: :destroy

  before_save { self.city = city.downcase }

  validates_presence_of :address, :zip_code, :city, :name
  accepts_nested_attributes_for :tags, reject_if: :does_exists?

  geocoded_by :get_place
  after_validation :geocode

  def get_place
    [address, zip_code, city, 'Sweden'].compact.join(', ')
  end

  def does_exists?(attributed)
    if Tag.find_by_name(attributed['name'])
      self.tags << Tag.find_by_name(attributed['name'])
      return true
    else
      return false
    end
  end
end
