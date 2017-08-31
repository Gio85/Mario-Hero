
$(() => {

  let lostCoins = 0;
  const $coinsBehind = $('.behind');
  const $gameOverMessage = $('.loseMessage');
  let nameValue = null;
  const $userName = $('.userName');
  let num = 15;
  let level = 1;
  let score = 0;
  //variable to check the different levels
  let level2 = false;
  let level3 = false;
  let level4 = false;
  let level5 = false;
  let level6 = false;
  let level7 = false;
  let finalLevel = false;

  //audio constants
  const winTheme = document.getElementById('winTheme');
  const gameOverAudio = document.getElementById('gameOver');
  const themeSong = document.getElementById('themeSong');
  const coinsSound = document.getElementById('coinsSound');
  const mushroom = document.getElementById('mushroom');
  const lifeSound = document.getElementById('lifeSound');
  const starSound = document.getElementById('starSound');

  //game variables
  const $mario = $('#mario');
  const $luigi = $('#luigi');
  let mario = false;
  let luigi = false;
  let characterClass = null;
  const $nextButton = $('#next');
  const $resetButton = $('#reset');
  const $startButton = $('#start');
  const $coin = $('.coins');
  const $score = $('.score');
  const $skinny = $('.skinny');
  const $grid = $('.grid');
  const $intro = $('.instructions');
  const $level = $('.level');
  const $life = $('.life');
  const $stars = $('.stars');
  const $choosingCharacter = $('.choosingCharacter');
  let life = 1;
  let stars = 0;
  let gameOver = false;
  let timerId = null;
  const $winImage = $('.winImage');


  //changing the mario directions image
  function changingClass(index, direction){
    const $character = $('.character');
    if($character.index('.skinny') === index) return false;
    const $next = direction === 'left' ? $character.prev() : $character.next();
    $next.addClass(`character ${direction} ${characterClass}`);
    $character.removeClass(`character right left ${characterClass}`);
  }

  function increaseLevel(){
    level++;
    $level.text(level);
  }

  function hidingClasses(){
    $grid.hide();
    $level.hide();
    $score.hide();

  }
  function applyingLifeSound(){
    lifeSound.pause();
    lifeSound.currentTime = 0;
    lifeSound.play();
  }
  //increasing the life by the stars
  function checkStars(){
    if(stars===10){
      life++;
      $life.text(life);
      stars = 0;
      $stars.text(stars);
      applyingLifeSound();
    }
  }
  function whenMarioCaughtCoins(){
    coinsSound.pause();
    coinsSound.currentTime = 0;
    coinsSound.play();
    score+= 10;
  }

  function whenMarioCaughtStars(){
    starSound.pause();
    starSound.currentTime = 0;
    starSound.play();
    stars++;
    $stars.text(stars);
    checkStars();
  }

  function whenMarioCaughtMushrooms(){
    mushroom.pause();
    mushroom.currentTime = 0;
    mushroom.play();
    life--;
    $life.text(life);
  }

  function updatingLostCoinsCounter(){
    lostCoins++;//function to update the counter and the display
    $coinsBehind.text(lostCoins);
  }

  function losingCoins(){
    life--;//the life goes down by one
    $life.text(life);
    lostCoins = 0;//reset the lostCoins counter to 0
  }
  function choosingCharacter(){
    if(mario){
      characterClass = 'mario';
      $('#marioText').css('background-color', 'red');
      $('#luigiText').css('background-color', 'transparent');

    } else if (luigi){
      characterClass = 'luigi';
      $('#marioText').css('background-color', 'transparent');
      $('#luigiText').css('background-color', 'green');
      $winImage.attr('src', '../images/LuigiPrincessKiss.gif');
    }
  }

  $mario.on('click', () =>{
    mario = true;
    luigi = false;
    choosingCharacter();
  });
  $luigi.on('click', () =>{
    luigi = true;
    mario = false;
    choosingCharacter();
  });
  function updatingScore($coin){
    $score.text(score);
    $coin.css('margin-top', 0);
  }
  //dropping coins with setTimeout function
  function dropCoins($coin, speed){
    const marginTop = parseFloat($coin.css('margin-top'));
    //setting up the backgoriund images based on a random number
    if(marginTop === 0) {
      const randomNum = Math.random();
      if (randomNum >= 0.5 && randomNum <= 0.7) {
        //setting the background-image of the mushroom
        $coin.removeClass('mushroom star coins').addClass('mushroom');
      } else if(randomNum > 0.7 && randomNum < 0.9) {
        //setting the background-image of the star
        $coin.removeClass('mushroom star coins').addClass('star');
      } else {
        //leaving the background-image of the coin
        $coin.removeClass('mushroom star').addClass('coins');
      }
    }
    timerId = setTimeout(() => {
      console.log('timer running');
      // console.log('timer running');
      if(marginTop >= $skinny.height() - $coin.height()) {
        // coin has hit floor
        if($coin.hasClass('coins')){
          updatingLostCoinsCounter();
          if(lostCoins>=10){//if the lost coins are more than 10
            //a new function...
            losingCoins();
          }
          score--;
          updatingScore($coin);
          speed = generateSpeed(num);//decrease num by 1 for next level
          checkingScore();
        } else {
          $coin.css('margin-top', 0);
          speed = generateSpeed(num);
        }
      } else if($coin.parent().hasClass(characterClass) && marginTop >= $skinny.height() - 120){//when mario caught..
        if($coin.hasClass('mushroom')) {
          // mario caught a mushroom.... make a function
          whenMarioCaughtMushrooms();
        } else if($coin.hasClass('star')) {
          // mario caught a star... make a function
          whenMarioCaughtStars();
        } else {
          // mario caught a coin....make a function
          whenMarioCaughtCoins();
        }
        updatingScore($coin);
        speed = generateSpeed(num);//decrease the number by 1 for next level
        checkingScore();
      } else {
        $coin.css('margin-top', marginTop + 2);//add more to increase the speed
      }
      if(!gameOver) dropCoins($coin, speed);
    }, speed);

  }

  function checkingScore(){
    // Game is still going
    if(score < 100 && score > 0 && life > 0) return checkingLevels();
    // Game is over
    $('.endGame').show();
    $('.displayingScore').hide();
    $resetButton.css('visibility', 'visible');
    hidingClasses();
    themeSong.pause();
    themeSong.currentTime = 0;
    gameOver = true;
    clearInterval(timerId);

    // Player has won
    if(score >= 100) {
      $('.win').show();
      $('.lose').hide();
      return winTheme.play();
    }

    // Player has lost
    $('.lose').show();
    gameOverAudio.play();

    // Lost too many coins
    if(score < 0) {
      $gameOverMessage.text('You have lost too many coins');
    }

    // Lost too many lives
    if(life <= 0) {
      $gameOverMessage.text('You have lost your lives');
    }
  }


  function checkingLevels(){
    switch(score){
      case 10:
        if(!level2){
          increaseLevel();
          num-=1;
        }
        level2 = true;
        break;
      case 20:
        if(!level3){
          increaseLevel();
          num-=4;
        }
        level3 = true;
        break;
      case 30:
        if(!level4){
          increaseLevel();
          num-=7;
        }
        level4 = true;
        break;
      case 50:
        if(!level5){
          increaseLevel();
          num-=10;
        }
        level5 = true;
        break;
      case 70:
        if(!level6){
          increaseLevel();
          num-=15;
        }
        level6 = true;
        break;
      case 80:
        if(!level7){
          increaseLevel();
          num-=40;
        }
        level7 = true;
        break;
      case 90:
        if(!finalLevel){
          increaseLevel();
          num-=50;
        }
        finalLevel = true;
        break;
    }
  }
  function generateSpeed(num) {
    return Math.ceil(Math.random() * 3) + num;
  }

  function letTheCoinsDropping(){
    $coin.toArray().forEach((coin) => {
      dropCoins($(coin), generateSpeed(num));
    });
  }
  $(document).keydown(function(event) {
    switch (event.keyCode) {
      case 37: return changingClass(0, 'left');
      case 39: return changingClass(3, 'right');
    }
  });
  function makingTheGridVisible(){
    $('.displayingScore').show();
    $grid.show();
  }
  function startTheGame(){
    $skinny.eq(0).addClass(characterClass);
    themeSong.play();
    makingTheGridVisible();
  }
  $nextButton.on('click', () =>{
    $choosingCharacter.show();
    $intro.hide();
    nameValue = $('#name').val();
    $userName.text(nameValue);
  });
  $startButton.on('click', () =>{
    letTheCoinsDropping();
    startTheGame();
    $choosingCharacter.hide();
  });

  function resetGame(){
    themeSong.play();
    life = 1;
    $life.text(life);
    stars = 0;
    $stars.text(stars);
    gameOver = false;
    lostCoins = 0;
    $coinsBehind.text(lostCoins);
    level = 1;
    $level.text(level);
    num = 15;
    score = 0;
    $score.text(score);
  }

  function showingDivs(){
    $grid.show();
    $level.show();
    $score.show();
  }

  $resetButton.on('click', () =>{
    resetGame();
    showingDivs();
    letTheCoinsDropping();
    makingTheGridVisible();
    $('.endGame').hide();
    winTheme.pause();
    winTheme.currentTime = 0;
    $('.win').hide();
    $coin.css('margin-top', 0);
  });


}); //leave this
