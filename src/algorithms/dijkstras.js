export const dijkstras = (grid, startNode, finishNode) => {
  startNode.distance = 0;
  let unvisitedNodes = getAllNodes(grid);
  let visitedNodesInOrder = [];
  while (!!unvisitedNodes.length) {
    sortUnvisited(unvisitedNodes);
    let currentNode = unvisitedNodes.shift();
    // If it's a wall you skip it
    if (currentNode.iswall === "true") continue;
    if (currentNode.distance === Infinity) return visitedNodesInOrder;
    currentNode.visited = "true";
    visitedNodesInOrder.push(currentNode);
    if (currentNode === finishNode) return visitedNodesInOrder;
    updateNeighbors(currentNode, grid);
  }
  return visitedNodesInOrder;
};

function getAllNodes(grid) {
  let nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

function sortUnvisited(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateNeighbors(currentNode, grid) {
  const { row, col } = currentNode;
  let neighbors = [];
  // Gets nodes up, down, left, right from currentNode
  if (row > 0) {
    neighbors.push(grid[row - 1][col]);
  }
  if (row < grid.length - 1) {
    neighbors.push(grid[row + 1][col]);
  }
  if (col > 0) {
    neighbors.push(grid[row][col - 1]);
  }
  if (col < grid[0].length - 1) {
    neighbors.push(grid[row][col + 1]);
  }
  // Filters neighbors that are already visted
  neighbors.filter((neighbor) => neighbor.visited === "false");
  for (const neighbor of neighbors) {
    if (neighbor.distance > currentNode.distance + 1) {
      neighbor.previousnode = currentNode;
      neighbor.distance = currentNode.distance + 1;
    }
  }
}

export function tracePath(finishNode) {
  let path = [];
  let currentNode = finishNode.previousnode;
  if (currentNode === null) return false;
  while (currentNode.isStart !== true) {
    path.push(currentNode);
    currentNode = currentNode.previousnode;
  }
  path.reverse();
  return path;
}
