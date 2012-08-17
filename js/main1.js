//wait until the DOM is ready.
$('#function').live('click', function saveItem(){

	console.log('loaded');
	
	//getElementById Function
	$.getId = function(x){
    var theElement = document.getElementById(x);
    return theElement;
    };
    
	//Create select field element and populate with options.
	$('#makeCats').live('click', function(){
        var formTag = $("form"),//formTag is an array of all the form tags. (because we used getElementsByTagName (plural))
            selectLi = $("#select"),
            makeSelect = $('<select></select>');       // $('<select></select>')
            makeSelect.attr("id", "groups");    // makeSelect.attr("id", "groups");
        for(var i = 0, j = songInfo.length; i<j; i++){
            var makeOption = $("option");
            var optText = songInfo[i];
            makeOption.attr("value", optText);
            makeOption.html = optText;  // .html
            makeSelect.append(makeOption);    // .append
        }
        selectLi.append(makeSelect);
    });

	// Find value of a selected radio button.
	/*
	function getSelectedRadio(){
		var radios = document.forms[0].favorites;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				favoritesvalue = radios[i].value;
			}
		}
	}
*/
	
	$("#additem").click(function(){
    open("addItem.html");
    return false;
});	
	
	
	$('#getCheckboxValue').live('click', function(){
		if($('fav').checked){
			favValue = $('fav').value;
		}else{
			favValue = "No"
		}
	});  
	
	/*$('#toggleControls'.live('click', function, ( n ){
		switch( n ){
			case "on":
				$('songForm').style.display    = "none";
				$('clear').style.display       = "inline";
				$('displayData').style.display = "none";
				$('addNew').style.display      = "inline";
				break;
		case "off":
				$('songForm').style.display    = "block";
				$('clear').style.display       = "inline";
				$('displayData').style.display = "inline";
				$('addNew').style.display      = "none";
				$('items').style.display       = "none";
				break;

			default:
				return false;	
		}
	};
	*/
	
	$('#storeData').live('click', function(key){
		//If there is no key, this means this is a brand new item and we need a new key.
		if(!key){
			var id		= Math.floor(Math.random()*1000001);
		}else{
			//Set the id to the existing key we're editing so that it will save over the data.
			//The key is the same ket that's been passed along from the editSubmit event handler
			//to the validate function, and then passed here, into the storeData function.
			id = key;
		}
		// getSelectedRadio();
		// getCheckboxValue();
		//Gather up all our form field values and store in an object.
		//Object properties contain array with the form label and input value.
		var item			= {};
		item.songInfo 		= ["Select Song Type:" , $('songsInfo').value];
		item.sname 			= ["Name of Song:" , $('sname').value];
		item.aname 			= ["Album:" , $('aname').value];
		item.arname 		= ["Artist:" , $('arname').value];
		item.url 			= ["Music Down website:" , $('url').value];
		item.favorite		= ["Favorite:", favoritesvalue]; 
		item.fav			= ["Save as Favorite:", favValue]; 	 
		item.range	 		= ["Rating", $('range').value];
		item.date			= ["Date", $('date').value];
		item.notes			= ["Notes", $('notes').value];	
		
		localStorage.setItem(id, JSON.stringify( item ));
		alert( "Song Added!" );
	});
	
	$('#getData').live('click',function(){
		toggleControls("off");
		if(localStorage.length === 0){
			alert("There is no data in Local Storage so default data was added.");
			autoFillData();
		}
		//Write Data from the Local Storage to the browser.
		var makeDiv = document.createElement( 'div' );
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement( 'ul' );
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display       = "block";
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = document.createElement( 'li' );
			var linksLi = document.createElement( 'li' );
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert the string from local storage back to an object by using JSON.parse()
			var obj = JSON.parse(value);
			var makeSubList = document.createElement( 'ul' );
			makeli.appendChild(makeSubList);
			getImage(obj.songInfo[1], makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement( 'li' );
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); //Create our edit and delete buttons/link for each item in local storage.
		}
	});
	
	//Get the image for the correct category
	function getImage(songName, makeSubList){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "images/" + songName + ".png");
		imageLi.appendChild(newImg);
	}
	
	//Auto Populate Local Storage
	$('#autoFillData').live('click',function(){
		//The actual JSON OBJECT data required for this to work is coming from our jason.js file, which is loadded from our HTML page.
		//Store the JSON OBJECT into Local Storage.
		for(var n in json){
			var id = Math.floor(Math.random()*1000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	});
	
	//Make Item Links
	//Create the edit and delete Links for each stored item when displayed.
	$('#makeItemLinks').live('click', function(key, linksLi){
		//add edit single item link
		var editLink = document.createElement( 'a' );
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Song";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		//add line break
		var breakTag = document.createElement( 'br' );
		linksLi.appendChild(breakTag);
		
		//add delete single item link
		var deleteLink = document.createElement( 'a' );
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Song";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	});
	
	$('#editItem').live('click',function(){
		//Grab the data from our item Local Storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);0
		
		//Show the form
		toggleControls( "off" );
		
		//populate the form fields with current localStorage values.
		$('songsInfo').value = item.songInfo[1];
		$('sname').value = item.sname[1];
		$('aname').value = item.aname[1];
		$('arname').value = item.arname[1];
		$('url').value = item.url[1];
		var radios = document.forms[0].favorites;
		for(var i=0; i<radios.length; i++){
			if(radios[i].value == "Yes" && item.favorite[1] == "Yes"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "No" && item.favorite[1] == "No"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		if(item.fav[1] == "Yes"){
			$('fav').setAttribute("checked", "checked");
		}	
		$('range').value = item.range[1];
		$('date').value = item.date[1];
		$('notes').value = item.notes[1];
		
		//Remove the initial listener from the input 'save contact' button.
		save.removeEventListener("click", storeData);
		//Change Submit Button Value to Edit Button
		$('submit').value = "Edit Contact";
		var editSubmit = $('submit'); 
		//Save the key value established in this function as a property of the editSubmit event
		//so we can use that value when we save the data we edited.  
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	});
	
	$('#deleteItem').live('click',function(){
		var ask = confirm("Are you sure you want to delete this song?");
		if(ask){	
			localStorage.removeItem(this.key)
			alert("Song Info was deleted!!");
			window.location.reload();
		}else{
			alert("Song Info was NOT deleted.")	
		}
	});
	
	
	$('#clearLocal').live('click', function(){
		if( localStorage.length === 0 ){
			alert( "No Saved Songs." );
		}else{
			localStorage.clear();
			alert( "All Songe have been deleted!" );
			window.location.reload();
			return false;
		}
	})
	
	$('#validate').('click',function(e){
		//Define the elements we want to check
		var getSongInfo = $('songsInfo');
		var getSname = $('sname');
		var getAname = $('aname');
		var getUrl = $('url');
		
		//Reset Errors Messages
		errMsg.innerHTML = "";
		getSongInfo.style.border = "1px solid black";
		getSname.style.border = "1px solid black";
		getAname.style.border = "1px solid black";
		getUrl.style.border = "1px solid black"
		
		//Get Error Messages
		var messageAry = [];
		//Song Validation
		if(getSongInfo.value ==="--Choose Music Type--"){
			var songInfoError = "Please choose a Music Type";
			getSongInfo.style.border = "1px solid red";
			messageAry.push(songInfoError);
		}
		
		//Song Name Validation
		if(getSname.value ===""){
			var sNameError = "Please enter song name."
			getSname.style.border = "1px solid red";
			messageAry.push(sNameError);
		}
		
		//Artist Name Validation
		if(getAname.value ===""){
			var aNameError = "Please enter album name."
			getAname.style.border = "1px solid red";
			messageAry.push(aNameError);
		}
		
		//URL Validation
		var re = /^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/;
		if(!(re.exec(getUrl.value))){
			var urlError = "Please enter valid url information.";
			getUrl.style.border = "1px solid red";
			messageAry.push(urlError);

		}
		
		//If there were errors, display them on the screen.
		if(messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i < j; i++){
				var txt = document.createElement( 'li' );
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;	
		}else{
			//If all is OK, save our data! Send the key value (which came from the editData function).
			// Remember this key value was passed through the editSubmit event listner as a property.
			storeData(this.key);
		}
		
	});
	
//Variable defaults
var songInfo = ["--Choose Music Type--", "Party", "Relaxed", "Fun", "Other"],
	favoritesvalue,
	favValue = "No",
	errMsg = $('errors');
	;
$.makeCats();


//Set Link & Submit Click Events
	
	$("#reset").live("click", function(e) {
	e.preventDefault();
	clearData();
});

$("#displaybutton").live("click", function() {
	getData([], "display");
	console.log("display link was clicked");

});
function deleteItem(id) {
	var ask = confirm("Are you sure?");
	if(ask) {
		localStorage.removeItem(id);
		window.location.reload();
	} else {
		alert("Item not removed.");
	});