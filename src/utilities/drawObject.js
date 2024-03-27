

export const drawObject = (
    context,
    objectBody,
    fillColor,
    strokeStyle = "#146356"
  ) => {
    if (context) {
      objectBody.forEach((object) => {
        context.fillStyle = fillColor;
        context.strokeStyle = strokeStyle;
        context.fillRect(object.x, object.y, 20, 20);
        context.strokeRect(object.x, object.y, 20, 20);
      });
    }
  };