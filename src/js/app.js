$(() => {
  let score = 0;
  const $balls = $('.circle');
  const $button = $('button');
  const $score = $('.score');
  const timers = [];
  // const $mario = $('.mario');
  const $skinny = $('.skinny');
  $(document).keydown(function(event) {
    switch (event.keyCode) {
      case 37: return changingClassLeft();
      case 39: return changingClassRight();
    }
  });

  function changingClassRight(){
    const $mario = $('.mario');
    if($mario.index('.skinny') === 3) return false;
    $mario.next('.skinny').addClass('mario');
    $mario.removeClass('mario');
  }
  function changingClassLeft(){
    const $mario = $('.mario');
    if($mario.index('.skinny') === 0) return false;
    $mario.prev('.skinny').addClass('mario');
    $mario.removeClass('mario');
  }

  function dropBall($ball, speed){
    const marginTop = parseFloat($ball.css('margin-top'));
    const timerId = setTimeout(() => {
      if (marginTop >= 550){
        $ball.css('margin-top', 0);
        speed = Math.ceil(Math.random() * 10) + 10;
      } else {
        $ball.css('margin-top', marginTop + 1);
      }
      dropBall($ball, speed);
    },speed);
    timers.push(timerId);
  }

  function startButton(){
    // timers.forEach(timerId => clearInterval(timerId));
    $balls.toArray().forEach((ball, index) => {
      setTimeout(() => {
        dropBall($(ball), Math.ceil(Math.random() * 10) + 10);
      }, 1000 * index);
    });
  }



  $button.on('click', startButton);

  $balls.on('click', ()=>{
    score++;
    $score.text(score);
  });

}); //leave this
