const graph = {
    A: { B: 4, C: 2 },      // Node A is connected to Node B with a weight of 1 and Node C with a weight of 4
    B: { A: 4, C: 5 , D: 10 },  // ... and so on for other nodes
    C: { A: 2, B: 5, D: 3 },
    D: { B: 10, C: 3 }};

function dijkstra(graph, start) {
    // Create an object to store the shortest distance from the start node to every other node
    let distances = {};

    // A set to keep track of all visited nodes
    let visited = new Set();

    // Get all the nodes of the graph
    let nodes = Object.keys(graph);

    // Initially, set the shortest distance to every node as Infinity
    for (let node of nodes) {
        distances[node] = Infinity;}   
    // The distance from the start node to itself is 0
    distances[start] = 0;

    // Loop until all nodes are visited
    while (nodes.length) {
        // Sort nodes by distance and pick the closest unvisited node
        nodes.sort((a, b) => distances[a] - distances[b]);
        let closestNode = nodes.shift();

        // If the shortest distance to the closest node is still Infinity, then remaining nodes are unreachable and we can break
        if (distances[closestNode] === Infinity) break;

        // Mark the chosen node as visited
        visited.add(closestNode);

        // For each neighboring node of the current node
        for (let neighbor in graph[closestNode]) {
            // If the neighbor hasn't been visited yet
            if (!visited.has(neighbor)) {
                // Calculate tentative distance to the neighboring node
                let newDistance = distances[closestNode] + graph[closestNode][neighbor];
                
                // If the newly calculated distance is shorter than the previously known distance to this neighbor
                if (newDistance < distances[neighbor]) {
                    // Update the shortest distance to this neighbor
                    distances[neighbor] = newDistance;
                }
            }
        }
    }
    // Return the shortest distance from the start node to all nodes
    console.log(distances); 
    document.querySelector("div").innerHTML=`A : ${distances.A}
    <br>
    B : ${distances.B}
    <br>
    C : ${distances.C}
    <br>
    D : ${distances.D}`
    return distances;}
document.querySelector("button").addEventListener('click',()=>{
    dijkstra(graph, "A")
})
// Example: Find shortest distances from node A to all other nodes in the graph
