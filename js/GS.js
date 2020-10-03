  $(document).ready(function () {
	  loadpage();
	  
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

function searchGBF(){
	var selectedtype= $("#typeselect").val();
	var result = [];
	$.getJSON("../json/Test.json", function(data){
			$.each(data, function(key, value) {
			console.log("Key is :" + key);
			if(selectedtype == key){
			console.log("value of value: " + value);
			console.log("value of Name: " + value.Name);
			result.push(value.Name);
			console.log(result);
			}
		});
		$('.placeholderresult').append(result);
	});
}