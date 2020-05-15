$(function() {

  var name=[];
  function addUser(user) {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }
  function addDeleteUser(name, id) {
    let html = `<div class="chat-group-user clearfix js-chat-member">
                <input name="group[user_ids][]" type="hidden" value="${id}">
                <p class="chat-group-user__name">
                ${name}
                </p>
                <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">
                削除
                </a>
                </div>`
    $(".js-add-user").append(html);
  }
  // function addMember(userId) {
  //   let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" >`;
  //   $(`#${userId}`).append(html);
  // }
  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    let member = $("#chat-group-users").find("p").text;
    // let exceptId = []
    let members = $('input[name="group[user_ids][]"]').map(function(){
                       return $(this).val();
                    });
    let exceptIds = members.get();

    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input,
              ids: exceptIds
              },
      dataType: "json"
    })
      .done(function(users) {
        $("#user-search-result").empty();

        if (users.length !== 0) {
          users.forEach(function(user) {
            addUser(user);
          });
        } else if (input.length == 0) {
          return false;
        } else {
          addNoUser();
        }
      })
      .fail(function() {
        alert("通信エラーです。ユーザーが表示できません。");
      });
  });
  $(document).on("click", ".chat-group-user__btn--add", function() {
    // console.log
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    name.push(userName);
    // console.log(name);
   
    $(this)
      .parent()
      .remove();
    addDeleteUser(userName, userId);
    // addMember(userId);

  });
  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this)
      .parent()
      .remove();
      const userName = $(this).attr("data-user-name");
      name.pop(userName);
  });
});