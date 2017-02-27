// JavaScript Document
var imageHolder= document.getElementById("myImage");

var imageArray= ["p1.jpg", "p2.jpg", "p3.jpg", "p4.jpg", "p5.jpg"];

var imageIndex= 0;

var imageStatus= 0;

function changeImage(){
	"use strict";
	imageHolder.setAttribute("src", imageArray[imageIndex]);
	imageIndex= imageIndex+ 1;
	if(imageIndex>= imageArray.length){
		imageIndex= 0;
	}
}

var intervalHandle= setInterval(changeImage, 2000);

imageHolder.onclick= function(){
	"use strict";
	if(imageStatus=== 0){
	    clearInterval(intervalHandle);
		imageStatus= 1;
	}
    else{
		intervalHandle= setInterval(changeImage, 2000);
		imageStatus= 0;
	}
};