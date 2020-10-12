$(document).ready(function(){

    $('#cartOpen').on('click', function(){
        $('body').addClass('open')
    })

    $('#cartClose').on('click', function(){
        $('body').removeClass('open');
    })
    

    // $("input[type='number']").inputSpinner()

    // $('#add').on('click', function(){
    //     $('.prodName').html($(this).parent().sibling('.product__title').html())
    // })

    // $('form').on('submit', function(e){  
    //     e.preventDefault()   

    //     let qty = $('.qty').val()
    //     let id = $(this).attr('id')
    //     // let price = $('.product_price').html()

    //     // alert (price)

    //     let obj = {
    //         // price: price,
    //         qty: qty,
    //         id: id
    //     }

    //     alert(obj.qty)

    //     $.ajax({
    //       type: 'POST',
    //       url: '/cart',
    //       data: obj,
    //       success: function(data){
    //         //do something with the data via front-end framework
    //         window.location.replace(`/${data}`)
    //       }
    //     });
  
    //     return false;
    // })

    
})

