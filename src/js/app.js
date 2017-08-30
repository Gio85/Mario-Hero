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
  let coins = false;
  let stars = false;
  let mushroom = false;
  // const $coinsSound = $('.coinsSound');
  // const $themeSong = $('.themeSong');
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

  function displayingScore(){
    score++;
    $score.text(score);
  }

  function loseCondition(){
    if(score<0){
      $('.lose').css('visibility', 'visible');
      hidingClasses();
      return true;
    }
  }
  function creatingMashroomAndStars(){
    const randomNum = parseFloat(Math.random()).toFixed(2);
    console.log('randomNum', randomNum);
    if (randomNum >= 0.5 && randomNum <= 0.7) {
      mushroom = true;
      return 'url(../images/mushroom.gif)'; //put the mashroom instead of the coin
    } else if(randomNum > 0.7 && randomNum <= 0.9) {
      stars = true;
      return 'url(../images/mario-star.gif)';
    } else {
      coins = true;
      return 'url(../images/coin.png)';
    }
  }
  // function checkingHealth(){
  //   if ()
  // }
  //dropping coins with setTimeout function
  function dropCoins($coin, speed){
    const marginTop = parseFloat($coin.css('margin-top'));
    const timerId = setTimeout(() => {
      if(marginTop >= $skinny.height() - $coin.height()) {
        // coin has hit floor
        $coin.css('background-image', creatingMashroomAndStars());
        $coin.css('margin-top', 0);
        speed = generateSpeed(num);//decrease num by 1 for next level
        score--;
        $score.text(score);
        loseCondition();
      } else if($coin.parent().hasClass('mario') && marginTop >= $skinny.height() - 120) {//120 is a random given number
        // if(mushroom){
        //   score--;
        // }
        // if(stars){
        //   score += 10;
        // }
        // coin has hit mario
        // $coinsSound.play();
        displayingScore();
        $coin.css('background-image', creatingMashroomAndStars());
        $coin.css('margin-top', 0);
        speed = generateSpeed(num);//decrease the number by 1 for next level
        checkingScore();
      } else {
        $coin.css('margin-top', marginTop + 2);//add more to increase the speed
      }
      if(!loseCondition()) dropCoins($coin, speed);
    }, speed);
    timers.push(timerId);
  }

  function checkingScore(){
    if(score===100){
      $('.final').css('visibility', 'visible');
      hidingClasses();
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
    $coin.toArray().forEach((ball) => {
      // setTimeout(() => {
      dropCoins($(ball), generateSpeed(num));
      // });
    });
  }
  $(document).keydown(function(event) {
    switch (event.keyCode) {
      case 37: return changingClass(0, 'left');
      case 39: return changingClass(3, 'right');
    }
  });
  $button.on('click', () =>{
    // $themeSong.play();
    startButton();
    $intro.hide();
    $grid.css('visibility', 'visible');
    $('h2').css('visibility', 'visible');
  });
}); //leave this
