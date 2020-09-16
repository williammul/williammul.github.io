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
		activatenavigation();
	});
}

function activatenavigation(){
	var currentHTML = window.location.href.split("/")[window.location.href.split("/").length-1];
	var navlinks = [];
	navlinks = document.getElementsByClassName("nav-link");
	for (var i of navlinks){
		console.log("The value of i is:" + i + "backend of i");
		if(i.href = currentHTML){
			console.log(i.href);
			i.classList.add("active");
		}
	}
};
	