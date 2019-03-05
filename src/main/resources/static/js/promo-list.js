var pageNumber = 0;

$(document).ready(function() {
	$("#loader-img").hide();
	$("#fim-btn").hide();
});

// Efeito infinite scroll
$(window).scroll(function() {

	var scrollTop = $(this).scrollTop();
	var conteudo = $(document).height() - $(window).height();

	// console.log('scrollTop: ', scrollTop, ' | ', 'conteudo', conteudo );

	if (scrollTop >= conteudo) {
		pageNumber++;
		setTimeout(function() {
			loadByScrollBar(pageNumber);
		}, 200);
	}
});

function loadByScrollBar(pageNumber) {

	$.ajax({
		method : "GET",
		url : "/promocao/list/ajax",
		data : {
			page : pageNumber
		},
		beforeSend : function() {
			$("#loader-img").show();
		},
		success : function(response) {
			// console.log("resposta > ", response)
			// 150 é utilizado para trazer pouca informações e sair do if
			if (response.length > 150) {

				$(".row").append($(response).hide().fadeIn(400));

			} else {
				$("#loader-img").removeClass("loader");
				$("#fim-btn").show();

			}
		},
		error : function(xhr) {
			alert("Ops, ocorreu um erro: " + xhr.status + " - "
					+ xhr.statusText);
		},
		complete : function() {
			$("#loader-img").hide();
		}
	})
}

// auto complete

$("#autocomplete-input").autocomplete({
	
	source: function(request, response) {
		$.ajax({
			method: "GET",
			url: "/promocao/site",
			data: {
				termo: request.term
			},
			success: function(result) {
				response(result);
			}
		});
	}
	
});


// Adicionar Likes
$(document).on(
		"click",
		"button[id*='likes-btn-']",
		function() {
			var id = $(this).attr("id").split("-")[2];
			console.log("id: ", id);

			$.ajax({
				method : "POST",
				url : "/promocao/like/" + id,
				success : function(response) {
					$("#likes-count-" + id).text(response);
				},
				error : function(xhr) {
					alert("Ops, ocorreu um erro: " + xhr.status + ", "
							+ xhr.statusText);
				}
			});

		});