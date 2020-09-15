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
	$("#nav-placeholder").load("/nav.html");
	$(".navbar").unwrap();
}

function activatenavigation(){
	let currentHtml = window.location.href.split("/")[window.location.href.split("/").length-1];
	let navlinks = [];
	navlinks = document.getElementsByClassName("nav-link");
	for (let i in navlinks){
		if(navlinks[0].href = currentHTML){
			navlinks.classList.add("active");
		}
	}
};
	