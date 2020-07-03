
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
  }
