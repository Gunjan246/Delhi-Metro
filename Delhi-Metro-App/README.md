# 🚇 Delhi Metro Route Finder

A simulation of the **Delhi Metro Route System** that enables users to find the shortest path between metro stations. The project models the metro network as a weighted graph and uses **Dijkstra's Algorithm** to compute the optimal route while displaying the total distance, estimated fare, and metro line information.

---

## 📖 Project Overview
The application is designed to simplify metro route planning by allowing users to:

- 🚇 Find the shortest route between any two stations.
- 📍 View the complete station-by-station journey.
- 📏 Check the total travel distance.
- 💸 Estimate the fare based on the total distance.
- 🗺️ Identify the metro line for every segment of the route.

---

## ✨ Features

- 🔍 Shortest route calculation using **Dijkstra's Algorithm**
- 🗺️ Metro line information for each station in the route
- 📏 Automatic distance calculation
- 💰 Fare estimation using a distance-based pricing model
- 📊 Complete visualization of the metro network
- 💻 Built entirely using **HTML**, **CSS**, and **JavaScript**
- 📱 Responsive interface for different screen sizes
- 📂 Modular project structure for better maintainability

---

## 🧠 Algorithm Used

### Dijkstra's Algorithm

The Delhi Metro network is represented as a **weighted graph**, where:

- **Stations** are treated as vertices.
- **Metro connections** are represented as weighted edges.
- **Edge weights** correspond to the distance between stations.

The algorithm evaluates all possible routes and determines the one with the minimum total distance while preserving the sequence of stations and metro line information.

---

## 💸 Fare Calculation

The fare is calculated using the following formula:

$$
\text{Total Fare} = \text{Base Fare} + (\text{Per Km Charge} \times \text{Total Distance})
$$

**Pricing Model**

- Base Fare: **₹10**
- Additional Charge: **₹2 per kilometer**

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Programming Language | C++ |
| Frontend | HTML, CSS, JavaScript |
| Algorithm | Dijkstra's Algorithm |
| Graph Representation | Weighted Graph |

---

## 📊 Sample Output

```text
Enter source station: Rajiv Chowk
Enter destination station: Hauz Khas

Shortest Path:
Rajiv Chowk (Yellow Line)
        ↓
Central Secretariat (Yellow Line)
        ↓
Hauz Khas

Total Distance: 10 km
Total Fare: ₹30
```

---

## 📁 Project Structure

```text
Delhi-Metro-App/
├── index.html          # Home page
├── about.html          # Project information
├── map.html            # Metro map interface
├── results.html        # Displays route details
├── map.js              # Loads and manages station data
├── metro.js            # Graph implementation and routing logic
├── results.js          # Displays calculated results
├── styles.css          # Styling
├── metroApp.cpp        # Original C++ implementation
├── delhi_metro.exe     # Compiled executable
├── images/             # Icons and images
├── output/             # Program outputs
└── .vscode/            # VS Code configuration
```

---

## 📌 Highlights

- Efficient shortest-path computation using graph algorithms.
- Clean and responsive user interface.
- Distance and fare estimation for every journey.
- Modular code organization for easier maintenance.
- Original implementation in **C++** with a web-based interface.