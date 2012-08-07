// jQuery save data

$('#submit').live('click', function saveData(id) {
var songname = $("#sname").val();
var albumname = $("#aname"). val();
var artistname = $("#arname").val();
var favorite = $("#favorite"). val();
var fav = $("#fav").val();
var url = $("#url").val();
var date = $("#date").val();

var item = [songname, albumname, artistname, favorite, fav, url, date];
    localStorage.setItem(key, item);
    location.reload();
    alert("Item Saved!");
});

function toggleControls(n) {
    switch (n) {
    case "on":
        $('#songInfo').css('display', 'none');
        $('#clear').css('display', 'inline');
        break;
    case "off":
        $('#songInfo').css('display', 'block');
        $('#clear').css('display', 'inline');
        $('#list').css('display', 'none');
        break;
    default:
        return false;
    }
}
//Clear Data

function clearLocal() {
    if (localStorage.length === 0) {
        alert("There is no data to clear.");
    } else {
        localStorage.clear();
        alert("All data has been cleared.");
        window.location.reload();
        return false;
    }
}

$("#songInfo").validate({
    submitHandler: function(form) {
        console.log("Call Action");
    }
  });


  
// Edit data

function editItem(id) {
    var itemId = id;
	var value = localStorage.getItem(itemId);
	value = value.split(',');
	toggleControls("off");
    var songname = value[0];
    var albumname = value[1];
    var artistname = value[2];
    var favorite = value[3];
    var fav = value[4];
	var url = value[5];
	var date = value[6];


	$("#sname").val(songname);
	$("#aname"). val(albumname);
	$("#arname").val(artistname);
	$("#favorite"). val(favorite);
	$("#fav").val(fav);
	$("#url").val(url);
	$("#date").val(date);

	var editButton = $('#edit-item-button').css('display', 'block');
    var subresButtons = $('#submit-reset-buttons').css('display', 'none');
    var itemList = $('#list').css('display', 'none');
    
    $('#edit-item').live('click', function clickEdit() {
    var songname = $("#sname").val();
	var albumname = $("#aname"). val();
	var artistname = $("#arname").val();
	var favorite = $("#favorite"). val();
	var fav = $("#fav").val();
	var url = $("#url").val();
	var date = $("#date").val();

	var item = [songname, albumname, artistname, favorite, fav, url, date];

	localStorage.setItem(itemId, item);           
    location.reload();
    alert("Your List Edited!");
    });
}


//Delete an Item
