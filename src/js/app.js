$(() => {
  let num = 15;
  let level = 1;
  let score = 0;
  let level2 = false;
  let level3 = false;
  let level4 = false;
  let level5 = false;
  let level6 = false;
  let level7 = false;
  let finalLevel = false;
  let life = 3;
  let stars = 0;
  let lose = false;
  let timerId = null;
  const $life = $('.life');
  const $stars = $('.stars');
  const winTheme = document.getElementById('winTheme');
  const gameOver = document.getElementById('gameOver');
  const themeSong = document.getElementById('themeSong');
  const coinsSound = document.getElementById('coinsSound');
  const mushroom = document.getElementById('mushroom');
  const lifeSound = document.getElementById('lifeSound');
  const starSound = document.getElementById('starSound');

  const $coin = $('.coins');
  const $button = $('button');
  const $score = $('.score');
  const timers = [];
  const $skinny = $('.skinny');
  const $grid = $('.grid');
  const $intro = $('.instructions');
  const $level = $('.level');

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

  function checkStars(){
    if(stars===10){
      life++;
      lifeSound.play();
      $life.text(life);
      stars = 0;
    }
  }
  //dropping coins with setTimeout function
  function dropCoins($coin, speed){
    const marginTop = parseFloat($coin.css('margin-top'));
    if(marginTop === 0) {
      const randomNum = Math.random();
      if (randomNum >= 0.5 && randomNum <= 0.7) {
        $coin.removeClass('mushroom star coins').addClass('mushroom');
      } else if(randomNum > 0.7 && randomNum < 0.9) {
        $coin.removeClass('mushroom star coins').addClass('star');
      } else {
        $coin.removeClass('mushroom star').addClass('coins');
      }
    }
    timerId = setTimeout(() => {
      if(marginTop >= $skinny.height() - $coin.height()) {
        // coin has hit floor
        if($coin.hasClass('coins')){
          score--;
          $score.text(score);
          // loseCondition();
          $coin.css('margin-top', 0);
          speed = generateSpeed(num);//decrease num by 1 for next level
        } else {
          $coin.css('margin-top', 0);
          speed = generateSpeed(num);
        }
      } else if($coin.parent().hasClass('mario') && marginTop >= $skinny.height() - 120){
        if($coin.hasClass('mushroom')) {
          // mario caught a mushroom
          mushroom.pause();
          mushroom.currentTime = 0;
          mushroom.play();
          life--;
          $life.text(life);
        } else if($coin.hasClass('star')) {
          // mario caught a star
          starSound.pause();
          starSound.currentTime = 0;
          starSound.play();
          stars++;
          $stars.text(stars);
          checkStars();
        } else {
          // mario caught a coin
          coinsSound.pause();
          coinsSound.currentTime = 0;
          coinsSound.play();
          score+= 10;
        }
        $score.text(score);
        $coin.css('margin-top', 0);
        speed = generateSpeed(num);//decrease the number by 1 for next level
        checkingScore();
        // loseCondition();
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
      hidingClasses();
      themeSong.pause();
      themeSong.currentTime = 0;
      winTheme.play();
      clearInterval(timerId);
    } else if(score<0 || life===0){
      $('.lose').css('visibility', 'visible');
      hidingClasses();
      themeSong.pause();
      themeSong.currentTime = 0;
      gameOver.play();
      lose = true;
      clearInterval(timerId);
    } else {
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
    }
  }

  function generateSpeed(num) {
    return Math.ceil(Math.random() * 3) + num;
  }

  function startButton(){
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
  $button.on('click', () =>{
    themeSong.play();
    startButton();
    $intro.hide();
    $grid.css('visibility', 'visible');
    $('h2').css('visibility', 'visible');
  });

}); //leave this
