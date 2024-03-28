import React, { useEffect, useRef, useState,useCallback } from 'react'
import { useSelector } from 'react-redux';
import {drawObject} from "../utilities/drawObject";
import { clearBoard } from '../utilities/clearBoard';
import { hasSnakeCollided } from '../utilities/snakecollidepredict';
import { useDispatch } from 'react-redux';
import { Actions,makeMove,endGame,resetGame} from '../store/actions/actions';
import { increaseSnake,gameReset } from "../store/slices/counterslice";

const CanvasBoard = ({height,width})=>{

  function randomNumber(min, max) {
    let random = Math.random() * max;
    return random - (random % 20);
  }
  
  const generateRandomPosition = (width, height) => {
    return {
      x: randomNumber(0, width),
      y: randomNumber(0, height),
    };
  };

    const dispatch=useDispatch();
    const [pos, setPos] = useState(generateRandomPosition(width - 20, height - 20));
    const [isconsumed,setisconsumed]=useState(false);
    const [context,setcontext]=useState(null);
    const [gameended,setgameended]=useState(true);
    const canvasRef = useRef(null);
    const {snake,disallowedDirection,score} = useSelector((state)=>state.counter);

    const moveSnake=useCallback((dx=0,dy=0,ds)=>{
        if (dx > 0 && dy === 0 && ds !== "RIGHT") {
            dispatch(makeMove(dx, dy, Actions.MOVE_RIGHT));
        }

        if (dx < 0 && dy === 0 && ds !== "LEFT") {
            dispatch(makeMove(dx, dy, Actions.MOVE_LEFT));
        }

        if (dx === 0 && dy < 0 && ds !== "UP") {
            dispatch(makeMove(dx, dy, Actions.MOVE_UP));
        }

        if (dx === 0 && dy > 0 && ds !== "DOWN") {
            dispatch(makeMove(dx, dy, Actions.MOVE_DOWN));
        }
    },[]);

    const handleKeyEvents = useCallback(
        (event) => {
          if (disallowedDirection) {
            switch (event.key) {
              case "w":
                moveSnake(0, -20, disallowedDirection);
                break;
              case "s":
                moveSnake(0, 20, disallowedDirection);
                break;
              case "a":
                moveSnake(-20, 0, disallowedDirection);
                break;
              case "d":
                moveSnake(20, 0, disallowedDirection);
                break;
              default:
                break;  
            }
          } else {
            if (
              disallowedDirection !== "LEFT" &&
              disallowedDirection !== "UP" &&
              disallowedDirection !== "DOWN" &&
              event.key === "d"
            ){
              event.preventDefault();
              moveSnake(20, 0,disallowedDirection); //Move RIGHT at start
             
            }
          }
        },
        [disallowedDirection, moveSnake]
      );
     

    useEffect(()=>{
 
       setcontext(
        canvasRef.current&& canvasRef.current.getContext('2d')
       );
       clearBoard(context); 
       drawObject(context, snake, "pink"); //Draws snake at the required position
       drawObject(context, [pos], "lightgreen",true);

       if(snake[0].x === pos?.x && snake[0].y === pos?.y){
        console.log("consumed!!")
        setisconsumed(true)
      };

      if( (snake[0].x > width ||
        snake[0].x < 0 ||
        snake[0].y < 0 ||
        snake[0].y > height)||(hasSnakeCollided(snake, snake[0]) )){

           
           alert(`game over. your score is ${score}`)
           setgameended(true);
           dispatch(endGame());
           window.removeEventListener("keypress", handleKeyEvents);

      }

    },[snake,context]);

    
    useEffect(() => {
      if (isconsumed) {
        const posi = generateRandomPosition(width - 20, height - 20);
        setPos(posi);
        setisconsumed(false);
        //Increase snake size when object is consumed successfully
        dispatch(increaseSnake({
                  type: "SNAKE",
                  payload: [],
                }));
      }
    }, [isconsumed, pos, height, width, dispatch]);


    useEffect(() => {
        window.addEventListener("keypress", handleKeyEvents);
    
        return () => {
          window.removeEventListener("keypress", handleKeyEvents);
        };
      }, [disallowedDirection, handleKeyEvents]); 

      const gameResetfunction= useCallback(()=>{
       
        window.removeEventListener("keypress", handleKeyEvents)
         dispatch(resetGame);
         clearBoard(context);
         dispatch(gameReset());
         //draw again to restart game
         setgameended(false);
         drawObject(context,snake,"#91C483");
         drawObject(
          context,
          [generateRandomPosition(width - 20, height - 20)],
          "#676FA3"
        ); //Draws object randomly
        window.addEventListener("keypress", handleKeyEvents);

      },[])


    return(
      <>
      <canvas ref={canvasRef} style={{border: "3px solid black"}} height={height} width={width}/>
      <div> press "d" to start |   "a" to move left |   "d" to move right |  "w" to move up |   "s" to move down </div>
      <button style={{backgroundColor:'lightblue',padding:3,borderRadius:4,borderWidth:1,borderColor:'grey',fontWeight: 'semiBold',color:'#A9A9A9'}}onClick={()=>{gameResetfunction()}} disabled={!gameended}>RESET</button>
      </>
    );
};

export default CanvasBoard;
