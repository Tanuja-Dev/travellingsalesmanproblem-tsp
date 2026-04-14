# 🚚 TSP India: Smart Route Tracker

An interactive web platform designed to solve the **Travelling Salesman Problem (TSP)** specifically for logistics and courier delivery. This tool visualizes the efficiency of greedy algorithms in reducing operational costs and travel distances across Indian cities.

## 💡 Project Idea

In the world of logistics, inefficient routing leads to wasted fuel, higher costs, and delayed deliveries. [cite_start]**TSP India** bridges the gap between theoretical algorithm analysis and practical application[cite: 57, 58]. By integrating real-time geocoding, the project transforms the abstract "Nearest Neighbor" logic into a tangible tool that calculates actual trip itineraries and estimated costs in INR (₹).

## 🚀 Features

* 🎯 **Real-time Geocoding:** Automatically fetches GPS coordinates (Latitude/Longitude) for any city using the Nominatim API.
* 🔍 **Greedy Route Optimization:** Implements the Nearest Neighbor algorithm to find a fast, near-optimal path.
* 💰 **Dynamic Costing:** Live calculation of total trip expenses based on user-defined fuel rates per kilometer.
* 📈 **Live Complexity Tracking:** Provides an on-screen breakdown of Time and Space complexity as the data set grows.
* 🚫 **One-Click Reset:** "Clear Everything" functionality to quickly start fresh for new route planning.

## 🧠 AI & Algorithmic Concepts Used

### Travelling Salesman Problem (TSP)
[cite_start]The project tackles a classic **NP-hard** optimization problem: finding the shortest route that visits every city exactly once and returns to the start[cite: 19, 24].

### Greedy Approach (Nearest Neighbor)
[cite_start]The core logic relies on a local optimal choice strategy[cite: 31, 89]. [cite_start]At every step, the algorithm selects the nearest unvisited city without backtracking, ensuring high speed even for larger inputs[cite: 34, 36, 101].

### Haversine Formula
Used to calculate the "Great Circle" distance between two points on a sphere (Earth) based on their coordinates, ensuring accurate mileage regardless of city distance.

## 🛠️ Tech Stack

* **HTML5:** Structured dashboard layout utilizing a grid system for performance metrics.
* **Tailwind CSS:** Modern, responsive styling with custom animations for a polished UI.
* **JavaScript (ES6+):** Handles asynchronous API calls, coordinate sorting, and algorithmic logic.
* **Nominatim API:** Provides the spatial data required for geocoding city names into coordinates.

## ⚙️ How It Works

1.  **Set Home:** Enter the starting city (default: Nagpur) and set the fuel rate.
2.  **Add Destinations:** Search for cities; the app fetches coordinates and adds them to the potential list.
3.  **Calculate:** The algorithm sorts cities by the "cheapest" next step, building a sequential itinerary.
4.  **Visual Results:** View the total distance in km and the total cost in ₹, alongside a detailed step-by-step path.

## 📊 Performance Metrics

| Case | Time Complexity | Result Quality |
| :--- | :--- | :--- |
| **Best Case** | O(n^2)| Optimal |
| **Average Case** | $O(n^2)$ | Near Optimal |
| **Worst Case** | $O(n^2)$ | Not Optimal |

## 🎯 Objective
To demonstrate the practical benefits of the Greedy Approach in logistics—specifically how O(n^2) time complexity allows for real-time route planning while maintaining a "near-optimal" quality that reduces fuel consumption and operational overhead.

## 👩‍💻 Developed By

**Tanuja Deshmukh** and **Sayali Gundawar** 
⭐ Future Improvements 🧩 Informed Search Modules 📊 Performance Metrics 💾 Export Functionality

## Deployment

**Netlify**: https://travellingsalesmanproblem.netlify.app/
**GitHub Pages**: 
