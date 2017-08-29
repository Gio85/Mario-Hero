$(() => {
  let score = 0;
  const $coin = $('.coins');
  const $button = $('button');
  const $score = $('.score');
  const timers = [];
  const $skinny = $('.skinny');
  const $grid = $('.grid');
  const $intro = $('.instructions');

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

  function dropBall($coin, speed){
    const marginTop = parseFloat($coin.css('margin-top'));
    const timerId = setTimeout(() => {

      if (marginTop >= $skinny.height() - $coin.height()){
        // coin has hit floor
        $coin.css('margin-top', 0);
        speed = Math.ceil(Math.random() * 10) + 10;
      } else if($coin.parent().hasClass('mario') && marginTop >= $skinny.height() - 120) {
        // coin has hit mario
        console.log('WIN!');
        $coin.css('margin-top', 0);
        speed = Math.ceil(Math.random() * 10) + 10;
      } else {
        $coin.css('margin-top', marginTop + 1);//add more to increase the speed
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
