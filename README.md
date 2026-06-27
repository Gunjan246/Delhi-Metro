# Delhi Metro Route Finder

A web-based simulation of the Delhi Metro route system that finds the shortest path between two metro stations. The application models the metro network as a weighted graph and uses Dijkstra's Algorithm to compute the optimal route while displaying the total distance, estimated fare, and metro line information.

## Project Overview

The application allows users to:

- Find the shortest route between any two metro stations.
- View the complete station-by-station journey.
- Calculate the total travel distance.
- Estimate the fare based on the total distance.
- Display the metro line for each segment of the journey.

Unlike the initial version where the metro network was hardcoded, the application now loads station and route information dynamically from an external `metroData.json` file. This separates the graph data from the application logic, making the project easier to maintain and extend.

---



## Features

- Shortest path calculation using Dijkstra's Algorithm.
- Dynamic graph construction from `metroData.json`.
- Distance calculation between source and destination.
- Fare estimation using a distance-based pricing model.
- Metro line information for every station in the route.
- Station autocomplete for quick search.
- Responsive user interface.
- Modular project structure for improved maintainability.

---



## How It Works

The Delhi Metro network is represented as a weighted graph where:

- Each station is treated as a vertex.
- Connections between stations are represented as weighted edges.
- Edge weights represent the distance between connected stations.
- Each edge also stores the corresponding metro line.

When the application starts, it loads all station connections from `metroData.json`, builds the graph in memory, and then applies Dijkstra's Algorithm to determine the shortest route between the selected stations.

---



## Algorithm



### Dijkstra's Algorithm

The application uses Dijkstra's Algorithm to compute the shortest path between two stations.

The algorithm:

- Starts from the selected source station.
- Continuously explores the nearest unvisited station.
- Updates the shortest known distance to neighboring stations.
- Reconstructs the complete route once the destination is reached.

This guarantees the minimum-distance path because all edge weights are positive.

---



## Fare Calculation

The fare is calculated using the following formula:

```
Total Fare = Base Fare + (Per Km Charge × Total Distance)
```



### Pricing Model

- Base Fare: ₹10 
- Additional Charge: ₹2 per kilometer 
- Maximum Fare: ₹60

---



## Tech Stack


| Component          | Technology                      |
| ------------------ | ------------------------------- |
| Frontend           | HTML, CSS, JavaScript           |
| Algorithm          | Dijkstra's Algorithm            |
| Data Structure     | Weighted Graph (Adjacency List) |
| Data Source        | metroData.json                  |
| Original Prototype | C++                             |


---



## Sample Output

```
Source: Rajiv Chowk
Destination: Hauz Khas

Shortest Path

Rajiv Chowk (Yellow Line)
        ↓
Central Secretariat (Yellow Line)
        ↓
Hauz Khas

Total Distance: 10 km
Estimated Fare: ₹30
```

---



## Project Structure

```
Delhi-Metro-App/
│
├── data/
│   └── metroData.json       # Metro stations and connections
│
├── index.html               # Home page
├── about.html               # Project information
├── map.html                 # Metro map interface
├── results.html             # Route results
│
├── metro.js                 # Graph implementation and routing logic
├── map.js                   # Map and UI interactions
├── results.js               # Displays calculated route
│
├── styles.css               # Styling
│
├── metroApp.cpp             # Original C++ implementation
├── README.md
│
├── images/                  # Images and icons
└── .vscode/
```

---



## Future Improvements

- Replace the custom fare model with the official DMRC fare slab system. 
- Fetch metro data from a backend API instead of a local JSON file. 
- Add live train timings and interchange information. 
- Display the route on an interactive metro map. 
- Support route optimization based on travel time in addition to distance.

---



## Highlights

- Models the Delhi Metro as a weighted graph using an adjacency list. 
- Implements Dijkstra's Algorithm for efficient shortest-path computation. 
- Loads metro network data dynamically from an external JSON file. 
- Separates data from business logic for better maintainability. 
- Provides distance, estimated fare, and metro line details for every journey. 
- Originally prototyped in C++ and adapted into a web application using HTML, CSS, and JavaScript.

---

