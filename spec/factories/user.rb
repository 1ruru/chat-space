FactoryBot.define do
  factory :user do
    name {Fake::Name.last_name}
    email {Fake::Internet.free_email}
    fake_password = Fake::Internet.password(8)
    password {fake_password}
    password_confirmation {fake_password}
  end
end