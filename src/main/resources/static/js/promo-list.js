
var pageNumber = 0;

$(document).ready(function() {
	$("#loader-img").hide();
	$("#fim-btn").hide();
});

//Efeito infinite scroll
$(window).scroll(function() {
	
	var scrollTop = $(this).scrollTop();
	var conteudo = $(document).height() - $(window).height();
	
	// console.log('scrollTop: ', scrollTop, ' | ', 'conteudo', conteudo );
	
	if(scrollTop >= conteudo) {
		pageNumber ++;		
		setTimeout(function () {
			loadByScrollBar(pageNumber);
		}, 200);
	}
});


function loadByScrollBar(pageNumber) {
	
	$.ajax({
		method: "GET",
		url: "/promocao/list/ajax",
		data: {
			page: pageNumber
		},
		beforeSend: function() {
			$("#loader-img").show();
		},
		success: function(response) {
			// console.log("resposta > ", response)
			//150 é utilizado para trazer pouca informações e sair do if
           if(response.length > 150){
			
			$(".row").fadeIn(250, function() {
        	   $(this).append(response);
           });
			
           }else {
        	   $("#fim-btn").show();
        	   $("#loader-img").removeClass("loader");
           }
		},
		error: function(xhr) {
			alert("Ops, ocorreu um erro: " + xhr.status + " - " + xhr.statusText);
		},
		complete: function() {
			$("#loader-img").hide();
		}
	})
}