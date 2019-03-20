class Group < ApplicationRecord
  validates :name, presence: true
  has_many :users, through: :users_groups
  has_many :messages
end
