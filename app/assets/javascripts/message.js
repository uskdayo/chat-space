$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="main_chat__messages__message" data-message-id=${message.id}>
          <div class="main_chat__messages__message__mainitem">
            <div class="main_chat_messages___message__mainitem__name">
              ${message.user_name}
            </div> 
            <div class="main_chat__messages__message__mainitem__date">
              ${message.created_at}
            </div>
          </div>
          <div class="main_chat__messages__text">
            <p class="main_chat__messages__text__content">
              ${message.content}
            </p>
          </div> 
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
     `<div class="main_chat__messages__message" data-message-id=${message.id}>
        <div class="main_chat__messages__message__mainitem">
          <div class="main_chat__messages__message__mainitem__name">
            ${message.user_name}
          </div> 
          <div class="main_chat__messages__message__mainitem__date">
            ${message.created_at}
          </div>
        </div>
        <div class="main_chat__messages__text">
          <p class="main_chat__messages__text__content">
            ${message.content}
          </p>
        </div> 
      </div>`
      return html;   
      }; 
  }       
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main_chat__messages').append(html);
      $('form')[0].reset();
      $('.main_chat__messages').animate({ scrollTop: $('.main_chat__messages')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(() => {
      $(".main_chat__form__send").removeAttr("disabled");
    });
  });

  var reloadMessages = function() {
    var last_message_id = $('.main_chat__messages__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log(messages);
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.main_chat__messages').append(insertHTML);
      $('.main_chat__messages').animate({ scrollTop: $('.main_chat__messages')[0].scrollHeight});
    }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});

