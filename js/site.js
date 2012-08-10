$('#json').bind('click', function(){
	$('#browse').empty();
	$.ajax({
		url: 'XHR/data.json',
		type: 'GET',
		dataType: 'json',
		success: function(response){
        	for (var i=0, j=response.PartyMusic.length; i<j; i++){
				var jdata = response.PartyMusic[i];
				$(''+
					'<li class="members">'+
						'<h2>'+ jdata.sname +'</h2>'+
						'<h2>'+ jdata.aname +'</h2>'+
						'<h2>'+ jdata.arname +'</h2>'+
						'<h3>'+ jdata.email +'</h3>'+
						'<h2>'+ jdata.songType +'</h2>'+
					'</li><hr/>'
				).appendTo('#browse');
				console.log(response);
			}
		}
	});
	return false;
});

	$('#xml').bind('click', function(){
	$('#browse').empty();
	$.ajax({
		url: 'XHR/data.xml',
		type: 'GET',
		dataType: 'xml',
		success: function(xml){
			console.log(xml);
			$(xml).find("song").each(function(){
   				var song = $(this).find('sname').text();
   				var album= $(this).find('aname').text();
   				var artist= $(this).find('arname').text();
				var url= $(this).find('url').text();
    			$(''+
					'<li class="member">'+
						'<h2>'+ song+'</h2>'+
						'<h2>'+ album +'</h2>'+
						'<h3>'+ artist +'</h3>'+
						'<h4>'+ url+'</h4>'+				

						
					'</li><hr />'
				).appendTo('#browse');
				console.log(xml);
			});
		}
	});
	return false;
});
   
	$('#csv').bind('click', function(){
	$('#browse').empty();
	 $.ajax({
        type: "GET",
        url: "XHR/data.csv",
        dataType: "text",
        success: function(data) {
        	var allTextLines = data.split(/\r\n|\n/);
    		var headers = allTextLines[0].split(',');
    		var lines = []; 

			for (var i=1; i<allTextLines.length; i++) {
				var data = allTextLines[i].split(',');
				if (data.length == headers.length) {
					var members= []; 
					
					for (var j=0; j<headers.length; j++) {
						members.push(data[j]);
					}
					lines.push(members); 
				}
				
			}
			
			for (var m=0; m<lines.length; m++){
				var member = lines[m];
			$(''+
					'<li class="members">'+
						'<h2>'+ member[0]+" " + member[1] +'</h2>'+
						'<h4>'+ member[5] +'</h4>'+
						'<h4>'+ member[2] +'</h4>'+
						'<h4>'+ member[3] +'</h4>'+
					'</li><hr />'
				).appendTo('#browse');
			console.log(data);	
			}
        }
	});
	return false;
});
