//Initialise the sessionOrder

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}


var clicksBad = 0;

function playAudio(url)  {
  new Audio(url).play();
  if (url.includes('wrong')){
    clicksBad += 1;
  }
}


var lengthSession = 8;
var arr = Array.from({length: 8}, (_, index) => index + 1);

var sessionOrder = shuffle(arr)
sessionOrder = sessionOrder.slice(0,lengthSession)


var path2Pictures = './Cepe_Buttons/Pictures/'  ;

var listPictures = new Array(lengthSession);
var listPicturesSolution = new Array(lengthSession);

// make the list
var i = 0;
for (value in sessionOrder) {
     listPictures[i] = path2Pictures+ 'Cepe_' + sessionOrder[value] + '_A.***'
     listPicturesSolution[i] = path2Pictures+ 'Cepe_' + sessionOrder[value] + '_S.***'

     i +=1
}

var buttonsArrayA = document.getElementsByClassName('A'+sessionOrder[0]);

//initialise the page with first slide
function initialiseGame(s){
  document.getElementById("gameImage").src = s[0];

      for(var i = (buttonsArrayA.length - 1); i >= 0; i--)
      {
          buttonsArrayA[i].style.display = 'inline'
      }


}

initialiseGame(listPictures);

var t = 0

$('[class^="A"]').on('click', function() {
        $(this).toggleClass("selectedA");
        var selectA = document.getElementsByClassName('selectedA');


         var selectedAnswersA = document.getElementsByClassName('selectedA')
         if (selectedAnswersA.length==buttonsArrayA.length){

           playAudio("./javascript/sounds/cepeDone.wav")


           document.getElementById("farmerImage").src = './css/images/farmer1_W.svg';
           tailleButton = document.getElementById('cut');
           tailleButton.style.display = 'inline';
           document.getElementById("gameImage").src = listPicturesSolution[t];

         }
         else {
           playAudio("./javascript/sounds/good.wav")
         }


      });


function endGame(){
      document.getElementById("gameImage").src = path2Pictures +'congrats.jpg'
      playAudio("./javascript/sounds/wellDone.wav")
      var result = '<br> Ta precision est de  <br>' + Math.floor(100*(1/((32+clicksBad)/32))) + ' %  <br> Clique ici pour recommencer !'
      document.getElementById('precisionFrame').innerHTML = result
      test = document.getElementById('precisionFrame')
      test.style.display = 'inline'

     }



function newCombi(n){
   $('.selectedA').remove();

   tailleButton = document.getElementById('cut');
   tailleButton.style.display = 'none'

   if (t == lengthSession-1){
     endGame()
   }

   else{
   document.getElementById("farmerImage").src = './css/images/farmer1_norm.svg';


  t += n;

  //switching Off Previous Buttons

  var buttonsArrayOff = document.getElementsByClassName('A'+sessionOrder[t-1]);

  for(var i = (buttonsArrayOff.length - 1); i >= 0; i--){
      buttonsArrayOff[i].style.display = 'none'
  }


  // Displaying New Image
  document.getElementById("gameImage").src = listPictures[t];

  //Getting the 'right Buttons'
  var r = /\d+/;
  var test = (listPictures[t].match(r));

if (test == sessionOrder[t]) {
   buttonsArrayA = document.getElementsByClassName('A'+sessionOrder[t]);
      for(var i = (buttonsArrayA.length - 1); i >= 0; i--)
      {
          buttonsArrayA[i].style.display = 'inline'
      }

}
}
}
