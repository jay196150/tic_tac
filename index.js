const boxes= document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGame = document.querySelector(".btn");

let currentPlayer;
let gamegrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// initilized gme

function initGame(){
    currentPlayer = "X";
    gamegrid = ["","","","","","","","",""];
    // ui par pan empty karay
    boxes.forEach((box,index)=>{
         box.innerText = "";
         boxes[index].style.pointerEvents = "all"
         box.classList = `box box${index+1}`


    })
    newGame.classList.remove("active");
    gameInfo.innerText = `current Player - ${currentPlayer}`
}



initGame();
function swapTurn(){
    if(currentPlayer == "X"){
        currentPlayer = "0"; 
    }
    else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `current Player - ${currentPlayer}`
}

function checkGameOver(){
      
    let answer = "";

    winningPosition.forEach((position) => {

        if( (gamegrid[position[0]] !== "" || gamegrid[position[1]] !== "" || gamegrid[position[2]] !== "") &&
        (gamegrid[position[0]] ===gamegrid[position[1]]) && gamegrid[position[1]] ===gamegrid[position[2]] ){
               
            if(gamegrid[position[0]] === "X")
                answer = "X";
            else 
                answer = "0"; 
            
            // disable poiner
            boxes.forEach((box)=>{
              box.style.pointerEvents = "none"
            });
            boxes[position[0]].classList.add("win"); 
            boxes[position[1]].classList.add("win");    
            boxes[position[2]].classList.add("win"); 
        }
    });

    if(answer !== ""){
        gameInfo.innerText =  "Winner is jay"  //`Winner is ${answer}`;
        newGame.classList.add("active");
        return;
    }

    // when no winnner 

    let fillCount=0;
    gamegrid.forEach((box)=>{
         if(box !== ""){
            fillCount++;
         }
    });

    if(fillCount === 9){
        gameInfo.innerText = "game Tide";
        newGame.classList.add("active");
    }


     

}

function handleClick(index){
    if(gamegrid[index] ==""){
        boxes[index].innerText = currentPlayer;
        gamegrid[index] =currentPlayer;
        boxes[index].style.pointerEvents = "none"
        swapTurn();
        
        checkGameOver();


    }
}
boxes.forEach((box,index)=> {
    box.addEventListener("click" , ()=> {
        handleClick(index);
    })
} )

newGame.addEventListener("click",initGame);