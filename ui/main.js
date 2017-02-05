console.log('Loaded!');


alert("Hi! I am javacript");
			  
var element= document.getElementById("main_text");
element.innerHTML= 'New Value!!';

var element_img= document.getElementById("elementImg");
var marginLeft= 0;

function moveRight{
	marginLeft= marginLeft+ 5;
    element_img.style.marginLeft= marginLeft+ "px";
}

element_img.onclick= function() {
    var interval= setInterval(moveRight, 5 0);		
};

