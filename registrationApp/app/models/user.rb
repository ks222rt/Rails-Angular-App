class User < ActiveRecord::Base
  has_secure_password
  has_many :apikeys, dependent: :destroy
  has_and_belongs_to_many :roles

  before_save { self.email = email.downcase }
  before_save { self.username = username.downcase }

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email,
            presence: {:message => "must be entered"},
            format: { with: VALID_EMAIL_REGEX },
            uniqueness: { case_sensitive: false }

  validates :username,
            presence: {:message => "must be entered"},
            length:  { maximum: 15 },
            uniqueness:  { case_sensitive: false }

end
