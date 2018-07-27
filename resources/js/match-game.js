var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function(){
  var randomArray = MatchGame.generateCardValues();
  MatchGame.renderCards(randomArray, $('#game .row'));
});
/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var array = [];
  for(i=1; i<=8; i++){
    array.push(i);
    array.push(i);
  }
  var newArray = [];
  var i=0;
  while(i<array.length){
    var index = Math.round((array.length-1)*Math.random());
    newArray.push(array[index]);
    array.splice(index, 1);
  }
  return newArray;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  $game.data('flippedCards', []);
  var colorList = ['hsl(25, 85%, 65%)','hsl(55, 85%, 65%)','hsl(90, 85%, 65%)',
                   'hsl(160, 85%, 65%)','hsl(220, 85%, 65%)','hsl(265, 85%, 65%)',
                   'hsl(310, 85%, 65%)','hsl(360, 85%, 65%)'];
  $game.empty();
  for(i=0; i<cardValues.length; i++){
    var $card = $("<div class='col-md-3 card'></div>");
    $card.data('value', cardValues[i]);
    $card.data('index',i);
    $card.data('flipped', false);
    $card.data('color', colorList[cardValues[i]-1]);
    $game.append($card);
  }

  $('.card').click(function(){
    MatchGame.flipCard($(this), $game);
  });

};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if($card.data('flipped')){
    return;
  }
  $card.css('background-color', $card.data('color'));
  $card.text($card.data('value'));
  $card.data('flipped', true);

  //var $flippedCards = $game.data('flippedCards');
  $game.data('flippedCards').push($card);
  if($game.data('flippedCards').length===2){
    if($game.data('flippedCards')[0].data('value') === $game.data('flippedCards').data('value')){
      var matchCss = {'background-color':'rgb(153,153,153)',
      'color':'rgb(204,204,204)'}
      $game.data('flippedCards')[0].css(matchCss);
      $game.data('flippedCards')[1].css(matchCss);
    }else{
      window.setTimeout(function(){
        $game.data('flippedCards')[0].css('background-color', 'rgb(32,64,86)');
        $game.data('flippedCards')[0].text('')
        $game.data('flippedCards')[0].data('flipped', false);
        $game.data('flippedCards')[1].css('background-color', 'rgb(32,64,86)')
        $game.data('flippedCards')[1].text('')
        $game.data('flippedCards')[1].data('flipped', false);
      }, 350);
    }
    $game.data('flippedCards', []);
  }
};
