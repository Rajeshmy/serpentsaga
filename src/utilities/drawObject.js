

export const drawObject = (
    context,
    objectBody,
    fillColor,
    food=false,
  ) => {
    if (context) {
      objectBody.forEach((object) => {
        context.fillStyle = fillColor;
        context.strokeStyle =food?'darkgreen':"white";
        context.fillRect(object.x, object.y, 20, 20);
        context.strokeRect(object.x, object.y, 20, 20);
      });
    }
  };