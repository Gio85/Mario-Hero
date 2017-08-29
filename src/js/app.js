$(() => {
  let num = 15;
  let level = 1;
  let score = 0;
  const $coinsSound = $('.coinsSound');
  const $themeSong = $('.themeSong');
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
    return false;
  }

  //dropping coins with setTimeout function
  function dropCoins($coin, speed){
    const marginTop = parseFloat($coin.css('margin-top'));
    const timerId = setTimeout(() => {
      if(marginTop >= $skinny.height() - $coin.height()) {
        // coin has hit floor
        $coin.css('margin-top', 0);
        speed = generateSpeed(num);//decrease num by 1 for next level
        score--;
      } else if($coin.parent().hasClass('mario') && marginTop >= $skinny.height() - 120) {//120 is a random given number
        // coin has hit mario
        $coinsSound.play();
        displayingScore();
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
          changingLevel();
          num-=1;
          break;
        case 20:
          changingLevel();
          num-=2;
          break;
        case 30:
          changingLevel();
          num-=3;
          break;
        case 50:
          changingLevel();
          num-=4;
          break;
        case 70:
          changingLevel();
          num-=5;
          break;
        case 80:
          changingLevel();
          num-=6;
          break;
        case 90:
          changingLevel();
          num-=9;
          break;
      }
    }
  }

  function generateSpeed(num) {
    return Math.ceil(Math.random() * 3) + num;
  }

  function startButton(){
    $coin.toArray().forEach((ball) => {
      setTimeout(() => {
        dropCoins($(ball), generateSpeed(num));
      }, generateSpeed(10));
    });
  }
  $(document).keydown(function(event) {
    switch (event.keyCode) {
      case 37: return changingClass(0, 'left');
      case 39: return changingClass(3, 'right');
    }
  });
  $button.on('click', () =>{
    $themeSong.play();
    startButton();
    $intro.hide();
    $grid.css('visibility', 'visible');
    $('h2').css('visibility', 'visible');
  });
}); //leave this
