  $(document).ready(function () {
	  loadnav();
	  activatenavigation();
	  
       /* var url = window.location;
        $('a.nav-item[href="'+ url +'"]').parent().addClass('active');
        $('a.nav-item').filter(function() {
             return this.href == url;
        }).parent().addClass('active');*/
});
function loadnav() {
	$("#nav-placeholder").load("/nav.html", function(){
		$(".navbar").unwrap();
	});
	
}

function activatenavigation(){
	var currentHTML = window.location.href.split("/")[window.location.href.split("/").length-1];
	var navlinks = [];
	navlinks = document.getElementsByClassName("nav-link");
	for (var i in navlinks){
		if(navlinks[i].href = currentHTML){
			navlinks[i].classList.add("active");
		}
	}
};
	