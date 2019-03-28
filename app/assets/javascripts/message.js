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
    var html =`<div class="message">
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
      $('.new-message__input-box--text').val('');
      $('.main-body').animate({scrollTop: $('.main-body')[0].scrollHeight}, 1000);
      $('.form-submit').prop("disabled",false);
    })
    .fail(function(){
      alert('error');
    });
  });
});