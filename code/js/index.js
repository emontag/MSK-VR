//https://developers.google.com/web/updates/2015/03/introduction-to-fetch

/*
For cloudinary must go to security settings and turn off restriction on resource list for it to work

need to use fetch then put ID's and format and version into an array then compile it together with link of ID

Upon left or right switch as needed. Left and right should go to end and beginning as needed. 

Auto tagging requires paid for services

*/
var id = [];
var format = [];
var version = [];
var index = 0;
const imageTemplate = "https://res.cloudinary.com/dnzhuqb2t/image/upload/";
$(document).ready(function() {
  /*$(`<img id="image"     src=https://res.cloudinary.com/dnzhuqb2t/image/upload/v1510012813/test/c0fd76b5-b8d8-4b25-8612-f1f8b1f8c667.jpg class="image center">`).appendTo($("#Location"));*/
  /*
  link is standard cloudinary format for retreiving a list. Standard format is https://res.cloudinary.com/<userID>/image/list/<tag>.json
  */

  var link = "https://res.cloudinary.com/dnzhuqb2t/image/list/test.json";
  fetch(link)
    .then(function(response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        //console.log(data);
        for (var i = 0; i < data.resources.length; i++) {
          id.push(data.resources[i].public_id);
          version.push(data.resources[i].version);
          format.push(data.resources[i].format);
        }
        //console.log(id);
        //console.log(version);
        //console.log(format);
        createFirst();
      });
    })
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    });
});

/*
create first image to load on page at start
*/
function createFirst() {
  var temp = imageTemplate;
  temp += "v" + version[index] + "/" + id[index] + "." + format[index];
  document.body.style.backgroundImage = "url(" + temp + ")";
  /*$(`<img id="image"     src=`+temp+` class="image center">`).appendTo($("#Location"));*/
  //document.getElementById("image").remove();
  //$(`<img id="image"     src=`+temp+` class="image center">`).appendTo($("#Location"));
  //setInterval(goRight, 3000);
}
/*
Go left
*/
function goLeft() {
  if (index == 0) index = id.length;
  --index;
  /*document.getElementById("image").remove();*/
  var temp = imageTemplate;
  temp += "v" + version[index] + "/" + id[index] + "." + format[index];
  /*$(`<img id="image"     src=`+temp+` class="image center">`).appendTo($("#Location"));*/
  document.body.style.backgroundImage = "url(" + temp + ")";
}
/*
Go right
*/
function goRight() {
  if (index == id.length - 1) index = -1;
  ++index;
  /* document.getElementById("image").remove();*/
  var temp = imageTemplate;
  temp += "v" + version[index] + "/" + id[index] + "." + format[index];
  /*$(`<img id="image"     src=`+temp+` class="image center">`).appendTo($("#Location"));*/
  document.body.style.backgroundImage = "url(" + temp + ")";
}