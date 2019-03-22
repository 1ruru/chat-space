FactoryBot.define do
  factory :message do
    body {Faker::Lorem.sentence}
    image {Rack::Test::UploadedFile.new(Rails.root.join('public/images/test.png'), 'image/png')}
    user
    group
  end
end