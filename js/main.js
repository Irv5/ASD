/* ASD Project 1 Irvin Reaves*/

$(document).ready(function() {
	$.ajax({
		"url": "_view/songs",
		"dataType": "json",
		"success": function(data) {
			$.each(data.rows, function(index, song) {
				var type = song.value.type;
				var when = song.value.when;
				var party = song.value.party;
				$('#songlist').append(
					$('<li>').append(
							$('<a>').attr("href", "#")
									.text(type)
									)
				);
			});
			$('#songlist').listview('refresh');	
		}	
	});
});
$('#submit').live('click', function saveItem(id) {
	var d = new Date();
	var key = (d.getTime());
	var sname = $('#sname').val();
	var aname = $('aname').val();
	var arname = $('arname').val();
	var url = $('url').val();
	if($('#Yes').attr('checked')){
		var favorite = "Yes"
	}else{
		var favorite = "No"
	}
	var rate = $('#rate').val();
		var recommend = $('#recommend:checked').val();
	if(recommend =="on") {
		var recommend = "Yes"
	}else{
		var recommend = "No"
	}
	
	var dropdown = $('#dropdown').val();
	var allItems = [sname, aname, arname,url, favorite, recommend, dropdown];
	localStorage.setItem(key, allItems);
	location.reload();
	alert("Your Song Has Been Cataloged.");

});
function clearData() {
	if(localStorage.length === 0) {
		alert("There is nothing in Storage");
	} else {
		localStorage.clear();
		alert("Data has been cleared");
		return false;
	}
}

function getItems() {
	var getListdiv = $('#display')[0];
	
	for(var i = 0, len = localStorage.length; 1 < len; i++) {
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		value = value.split(',');
		var sname = value[0];
		var aname = value[1];
		var arname = value[2];
		var url = value[3];
		var favorite = value[4];
		var rate = value[5];
		var recommend = value[6];
		var dropdown = value[7];
		var newDiv = document.createElement("div");
		
		var new3 = document.createElement("h3");
		
		var setdiv = newDiv.setAttribute("data-role", "fieldcontain");
		$('<h3 />', {
			text : value[0] +" "+ value[1]
		}).appendTo(newDiv);
		var setdiv = newDiv.setAttribute("data-role", "fieldcontain");
		
		$('<p />', {
			text : 'arname: ' + value[2]
		}).appendTo(newDiv);
		
		$('<p />', {
			text : 'url: ' + value[3]
		}).appendTo(newDiv);	
		
		$('<p />', {
			text : 'favorite: ' + value[4]
		}).appendTo(newDiv);
		
		$('<p />', {
			text : 'rate: ' + value[5]
		}).appendTo(newDiv);
	
		$('<p />', {
			text : 'recommend: ' + value[6]
		}).appendTo(newDiv);
		
		$('<p />', {
			text : 'Song Type: ' + value[7]
		}).appendTo(newDiv);

		var minImage = "cta2.gif";
		if(dropdown == "Fun") {
			minImage = "Fun.gif";
		}
		if(dropdown == "Other") {
			minImage = "Other.gif";
		}
		if(dropdown == "Party") {
			minImage = "Party.gif";
		}
		if(dropdown == "Relaxed") {
			minImage = "Relaxed.gif";
		}
		
		var newP = document.createElement("p");
		var newImg = document.createElement("IMG");
		newImg.setAttribute("src", "imgages/" + minImage);
		newP.appendChild(newImg);
		newDiv.appendChild(newP);
		
		$('<p><a href="#" onclick="deleteItem(' + key + ')">Delete Item</a></p>)').appendTo(newDiv);
		getListdiv.appendChild(newDiv);
		
	$('<p><a href="#" onclick="editItem(' + key + ')">Edit Item</a></p>)').appendTo(newDiv);
		getListdiv.appendChild(newDiv);
	}
	
	if(localStorage.getItem('appsname')) {
		var clearLink = $('#clear').css('display', 'block');
	} else {
		var sname = "";
		var aname = "";
		var arname = "";
		var url = "";
		var favorite = $('#favorite').val(favorite);
		var rate =$('#rate').val(rate);
		var recommend = $('#recommend').val(recommend);
		var dropdown= $('#dropdown').val(dropdown);
	}
}

function editItem(id) {

	var itemId = id;
	var value = localStorage.getItem(itemId);
	value = value.split(',');
	var sname = value[0];
	var aname = value[1];
	var arname = value[2];
	var url = value[3];
	var favorite = value[4];
	var rate = value[5];
	var recommend = value[6];
	var dropdown = value[7];

	$('#sname').val(sname);
	$('#aname').val(aname);
	$('#arname').val(arname);
	$('#url').val(url);
	if(favorite == "Yes") {
		$('#Yes').attr('checked', 'checked')
	}else{
		$('#No').attr('checked','checked')
	};
	$('#rate').val(rate);
	if(recommend == "Yes") {
		$('#recommend').attr('checked', 'checked');
		$('#dropdown').val(dropdown);
		var editButton = $('#edit-item').css('display', 'block');
		var subresButtons = $('#subres').css('display', 'none');
		var itemList = $('#list').css('display', 'none');		
		
		function clickEdit() {
		
			var sname = $('#sname').val();
			var aname = $('#aname').val();
			var arname = $('#arname').val();
			var url = $('#url').val();
			var favorite = $('#favorite').val();
			var rate = $('#rate').val();
			if(recommend == "Yes") {
				var recommend = "Yes"
			} else {
				var recommend = "No"
			}
			var dropdown = $('#dropdown').val();
			var allItems = [sname, aname, arname, emaill, favorite, rate, recommend, dropdown];
			if(sname != "" && dropdown != "Select Song Type" && email != "") {
				localStorage.setItem(itemId, allItems);
				alert("Record Updated!");
				location.reload();
			} else {
				alert("These fields are required.");
			}
		};


		$('#edit-item').live('click', clickEdit);
	}
};


$("#reset").live("click", function(e) {
	e.preventDefault();
	clearData();
});

$("#displaybutton").bind("click", function() {
	getItems([], "display");
	console.log("display link was clicked");

});
function deleteItem(id) {
	var ask = confirm("Are you sure?");
	if(ask) {
		localStorage.removeItem(id);
		window.location.reload();
	} else {
		alert("Item not removed.");
	}
};























