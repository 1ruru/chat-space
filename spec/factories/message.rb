FactoryBot.define do
  factory :message do
    body {Faker::Lorem.sentence}
    image {Faker::LoremPixel.image}
    user
    group
  end
end