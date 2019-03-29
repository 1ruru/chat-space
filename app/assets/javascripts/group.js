$(function(){

  var search_list = $('#user-search-result');
  var member_list = $('#group-member-list');

  var members = [];

  function appendUser(group){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${group.user_name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data_user_id="${group.user_id}" data_user_name="${group.user_name}">追加</a>
                </div>`;

    search_list.append(html);
  }

  function appendErrMsgToHTML(msg){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`;
    search_list.append(html);
  }

  function appendGroupMember(user_data){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user_data.name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove" data_user_id="${user_data.id}" data_user_name="${user_data.name}">削除</a>
                </div>`;

    member_list.append(html);
  }

  $('#user-search-field').on('keyup', function(){
    var input = $('#user-search-field').val();
    console.log(input);
    $.ajax({
      type: "GET",
      url: '/groups/new',
      data: {keyword: input},
      dataType: "json",
    })
    .done(function(groups){
      console.log(groups.length);
      $('#user-search-result').empty();
      if(groups.length !== 0){
        groups.forEach(function(group){
          if(members.indexOf(group.user_id) == -1 && input.length !== 0){
            appendUser(group);
          }
        });
      }
      else{
        appendErrMsgToHTML("一致するユーザーはいません");
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    });
  });

    $('#user-search-result').on('click', '.user-search-add', function(e){
      e.preventDefault();
      console.log("user-search-add was clicked");
      var user_data = {};
      var id_str = $(this).attr('data_user_id');
      user_data.id = parseInt(id_str, 10);
      user_data.name = $(this).attr('data_user_name');
      var checkbox_select = '#group_user_ids_' + id_str;
      var user_search_select = '#user-search-result a[data_user_id="' + id_str + '"]';
      if(members.indexOf(user_data.id) == -1){
        appendGroupMember(user_data);
        $(checkbox_select).prop("checked", true);
        members.push(user_data.id);
        $(user_search_select).parent().remove();
        console.log(members);
      }
      else{
        alert('そのユーザーはすでに追加されています')
      }

      $(this).prop("disabled",false);
    });

  $('#group-member-list').on('click', '.user-search-remove', function(e){
    e.preventDefault();
    console.log("user-search-remove was clicked");
    var id_str = $(this).attr('data_user_id');
    var user_id = parseInt(id_str, 10);
    var checkbox_select = '#group_user_ids_' + id_str;
    $(this).parent().remove();
    $(checkbox_select).prop("checked", false);
    members = members.filter(n => n !== user_id);
    console.log(members);
    $(this).prop("disabled",false);
  });

});