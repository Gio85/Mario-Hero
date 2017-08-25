$(() => {

  const $balls = $('.circle');
  const $button = $('button');
  let score = 0;
  const $score = $('.score');
  const timers = [];

  function dropBall($ball, speed){
    let marginTop = 0;
    const timerId = setInterval(() => {
      if (marginTop === 550){
        clearInterval(timerId);
      } else {
        $ball.css('margin-top', marginTop + 1);
        marginTop++;
      }
    },speed);

    timers.push(timerId);
  }

  function repeatingDroppinBall(){
    let game = 0;
    while(game<10){
      timers.forEach(timerId => clearInterval(timerId));
      $balls.toArray().forEach(ball => dropBall($(ball), Math.floor(Math.random() * 8)));
    }
    game++;
  }

  $button.on('click', repeatingDroppinBall);

  $balls.on('click', (e)=>{
    $(e.target).css('visibility', 'hidden');
    score++;
    $score.text(score);
  });

}); //leave this
