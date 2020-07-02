// graph = {
//   a: [
//     ["e", 8],
//     ["d", 7],
//     ["b", 3],
//   ],
//   b: [
//     ["c", 1],
//     ["d", 4],
//   ],
//   c: [],
//   d: [["c", 2]],
//   e: [["d", 3]],
// };

graph = {
  a: [
    ["b", 1],
    ["c", 2],
    ["d", 3],
    ["e", 4],
  ],
  b: [["f", 5]],
  c: [["f", 6]],
  d: [["f", 7]],
  e: [["f", 8]],
  f: [],
};
function dijkstras(graph, start, end) {
  let log = {};
  let distanceLog = {};
  let unvisited = [];
  let visited = [];
  let current = null;
  // Logs initial values. All but start vertex set to infinity
  Object.keys(graph).forEach((key) => {
    unvisited.push(key);
    if (key !== start) {
      log[key] = [Infinity, null];
      distanceLog[key] = Infinity;
    } else {
      log[key] = [0, null];
      distanceLog[key] = 0;
    }
  });
  //   console.log("unvisited", unvisited);
  //   console.log(Object.values(log));
  while (unvisited.length > 0) {
    // Looks for the vertex with the smallest distance from start
    let current = Object.keys(distanceLog).reduce((a, b) =>
      log[a][0] < log[b][0] ? a : b
    );
    delete distanceLog[current];
    let currentDistance = log[current][0];
    // Removes current from unvisited
    unvisited = unvisited.filter((vertex) => vertex !== current);
    // Visits each neighbor and tries to update cost and previous
    graph[current].forEach((edge) => {
      let node = edge[0];
      let edgeCost = edge[1];
      if (log[node][0] > edgeCost + currentDistance) {
        log[node][0] = edgeCost + currentDistance;
        log[node][1] = current;
      }
    });
    console.log(log);
  }
  console.log(
    "Shortest path from",
    start,
    "to",
    end,
    ":",
    log[log[end][1]][1],
    "->",
    log[end][1],
    "->",
    end,
    "distance:",
    log[end][0]
  );
}

dijkstras(graph, "a", "f");

// function randomGraph(numberVertex) {
//   let graph = {};
//   for (let i = 0; i < numberVertex; i++) {
//     numberofEdges = getRandomInt(0, numberVertex - 1);
//     for (let j = i + 1; j < numberofEdges; j++) {
//       graph[i] = [j, getRandomInt(0, 10)];
//     }
//   }
//   return graph;
// }

// const getRandomInt = (min, max) => {
//   return Math.floor(Math.random() * (max - min)) + min;
// };

// test = randomGraph(5);
// console.log(test);
