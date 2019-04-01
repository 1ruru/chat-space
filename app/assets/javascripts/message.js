$(function(){
  function buildHTML(message){
    var body = ``
    var image = ``
    if (!(typeof(message.body) == "undefined")){
      body = `<p class="message__post-message">
                ${message.body}
              </p>`
    }
    if (!(typeof(message.image_url) == "undefined")){
      image = `<img src="${message.image_url}" alt="${message.image_alt}">`
    }
    var html =`<div class="message" data_id="${message.id}">
                <div class="message__post-info">
                  <p class="message__post-info--post-user">
                  ${message.user_name}
                  </p>
                  <p class="message__post-info--post-date">
                  ${message.created}
                  </p>
                </div>` + body + image + `</div>`;
    return html;
  }

  $('.form-body').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form-body').get(0).reset();
      $('.main-body').animate({scrollTop: $('.main-body')[0].scrollHeight}, 1000);
      $('.form-submit').prop("disabled",false);
    })
    .fail(function(){
      alert('error');
    });
  });

  var messages_body = $('#messages');

  function update(){
    if($('.message')[0]){
      var message_id = $('.message').last().attr('data_id');
    } else {
      var message_id = 0
    }
    $.ajax({
      type: 'GET',
      data:{
        msg_id: message_id
      },
      dataType: 'json'
    })
    .done(function(data){
      $.each(data, function(i, data){
        messages_body.append(buildHTML(data));
      });
      $('.main-body').animate({scrollTop: $('.main-body')[0].scrollHeight}, 1000);
    })
    .fail(function(){
      alert('自動更新に失敗しました');
    });
  }

  $(function(){
    setInterval(update, 5000);
  });
});