
export const Actions={
MOVE_RIGHT:"MOVE_RIGHT",
MOVE_LEFT:"MOVE_LEFT",
MOVE_UP:"MOVE_UP",
MOVE_DOWN:"MOVE_DOWN",
INCREASE_SNAKE:"INCREASE_SNAKE",
SET_DIS_DIRECTION:"SET_DIS_DIRECTION",
RIGHT:"RIGHT",
LEFT:"LEFT",
UP:"UP",
DOWN:"DOWN",
END_GAME:"END_GAME",
RESET_GAME:"RESET_GAME"

};

export const setDisDirection__ = (direction) => ({
    type:  Actions.SET_DIS_DIRECTION,
    payload: direction
  });

export const makeMove = (dx, dy, move) => ({
    type: move,
    payload: [dx, dy]
  });

export const increaseSnake=()=>({type:Actions.INCREASE_SNAKE,payload:[]})

export const endGame=()=>({type:Actions.END_GAME,payload:[]})

export const resetGame=()=>({type:Actions.RESET_GAME,payload:[]})
