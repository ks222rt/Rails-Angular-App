class Creator < ActiveRecord::Base
  has_secure_password
  has_many :events, dependent: :destroy

  before_save  { self.username = username.downcase }
  validates_length_of :firstname, minimum: 3, maximum: 25
  validates_length_of :lastname, minimum: 3, maximum: 25
  validates :username,
            presence: true,
            length: {maximum: 20},
            uniqueness: { case_sensitive: false }

end
