$(() => {
  let score = 0;
  const $coin = $('.coins');
  const $button = $('button');
  const $score = $('.score');
  const timers = [];
  const $themeSong = $('audio');
  $themeSong.play();
  // const $mario = $('.mario');
  // const $skinny = $('.skinny');
  $(document).keydown(function(event) {
    switch (event.keyCode) {
      case 37: return changingClassToLeft();
      case 39: return changingClassToRight();
    }
  });
  function winCheck(){
    const marginTop = parseFloat($coin.css('margin-top'));
    // const $mario = $('.mario');
    if(marginTop===400){
      score++;
      $score.text(score);
    } else{
      $coin.css('margin-top', marginTop + 1);
    }
    console.log(marginTop);
  }
  function changingClassToRight(){
    const $mario = $('.mario');
    if($mario.index('.skinny') === 3) return false;
    $mario.next('.skinny').addClass('mario');
    $mario.removeClass('mario');
  }
  function changingClassToLeft(){
    const $mario = $('.mario');
    if($mario.index('.skinny') === 0) return false;
    $mario.prev('.skinny').addClass('mario');
    $mario.removeClass('mario');
  }

  function dropBall($coin, speed){
    const marginTop = parseFloat($coin.css('margin-top'));
    const timerId = setTimeout(() => {
      if (marginTop >= 500){
        $coin.css('margin-top', 0);
        speed = Math.ceil(Math.random() * 10) + 10;
      } else {
        $coin.css('margin-top', marginTop + 1);
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
    winCheck();
  });
}); //leave this
