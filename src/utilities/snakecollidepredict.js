export const hasSnakeCollided = (
    snake,
    currentHeadPos
  ) => {
    let flag = false;
    snake.forEach((pos,index) => {
      if (
        pos.x === currentHeadPos.x &&
        pos.y === currentHeadPos.y && index!==0
       
      ) {
        return flag = true;
      }
    });
  
    return flag;
  };