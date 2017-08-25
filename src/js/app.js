$(() => {
  let timerId = null;

  const $balls = $('.circle');
  let marginTop = 0;
  const $button = $('button');
  let score = 0;
  const $score = $('.score');

  function runningTimer(){
    timerId = setInterval(() => {
      if (marginTop === 550){
        clearInterval(timerId);
      } else {
        $balls.css('margin-top', marginTop + 1);
        marginTop++;
        console.log(marginTop);
      }
    },10);
  }
  $button.on('click',runningTimer);
  $balls.on('click', (e)=>{
    $(e.target).css('visibility', 'hidden');
    score++;
    $score.text(score);

  });

}); //leave this
