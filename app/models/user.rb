class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :users_groups
  has_many :groups, through: :users_groups
  has_many :messages
end
