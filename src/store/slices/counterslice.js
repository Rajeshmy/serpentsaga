import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  snake:[
    { x: 580, y: 300 },
    { x: 560, y: 300 },
    { x: 540, y: 300 },
    { x: 520, y: 300 },
    { x: 500, y: 300 },
  ],
  disallowedDirection: "",
  score:0,
};

export const counterSlice = createSlice({
  name: "counterSlice",
  initialState,
  reducers: {
    setSnake: (state,action) => {
        
        if(action.payload.type === "DOWN"||"UP"||"LEFT"||"RIGHT"){
          let newSnake = [...state.snake];
          newSnake = [
            {
              //New x and y coordinates
              x: state.snake[0].x + action.payload.payload[0],
              y: state.snake[0].y + action.payload.payload[1],
            },
            ...newSnake,
          ];
          newSnake.pop();
          state.snake = newSnake;
          //console.log(JSON.stringify(state.snake));
        } 
    },
    setDisDirection : (state,action) => {
        if(action.payload.type === "SET_DIS_DIRECTION"){
           state.disallowedDirection=action.payload.payload;
           //console.log( state.disallowedDirection)
        }   
      },
    increaseSnake:(state,action) => {
        if(action.payload.type === "SNAKE"){
          let newSnake = [...state.snake];
          newSnake.push( {
            x: state.snake[state.snake.length-1].x -20,
            y: state.snake[state.snake.length-1].y -20,
          });
          state.snake = newSnake;

          //alert(JSON.stringify(newSnake));
          state.score+=1;
        }   
      }, 
      gameReset : (state,action) => {
       
        state.score=0;
        state.disallowedDirection="";
        state.snake=initialState.snake;
  },}
});

export const { setSnake, setDisDirection,increaseSnake,gameReset } = counterSlice.actions;

export default counterSlice.reducer;
