var selected_tags = [];

$(document).ready(async function () {
	  loadpage();
});
async function loadpage() {
	$("#nav-placeholder").load("/nav.html", function(){
		$(".navbar").unwrap();
		activatenavigation();
		$('#resulttable').DataTable();
	});
}

async function activatenavigation(){
	await clearcurractive();
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

async function clearcurractive(){
	$(".navbar-nav .active").removeClass("active");
	return;
}

async function searchGBF(){
	var selectedtype= $("#typeselect").val();
	var result = [];
	$.getJSON("../json/gbf.json", function(data){
			$.each(data, function(key, value) {
				console.log("Key is :" + key);
				if(selectedtype == key){
					$.each(value, function(key2,value2) {
						console.log("Key2 is : " +key2);
						$.each(selected_tags, function(index,tagitem){
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
}

function addtag(e){
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
async function animateprogressbar (widthv) {
	$('#load').animate({
		width: widthv
	},3000);
	console.log("animating progressbar" + widthv);
	return;
}

async function overallsearch(){
	$('#resulttable').DataTable().clear().draw();
	$('#tablerow').hide();
	$('#loaddiv').show();
	animateprogressbar("50%").then(searchGBF()).then(animateprogressbar("100%"));
	$('#tablerow').show();
	//$('#load').hide();
}