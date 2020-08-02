$(document).ready(function(){	
	$("#signupform").submit(function(e){
		e.preventDefault();
		const data = {
			username:$('#username').val(),
			email:$('#email').val(),
			password:$('#password').val(),
		}
		//var form_data = $( this ).serializeArray()
		$.ajax({
	      type : "POST",	      
	      url : 'http://localhost:3090/user/signup',
	      //data : JSON.stringify(form_data), 
	      data : data,
	      beforeSend: function() {
        	$('.loader').show();
          },
		  complete: function() {
		    $('.loader').hide();
		  },     
	      success : function(customer) {
	        if(customer.errors){
	        		console.log(customer);
	        } else {
	        	console.log(customer);
	        }
	      },
	      error : function(e) {
	        var errors = JSON.parse(e.responseText);
	        error_handlers(errors);
	      }
	    });
		return false;
	});

	$("#loginform").submit(function(e){
		e.preventDefault();
		const data = {
			email:$('#email').val(),
			password:$('#password').val(),
		}
		//var form_data = $( this ).serializeArray()
		$.ajax({
	      type : "POST",	      
	      url : 'http://localhost:3090/user/login',
	      //data : JSON.stringify(form_data), 
	      data : data,
	      beforeSend: function() {
        	$('.loader').show();
          },
		  complete: function() {
		    $('.loader').hide();
		  },     
	      success : function(customer) {
	        if(customer.errors){
	        		console.log(customer);
	        } else {
	        	console.log(customer);
	        }
	      },
	      error : function(e) {
	        var errors = JSON.parse(e.responseText);
	        error_handlers(errors);
	      }
	    });
		return false;
	});
});
function error_handlers(err){
	console.log(typeof err);
	return false;
}