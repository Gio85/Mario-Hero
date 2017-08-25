$(() => {
  let score = 0;
  const $balls = $('.circle');
  const $button = $('button');
  const $score = $('.score');
  const timers = [];

  function dropBall($ball, speed){
    let marginTop = 0;
    const timerId = setInterval(() => {
      if (marginTop === 550){
        clearInterval(timerId);
        $ball.css('visibility','hidden');
      } else {
        $ball.css('margin-top', marginTop + 1);
        marginTop++;
      }
    },speed);

    timers.push(timerId);
  }

  function repeatingDroppinBall(){
    timers.forEach(timerId => clearInterval(timerId));
    $balls.toArray().forEach(ball => dropBall($(ball), Math.floor(Math.random() * 10 )));
  }

  $button.on('click', repeatingDroppinBall);

  $balls.on('click', ()=>{
    score++;
    $score.text(score);
  });

}); //leave this
