$(document).ready(function(){

    $('form').on('submit', function(){
        let user = $('#user')
        let pwd = $('#pwd')

        let info ={
            user: user.val(),
            pwd: pwd.val()
        }
  
        $.ajax({
          type: 'POST',
          url: '/',
          data: info,
          success: function(data){
            //do something with the data via front-end framework
            window.location.replace("/dashboard")
          }
        });
  
        return false;
    })
})