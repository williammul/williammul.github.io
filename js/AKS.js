var selected_tags = [];

$(document).ready(function () {
	  loadpage();
	  $('#load').hide();
	  
       /* var url = window.location;
        $('a.nav-item[href="'+ url +'"]').parent().addClass('active');
        $('a.nav-item').filter(function() {
             return this.href == url;
        }).parent().addClass('active');*/
});
function loadpage() {
	$("#nav-placeholder").load("/nav.html", function(){
		$(".navbar").unwrap();
		clearcurractive(activatenavigation());
		$('#resulttable').DataTable();
		$('.chosen-select').chosen();
	});
}

function activatenavigation(){
	var currentHTML = window.location.href.split("/")[window.location.href.split("/").length-1];
	var navlinks = [];
	navlinks = $("li.nav-item");
	for (var i of navlinks){
		console.log("The value of i is:" + i + "backend of i");
		if(i.querySelector("a[href^=" + CSS.escape(currentHTML)+"]")!== null ){
			console.log(i.querySelector("a[href^=" + CSS.escape(currentHTML)+"]"));
			i.querySelector("a[href^=" + CSS.escape(currentHTML)+"]").classList.add("active");
			i.classList.add("active");
		}
	}
};

function clearcurractive(func){
	$(".navbar-nav .active").removeClass("active");
	activatenavigation();
}

function animateprogressbar (widthv) {
	$('#load').animate({
		width: widthv
	},2500);
}

function searchAK(func){
	var selectedtype= $("#typeselect").val();
	var result = [];
	var chosentags =  [];
	chosentags	= $('#tagselect').chosen().val();
	console.log("chosentags: " + chosentags) ;
	$.getJSON("../json/ak.json", function(data){
			$.each(data, function(key, value) {
				console.log("Key is :" + key);
				if(selectedtype == key){
					$.each(value, function(key2,value2) {
						console.log("Key2 is : " +key2);
						$.each(chosentags, function(index,tagitem){
								console.log("Tag item is: " + tagitem);
								console.log("condition check" + $.inArray(tagitem,value2.Tags));
								if($.inArray(tagitem,value2.Tags) != -1){
								result = [];
								console.log(value2.Tags);
								result.push(value2.id);
								result.push(value2.Tags.toString());
								result.push(value2.Rarity);
								$('#resulttable').DataTable().row.add(result).draw();	
								console.log(result);	
							}
						});
					});
				}
			});	
		});
	func();
}

function addtag(e){
	//this is not needed ith chosen.
	var tag_name = $(e).text();
	if($.inArray(tag_name,selected_tags) != -1){
	var indextoremove = selected_tags.indexOf(tag_name);
	selected_tags.splice(indextoremove,1);
	console.log(selected_tags);
	}else{
	selected_tags.push(tag_name);
	console.log(selected_tags);
	}
}

function overallsearch (){
	$('#resulttable').DataTable().clear().draw();
	$('#tablerow').hide();
	$('#load').show();
	searchAK(function(){animateprogressbar("50%")});
	$('#tablerow').show();
	$('#load').hide();
}