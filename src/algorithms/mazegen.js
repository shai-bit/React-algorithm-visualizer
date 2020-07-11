export function clearPassages(grid, passageArray, width, height) {
  for (const passage of passageArray) {
    if (passage[0] > 0) {
      grid[passage[0] - 1][passage[1]].iswall = "false";
    }
    if (passage[0] < height) {
      grid[passage[0] + 1][passage[1]].iswall = "false";
    }
    if (passage[1] > 0) {
      grid[passage[0]][passage[1] - 1].iswall = "false";
    }
    if (passage[1] < width) {
      grid[passage[0]][passage[1] + 1].iswall = "false";
    }
  }
}

export const generateMaze = (
  grid,
  x,
  y,
  width,
  height,
  orientation,
  passages
) => {
  if (width < 3 || height < 3) return;
  let horizontal = orientation === "horizontal";

  // x and y coordinates for wall
  let wallX = x + (horizontal ? 0 : getRandomInt(0, width - 2));
  let wallY = y + (horizontal ? getRandomInt(0, height - 2) : 0);

  // x and y passage coordinates
  const passageX = wallX + (horizontal ? getRandomInt(0, width) : 0);
  const passageY = wallY + (horizontal ? 0 : getRandomInt(0, height));
  passages.push([passageY, passageX]);

  // value to be added in that direction
  const directionX = horizontal ? 1 : 0;
  const directionY = horizontal ? 0 : 1;
  const length = horizontal ? width : height;
  const passage = horizontal ? passageX : passageY;

  for (let i = 0; i < length; i++) {
    let currentNode = horizontal ? wallX : wallY;
    if (
      currentNode !== passage &&
      grid[wallY][wallX].isStart !== true &&
      grid[wallY][wallX].isFinish !== true
    ) {
      grid[wallY][wallX].iswall = "true";
    }
    wallX += directionX;
    wallY += directionY;
  }

  let [newX, newY] = [x, y];
  let [newWidth, newHeight] = horizontal
    ? [width, wallY - y + 1]
    : [wallX - x + 1, height];
  generateMaze(
    grid,
    newX,
    newY,
    newWidth,
    newHeight,
    getOrientation(newWidth, newHeight),
    passages
  );

  [newX, newY] = horizontal ? [x, wallY + 1] : [wallX + 1, y];
  [newWidth, newHeight] = horizontal
    ? [width, y + height - wallY - 1]
    : [x + width - wallX - 1, height];
  generateMaze(
    grid,
    newX,
    newY,
    newWidth,
    newHeight,
    getOrientation(newWidth, newHeight),
    passages
  );
};

export function getOrientation(width, height) {
  if (width < height) return "horizontal";
  else if (height < width) return "vertical";
  else return getRandomInt(0, 2) === 0 ? "horizontal" : "vertical";
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
