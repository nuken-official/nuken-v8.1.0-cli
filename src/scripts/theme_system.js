/*
Pretty much we're just appending a custom stylesheet to the document here. Nothing special. nuken detects CSS files from the /themes directory.
*/

var init_theme = function(){

if (!auto_theme){
	
	
//yes, theme was detected



window.api.themes().then((result) => {
    
for (var i = 0; i < result.length; ++i) {
    
	if (i==0){
		console.log('first time');
	document.getElementById('library_div').innerHTML = "";
	}
	
	var item = theme_direc+result[i];  
	
		//once themes is init, load_theme
		if (item.includes('.css')){
			console.log('Theme detected.');
	setTimeout(function(){
		load_theme(item);
	},1);
		}
		
}	
});
} else {
//no themes	 :(
console.log('No theme detected.');

}
};


var load_theme = function(theme){
	
	//append a link tag to the head of the document with our selected attributes (most notably, the theme href)
	
 var cssLink = $("<link>");
  $("head").append(cssLink);

  cssLink.attr({
    rel:  "stylesheet",
    type: "text/css",
    href: theme
  });
  
  //notify the user that a theme was loaded
  
  setTimeout(function(){

var filename = theme.replace(/^.*[\\\/]/, '');
console.log(theme);

document.getElementById('library_div').innerHTML += `
<div id = "`+filename+`" class = "content_div">
<img src = "icons/theme.png" ></img>
<div id = "`+filename+`_body" >
<span>`+filename+`</span>
<br>
<button onclick = "show_folder('/`+theme+`')" ><i class="ri-external-link-line"></i></button>
<button onclick = "delete_file('/`+theme+`');show_deleted_element('`+filename+`')" ><i class="ri-delete-bin-2-line"></i></button>
<i class = "ri-paint-fill content_div_icon"></i> 
</div>
</div> 
		`;

notify('Your theme was applied. Visit the <a uk-toggle = "#settings_page"><i class="ri-settings-3-fill"></i> <span><b>Settings Menu</b></span></a> to disable themes on startup.');

},550);
	
};

var show_deleted_element = function(element){

document.getElementById(element).style.width = "42.5vmin";
document.getElementById(element).style.opacity = "50%";
document.getElementById(element).style.pointerEvents = "none";	
	
document.getElementById(element+"_body").innerHTML = `

<h3>Removed</h3>
<h4>Please relaunch nuken to finish the removal process.</h4>

`;
};
