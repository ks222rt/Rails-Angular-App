class Apikey < ActiveRecord::Base
  belongs_to :user
  attr_accessor :tmp_user_id

  before_validation { self.key = Array.new(30){rand(36).to_s(36)}.join.upcase }
  before_validation { set_user }
  before_save { self.device = device.downcase }

  def set_user
    if tmp_user_id && User.find_by(id: tmp_user_id)
      self.user_id = tmp_user_id
    end
  end

  validates :device,
            presence: {:message => "mest be entered"},
            length: {maximum: 25 }

  validates :key,
            presence: true,
            uniqueness: true

  validates :user_id,
            presence: true

end
