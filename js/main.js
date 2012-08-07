//wait until the DOM is ready.

	var parseSongForm = function(data){};
	
	$('#song').live('pageinit',function(){
	
		var rbform = $('songForm');
		rbform.validate({
			invalidHandler: function(from, validator){},
			submitHandler: function(){
				var data = $('rbform').serializeArray();
				parseSongForm(data);
			}
	});

	//Create select field element and populate with options.
	function addSongsInfo(){
		var formTag		= document.getElementsByTagName( "form" ),
			selectLi = $( 'songInfo' );
			// makeSelect = document.createElement( 'select' );
			$('makeSelect').attr( "id", "songsInfo" );
		for( var i = 0, j = songInfo.length; i < j; i++ ){
			var makeOption = $( 'option' );
			var optText = songInfo[i];
			$('makeOption').attr( "value", optText );
			makeOption.innerHTML = optText;
			$('makeSelect').append( 'makeOption' );
		}
		//selectLi.appendChild( makeSelect );
	}

	// Find value of a selected radio button.
	function getSelectedRadio(){
		var radios = document.forms[0].favorites;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				favoritesvalue = radios[i].value;
			}
		}
	}

	function getCheckboxValue(){
		if($('fav').checked){
			favValue = $('fav').value;
		}else{
			favValue = "No"
		}
	}  
	
	function toggleControls( n ){
		switch( n ){
			case "on":
				$('songForm').hide();
				$('clear').css('style.display');
				$('displayData').hide();
				$('addNew').css('style.display');
				break;
		case "off":
				$('songForm').show();
				$('clear').css('display', 'inline');
				$('displayData').css ('display' , 'inline');
				$('addNew').hide();
				$('items').hide();
				break;
			default:
				return false;	
		}
	}

	
	function storeData(key){
		//If there is no key, this means this is a brand new item and we need a new key.
		if(!key){
			var id		= Math.floor(Math.random()*1000001);
		}else{
			//Set the id to the existing key we're editing so that it will save over the data.
			//The key is the same ket that's been passed along from the editSubmit event handler
			//to the validate function, and then passed here, into the storeData function.
			id = key;
		}
		getSelectedRadio();
		getCheckboxValue();
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
	}
	
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no data in Local Storage so default data was added.");
			autoFillData();
		}
		//Write Data from the Local Storage to the browser.
		var makeDiv = $( 'div' );
		$('makeDiv').attr("id", "items");
		var makeList = $( 'ul' );
		$('makeDiv').append('makeList');
		$('document.body').append('makeDiv');
		$('items').show();
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = $( 'li' );
			var linksLi = $( 'li' );
			$('makeList').append('makeli');
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert the string from local storage back to an object by using JSON.parse()
			var obj = JSON.parse(value);
			var makeSubList = $( 'ul' );
			$('makeli').append('makeSubList');
			getImage(obj.songInfo[1], makeSubList);
			for(var n in obj){
				var makeSubli = $( 'li' );
				$('makeSubList').append('makeSubli');
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				$('makeSubList').append('linksLi');
			}
			makeItemLinks(localStorage.key(i), linksLi); //Create our edit and delete buttons/link for each item in local storage.
		}
	}
	
	//Get the image for the correct category
	function getImage(songName, makeSubList){
		var imageLi = $('li');
		$('makeSubList').append(imageLi);
		var newImg = $('img');
		var setSrc = $('newImg').attr("src", "images/" + songName + ".png");
		$('imageLi').append('newImg');
	}
	
	//Auto Populate Local Storage
	function autoFillData(){
		//The actual JSON OBJECT data required for this to work is coming from our jason.js file, which is loadded from our HTML page.
		//Store the JSON OBJECT into Local Storage.
		for(var n in json){
			var id = Math.floor(Math.random()*1000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	//Make Item Links
	//Create the edit and delete Links for each stored item when displayed.
	function makeItemLinks(key, linksLi){
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
	}
	
	function editItem(){
		//Grab the data from our item Local Storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
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
	}
	
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this song?");
		if(ask){	
			localStorage.removeItem(this.key)
			alert("Song Info was deleted!!");
			window.location.reload();
		}else{
			alert("Song Info was NOT deleted.")	
		}
	}
	
	
	function clearLocal(){
		if( localStorage.length === 0 ){
			alert( "No Saved Songs." );
		}else{
			localStorage.clear();
			alert( "All Songe have been deleted!" );
			window.location.reload();
			return false;
		}
	}
	
	function validate(e){
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
		
	}
	
//Variable defaults
var songInfo = ["--Choose Music Type--", "Party", "Relaxed", "Fun", "Other"],
	favoritesvalue,
	favValue = "No",
	errMsg = $('errors');
	;
addSongsInfo();

//Set Link & Submit Click Events
	
	var displayLink = $( 'displayData' );
	$('displayLink').bind("click", getData);
	var clearLink   = $( 'clear' );
	$('clearLink').bind( "click", clearLocal); 
	var save        = $( 'submit' );
	$('save').bind( "click", validate);


// JSON Data 
	$('#jsonbutton').bind('click', function(){
	$('#songdata').empty();	
    $('<p>').html('JSON IMPORT').appendTo('#songdata');
	$.ajax({
		url: 'js/data.json',
		type: 'GET',
		dataType: 'json',
		success: function(response){
			console.log(response);
 			for (var i=0, j=response.songdata.length; i<j; i++){	
      				var jdata = response.songdata[i];	
        			$(''+	
	           		'<div class="song">'+
	           			'<h3>songType: '+ jdata.songInfo +'</h3>'+
						'<p>sname: '+ jdata.sname +'</p>'+
						'<p>aname: '+ jdata.aname +'</p>'+
						'<p>arname: '+ jdata.arname +'</p>'+
						'<p>Product URL: '+ jdata.url +'</p>'+
						'<p>favorite: '+ jdata.favorite +'</p>'+
						'<p>fav: '+ jdata.favorite +'</p>'+
						'<p>Notes: '+ jdata.notes +'</p>'+
					'</div>'
					).appendTo('#songdata');
	
	    	 	} //for loop
	 	 	}, //function	
	 	 	error: function(errormessage){
	 	 	console.log("Error!" + errormessage);
 			}
		}); //ajax	
	}); //json button
	

});		

