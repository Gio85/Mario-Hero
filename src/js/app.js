$(() => {
  let score = 0;
  const $coin = $('.coins');
  const $button = $('button');
  const $score = $('.score');
  const timers = [];
  const $skinny = $('.skinny');
  const $grid = $('.grid');
  const $intro = $('.instructions');
  const $level = $('.level');

  $(document).keydown(function(event) {
    switch (event.keyCode) {
      case 37: return changingClassToLeft();
      case 39: return changingClassToRight();
    }
  });

  function changingClassToRight(){
    const $mario = $('.mario');
    if($mario.index('.skinny') === 3) return false;
    $mario.next('.skinny').addClass('mario');
    // $mario.next('.skinny').css('background-image', 'url(../images/mario-running-right.gif)');
    $mario.removeClass('mario');
  }
  function changingClassToLeft(){
    const $mario = $('.mario');
    if($mario.index('.skinny') === 0) return false;
    $mario.prev('.skinny').addClass('mario');
    // $mario.prev('.skinny').css('background-image', 'url(../images/mario-running-left.gif)');
    $mario.removeClass('mario');
  }
  let num = 10;
  let level = 1;
  let numMargin = 1;
  function dropBall($coin, speed){
    const marginTop = parseFloat($coin.css('margin-top'));
    const timerId = setTimeout(() => {
      if (marginTop >= $skinny.height() - $coin.height()){
        // coin has hit floor
        $coin.css('margin-top', 0);
        speed = Math.ceil(Math.random() * 10) + num;//decrease the number by 1 for next level
        score--;
        $score.text(score);
      } else if($coin.parent().hasClass('mario') && marginTop >= $skinny.height() - 120) {//120 is a random given number
        // coin has hit mario
        score++;
        if(score===10){
          level++;
          $level.text(level);
          num-=7;

        } else if(score===22){
          level++;
          $level.text(level);
          num-=1;
          console.log(score, num, level);
        } else if(score===30){
          level++;
          $level.text(level);
          numMargin++;
        } else if(score===50){
          level++;
          $level.text(level);
        }else if(score===70){
          level++;
          $level.text(level);
          numMargin++;
          num = 10;
        }else if(score===80){
          level++;
          $level.text(level);
          numMargin++;
          num-=5;
        }else if(score===90){
          level++;
          $level.text(level);
        } else if(score===100){
          $grid.hide();
          $('.final').css('visibility', 'visible');
          $level.hide();
          $score.hide();
          $('h2').hide();

        }
        $score.text(score);
        $coin.css('margin-top', 0);
        speed = Math.ceil(Math.random() * 10) + num;//decrease the number by 1 for next level
      } else {
        $coin.css('margin-top', marginTop + numMargin);//add more to increase the speed
      }
      dropBall($coin, speed);
    },speed);
    timers.push(timerId);
  }



  function startButton(){
    $coin.toArray().forEach((ball, index) => {
      setTimeout(() => {
        dropBall($(ball), Math.ceil(Math.random() * 10) + 10);
      }, 1000 * index);
    });
  }



  $button.on('click', () =>{
    startButton();
    $intro.hide();
    $grid.css('visibility', 'visible');
  });
}); //leave this
