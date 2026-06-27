class MetroGraph {
    constructor() {
        this.adjList = new Map();
        this.stations = new Set();
        this._loadPromise = null;
    }

    normalize(str) {
        return str.trim().toLowerCase();
    }

    addEdge(station1, station2, distance, line) {
        const s1 = this.normalize(station1);
        const s2 = this.normalize(station2);
        const normalizedLine = this.normalize(line);

        this.stations.add(s1);
        this.stations.add(s2);

        if (!this.adjList.has(s1)) {
            this.adjList.set(s1, []);
        }
        if (!this.adjList.has(s2)) {
            this.adjList.set(s2, []);
        }

        this.adjList.get(s1).push({ station: s2, distance, line: normalizedLine });
        this.adjList.get(s2).push({ station: s1, distance, line: normalizedLine });
    }

    findShortestPath(source, destination) {
        const src = this.normalize(source);
        const dest = this.normalize(destination);

        if (!this.adjList.has(src) || !this.adjList.has(dest)) {
            return null;
        }

        const distances = new Map();
        const previous = new Map();
        const pq = new PriorityQueue();

        // Initialize distances
        for (const [station] of this.adjList) {
            distances.set(station, Infinity);
        }
        distances.set(src, 0);

        pq.enqueue(src, 0);

        while (!pq.isEmpty()) {
            const [currentStation, currentDist] = pq.dequeue();

            if (currentStation === dest) break;

            for (const neighbor of this.adjList.get(currentStation)) {
                const newDist = currentDist + neighbor.distance;
                if (newDist < distances.get(neighbor.station)) {
                    distances.set(neighbor.station, newDist);
                    previous.set(neighbor.station, { station: currentStation, line: neighbor.line });
                    pq.enqueue(neighbor.station, newDist);
                }
            }
        }

        // Reconstruct path
        const path = [];
        let current = dest;
        while (current && previous.has(current)) {
            const prev = previous.get(current);
            path.unshift({ station: current, line: prev.line });
            current = prev.station;
        }
        if (current === src) {
            path.unshift({ station: current, line: "" });
        }

        if (path.length === 0 || path[0].station !== src) {
            return null;
        }

        return {
            path,
            totalDistance: distances.get(dest)
        };
    }

    calculateFare(distance) {
        const baseFare = 10;
        const perKmCharge = 2;
        const totalFare = baseFare + distance * perKmCharge;
        return Math.min(totalFare, 60); // Cap the fare at ₹60
    }

    async loadGraph() {
        if (!this._loadPromise) {
            this._loadPromise = (async () => {
                const response = await fetch('data/metroData.json');
                const data = await response.json();
                for (const edge of data.edges) {
                    this.addEdge(edge.from, edge.to, edge.distance, edge.line);
                }
            })();
        }
        return this._loadPromise;
    }
}

class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }

    dequeue() {
        const item = this.values.shift();
        return [item.val, item.priority];
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return this.values.length === 0;
    }
}

// Function to swap source and destination stations
function swapStations() {
    const sourceInput = document.getElementById('source');
    const destinationInput = document.getElementById('destination');
    const tempValue = sourceInput.value;
    sourceInput.value = destinationInput.value;
    destinationInput.value = tempValue;
}

// Create metro graph instance
const metro = new MetroGraph();

// Autocomplete functionality
function autocomplete(input, itemsContainer) {
    input.addEventListener("input", function() {
        const val = this.value.toLowerCase();
        itemsContainer.innerHTML = "";
        itemsContainer.style.display = "none";

        if (val.length < 2) return;

        const matches = Array.from(metro.stations)
            .filter(station => station.includes(val))
            .slice(0, 5);

        if (matches.length > 0) {
            // Position the dropdown properly
            const inputRect = input.getBoundingClientRect();
            itemsContainer.style.width = `${inputRect.width}px`;
            
            if (input.id === 'destination') {
                itemsContainer.style.left = 'auto';
                itemsContainer.style.right = '0';
            } else {
                itemsContainer.style.left = '0';
                itemsContainer.style.right = 'auto';
            }
            
            itemsContainer.style.display = "block";
            
            matches.forEach(match => {
                const div = document.createElement("div");
                div.innerHTML = capitalizeWords(match);
                div.addEventListener("click", function() {
                    input.value = capitalizeWords(match);
                    itemsContainer.style.display = "none";
                });
                itemsContainer.appendChild(div);
            });
        }
    });

    // Close the autocomplete list when clicking outside
    document.addEventListener("click", function(e) {
        if (e.target !== input) {
            itemsContainer.style.display = "none";
        }
    });
}

// Helper function to capitalize words
function capitalizeWords(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// Initialize autocomplete for both inputs
document.addEventListener("DOMContentLoaded", async function() {
    await metro.loadGraph();

    const sourceInput = document.getElementById("source");
    const destinationInput = document.getElementById("destination");
    const sourceItems = document.getElementById("sourceItems");
    const destinationItems = document.getElementById("destinationItems");

    if (sourceInput && destinationInput && sourceItems && destinationItems) {
        autocomplete(sourceInput, sourceItems);
        autocomplete(destinationInput, destinationItems);
    }
});

// Function to find and display the path
function findPath(event) {
    event.preventDefault();
    
    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;

    if (!source || !destination) {
        alert('Please enter both source and destination stations');
        return false;
    }

    // Redirect to results page with parameters
    window.location.href = `results.html?source=${encodeURIComponent(source)}&destination=${encodeURIComponent(destination)}`;
    return false;
} 
