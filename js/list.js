

$(function(){

	var imageLoader = document.getElementById('filePhoto');
	imageLoader.addEventListener('change',handleImage,false);

	function handleImage(e){
		var reader = new FileReader();
		reader.onload = function(event){
			$('.uploader img').attr('src', event.target.result);
		}
		reader.readAsDataURL(e.target.files[0]);
	}


});

///////////목록
	function searchBook(){
		//입력상자에 키가 입력되면 무조건 호출
		//우리가 원하는 건 enter key를 입력했을 때 서버와 통신
		if(event.keyCode == 13){
		//사용자가 입력한 ISBN번호를 가져와서
		//AJAX로 서버프로그램을 호출
			$.ajax({
				url : "http://localhost:7070/book/bookList",
				type : "GET",
				//서버로부터 오는 데이터가 JSON 문자열
				//추가적으로 JSON 문자열을 JavaScript객체로 자동 변환
				dataType : "jsonp",
				jsonp : "callback",
				data : {
					keyword : $("#place").val()
				},
				success : function(result){
					$("tbody").empty();
					//result : JSON문자열을 JavaScript 객체로 변환시킨 것
						for(var i = 0; i<result.length; i++) {
							var isAble = result[i].share;


							var tr = $("<tr></tr>").attr("data-isbn",result[i].isbn);

							var title_div=$("<div></div>").text(result[i].title);
							var detail_div=$("<div></div>");

							var myTd = $("<td></td>");
							var titleTd=myTd.append(title_div).append(detail_div);
							var authorTd = $("<td></td>").text(result[i].author);
							var priceTd = $("<td></td>").text(result[i].price);
							var img = $("<img/>").attr("src", result[i].img);
							img.css("width","140px");
							var imgTd = $("<td></td>").append(img);

							tr.append(imgTd);
							tr.append(titleTd);
							tr.append(authorTd);
							tr.append(priceTd);


							$("tbody").append(tr);
						}
				},
				error : function(){
					alert("뭔가 이상함");
				}
					
			});
		}



}
