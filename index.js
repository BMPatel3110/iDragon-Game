score=0;
cross=true;
audio = new Audio('music.mp3');
audioGameOver = new Audio('gameover.mp3');
setTimeout(()=>{
    audio.play();
},1000)



document.onkeydown = function(e){
    console.log("key code is:", e.key);
    if(e.key=="ArrowUp")
    {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(()=>{
            dino.classList.remove('animateDino');
        },700);
    }

    if(e.key=="ArrowLeft" )
    {
        dino = document.querySelector('.dino');
        dinoX =  parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        if(dinoX >100)
        dino.style.left = (dinoX -100) +"px";
        
    }

    if(e.key=="ArrowRight")
    {
        dino = document.querySelector('.dino');
        dinoX =  parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dinoR =  parseInt(window.getComputedStyle(dino,null).getPropertyValue('right'));
        if(dinoR >100)
        dino.style.left = (dinoX +100) +"px";
    }
}
 

setInterval(() =>{
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');
    scoreCount = document.querySelector('.scoreCount');

    // to get x and y coordinate value from left

    dx = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));

    offsetx = Math.abs(dx -ox);
    offsety = Math.abs(dy -oy);

    if(offsetx < 100 && offsety <80)
    {
        gameOver.innerHTML = 'Game Over... Reload for Play Again';
        obstacle.classList.remove('animateDragon');
        scoreCount.classList.add('scoreCountFinal');
        scoreCount.classList.remove('scoreCount');
        dino.style.bottom = -20 +'vh';
        audioGameOver.play();
        setTimeout(()=>{
            audioGameOver.pause();
            audio.pause();
        },1000);
    }

    else if(offsetx < 100 && cross){
        score+=1;
        updateScore(score);
        cross=false;

        setTimeout(() =>{
            cross = true;
        },1000);
        aniDur = parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
        if(aniDur > 2.0)
        {
            setTimeout(()=>{
                newDur = aniDur -0.1;
                console.log(newDur);
                obstacle.style.animationDuration = newDur +'s';
            },600);
        }
    
    }


});

function updateScore(score){
    scoreCount = document.querySelector('.scoreCount');
    scoreCount.innerHTML = "Your Score: " + score;
}