
$(() => {
  //trying to make an object to store the user's name and the score
  // const player = [];
  const $Name = $('#name');
  const $userName = $('.userName');
  // const name = $Name.val();
  // player.push({
  //   name: name
  // });
  // console.log($Name.val());
  let lostCoins = 0;
  const $coinsBehind = $('.behind');
  const $loseMessage = $('.loseMessage');
  // let start =null;
  // const $time = ('#time');
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
  const gameOver = document.getElementById('gameOver');
  const themeSong = document.getElementById('themeSong');
  const coinsSound = document.getElementById('coinsSound');
  const mushroom = document.getElementById('mushroom');
  const lifeSound = document.getElementById('lifeSound');
  const starSound = document.getElementById('starSound');

  //game variables
  const $coin = $('.coins');
  const $resetButton = $('#reset');
  const $startButton = $('#start');
  const $score = $('.score');
  const timers = [];
  const $skinny = $('.skinny');
  const $grid = $('.grid');
  const $intro = $('.instructions');
  const $level = $('.level');
  const $life = $('.life');
  const $stars = $('.stars');
  let life = 1;
  let stars = 0;
  let lose = false;
  let timerId = null;

  //changing the mario directions image
  function changingClass(index, direction){
    const $mario = $('.mario');
    if($mario.index('.skinny') === index) return false;
    const $next = direction === 'left' ? $mario.prev() : $mario.next();
    $next.addClass('mario ' + direction);
    $mario.removeClass('mario right left');
  }

  function changingLevel(){
    level++;
    $level.text(level);
  }

  function hidingClasses(){
    $grid.hide();
    $level.hide();
    $score.hide();
    $('h2').hide();
  }

  //increasing the life by the stars
  function checkStars(){
    if(stars===10){
      life++;
      $life.text(life);
      stars = 0;
      $stars.text(stars);
      lifeSound.pause();
      lifeSound.currentTime = 0;
      lifeSound.play();
    }
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
      if(marginTop >= $skinny.height() - $coin.height()) {
        // coin has hit floor
        if($coin.hasClass('coins')){
          lostCoins++;//function to update the counter and the display
          $coinsBehind.text(lostCoins);
          if(lostCoins>10){//if the coins lost are more than 10
            //a new function...
            life--;//the life goes down by one
            $life.text(life);
            lostCoins = 0;//reset the lostCoins counter to 0
          }
          score--;
          $score.text(score);
          $coin.css('margin-top', 0);
          speed = generateSpeed(num);//decrease num by 1 for next level
          checkingScore();
        } else {
          $coin.css('margin-top', 0);
          speed = generateSpeed(num);
        }
      } else if($coin.parent().hasClass('mario') && marginTop >= $skinny.height() - 120){//when mario caught..
        if($coin.hasClass('mushroom')) {
          // mario caught a mushroom.... make a function
          mushroom.pause();
          mushroom.currentTime = 0;
          mushroom.play();
          life--;
          $life.text(life);
        } else if($coin.hasClass('star')) {
          // mario caught a star... make a function
          starSound.pause();
          starSound.currentTime = 0;
          starSound.play();
          stars++;
          $stars.text(stars);
          checkStars();
        } else {
          // mario caught a coin....make a function
          coinsSound.pause();
          coinsSound.currentTime = 0;
          coinsSound.play();
          score+= 1;
        }
        $score.text(score);
        $coin.css('margin-top', 0);//put the coins/mushroom/starts back to the top
        speed = generateSpeed(num);//decrease the number by 1 for next level
        checkingScore();
      } else {
        $coin.css('margin-top', marginTop + 2);//add more to increase the speed
      }
      if(!lose) dropCoins($coin, speed);
    }, speed);
    timers.push(timerId);
  }

  function checkingScore(){
    if(score >= 100){
      $('.final').css('visibility', 'visible');
      // var end = new Date().getTime(); //--->it did not work
      // var time = (end - start)/1000;
      // $time.text(time);

      //i can put all the statements below into an unic function like winningScenario

      hidingClasses();
      themeSong.pause();
      themeSong.currentTime = 0;
      winTheme.play();
      clearInterval(timerId);

      //
    } else if(score<0 || life===0){
      if(score<0){
        // i can do the same here...
        $('.lose').css('visibility', 'visible');
        hidingClasses();
        themeSong.pause();
        themeSong.currentTime = 0;
        gameOver.play();
        lose = true;
        clearInterval(timerId);
        $loseMessage.text('You have lost to many coins');

        //
      } else if(life===0){
        //and in here too...
        $('.lose').css('visibility', 'visible');
        hidingClasses();
        themeSong.pause();
        themeSong.currentTime = 0;
        gameOver.play();
        lose = true;
        clearInterval(timerId);
        $loseMessage.text('You have lost your lifes');
        //
      }
    } else {
      //put the below statement in a function
      switch(score){
        case 10:
          if(!level2){
            changingLevel();
            num-=1;
          }
          level2 = true;
          break;
        case 20:
          if(!level3){
            changingLevel();
            num-=4;
          }
          level3 = true;
          break;
        case 30:
          if(!level4){
            changingLevel();
            num-=7;
          }
          level4 = true;
          break;
        case 50:
          if(!level5){
            changingLevel();
            num-=10;
          }
          level5 = true;
          break;
        case 70:
          if(!level6){
            changingLevel();
            num-=15;
          }
          level6 = true;
          break;
        case 80:
          if(!level7){
            changingLevel();
            num-=40;
          }
          level7 = true;
          break;
        case 90:
          if(!finalLevel){
            changingLevel();
            num-=50;
          }
          finalLevel = true;
          break;
      }

      //

    }
  }

  function generateSpeed(num) {
    return Math.ceil(Math.random() * 3) + num;
  }

  function startTheGame(){
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
  $startButton.on('click', () =>{
    // start = new Date().getTime();//not working
    // console.log(player[0]);
    // console.log($Name.val());
    startTheGame();
    //i can try to put those into a function
    themeSong.play();
    $userName.text($Name.val());
    $intro.hide();
    $grid.css('visibility', 'visible');
    $('h2').css('visibility', 'visible');

    //
  });
  $resetButton.on('click', () =>{
    startTheGame();
    //do the same in here...
    $grid.css('visibility', 'visible');
    $('h2').css('visibility', 'visible');
    //
  });


}); //leave this
