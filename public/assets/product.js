$(document).ready(function(){
    $('#addForm').on('submit', function(e){

        e.preventDefault()

        let name = $('#addName')
        let price = $('#addPrice')
        let qty = $('#addQty')

        let prod = {
            name: name.val(),
            price: price.val(),
            qty: qty.val()
        }

        

        $.ajax({
          type: 'POST',
          url: '/product',
          data: prod,
          success: function(data){
            //do something with the data via front-end framework
            location.reload();
          }
        })
    })

    // ********************inputing values to the modals************************************************

    $('.edit').on('click', function(){
      let id = $(this).parent().attr('id')

      $('#editName').val($(this).parent().siblings(".name").html());
      $('#editPrice').val($(this).parent().siblings(".price").html());
      $('#editQty').val($(this).parent().siblings(".qty").html());
    })

    // ********************Editing the values************************************************

  $('#editForm').on('submit', function(){
    
        
      let name = $('#editName')
      let price = $('#editPrice')
      let qty = $('#editQty')

      let prod = {
          name: name.val(),
          price: price.val(),
          qty: qty.val()
      }
      

      $.ajax({
        type: 'PATCH',
        url: '/product',
        data: prod,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      })
  })

  /********************************** removing product ******************************************/

  $('.delete').on('click', function(){

      let id = $(this).parent().attr('id')

      alert(id)

      var info = {id: id};

      $.ajax({
        type: 'DELETE',
        url: '/product',
        data: info,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      })  
  })
})








//****************************** Stan's code ************************** */ 

// $(document).ready(function(){

//   $('#addForm').on('submit', function(){
//       let name = $('#addName');
//       let price = $('#addPrice');
//       let qty = $('#addQty');
//       let desc = $('#addDesc');
//       let entry = {name: name.val(), price: price.val(), quantity: qty.val(), description: desc.val()};

//       $.ajax({
//         type: 'POST',
//         url: '/products',
//         data: entry,
//         success: function(data){
//           //do something with the data via front-end framework
//           location.reload();
//         }
//       });

//       return false;
//   });

//   $('#editForm').on('submit', function(){
//       let name = $('#editName');
//       let price = $('#editPrice');
//       let qty = $('#editQty');
//       let desc = $('#editDesc');

//       let id =  $('#editId').val();
//       let entry = {name: name.val(), price: price.val(), quantity: qty.val(), description: desc.val()};

//       $.ajax({
//         type: 'PATCH',
//         url: '/products/' + id,
//         data: entry,
//         success: function(data){
//           //do something with the data via front-end framework
//           location.reload();
//         }
//       });

//       return false;
//   });



//   $('.edit').on('click', function(){
//       let id = $(this).parent().attr('id');

//       $('#editId').val(id);

//       $('#editName').val($(this).parent().siblings(".name").html());
//       $('#editPrice').val($(this).parent().siblings(".price").html());
//       $('#editQty').val($(this).parent().siblings(".qty").html());
//       $('#editDesc').val($(this).parent().siblings(".desc").html());
//   });

//   $('.delete').on('click', function(){
//       let id = $(this).parent().attr('id');

//       $.ajax({
//         type: 'DELETE',
//         url: '/products/' + id,
//         success: function(data){
//           location.reload();
//         }
//       });
//   });

// })
