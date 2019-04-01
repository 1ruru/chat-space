if @new_message.present?
  json.array! @new_message do |message|
    json.id  message.id
    json.user_name  message.user.name
    json.created message.created_at.strftime("%Y/%m/%d(%a) %H:%M:%S")
    if message.body.present?
      json.body  message.body
    end
    if message.image.present?
      json.image_url  message.image.url
      json.image_alt  message.image.filename
    end
  end
end