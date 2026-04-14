let locations = [];
const loadingTxt = document.getElementById('loadingTxt');

function formatGPS(lat, lon) {
    const latDir = lat >= 0 ? "N" : "S";
    const lonDir = lon >= 0 ? "E" : "W";
    return `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lon).toFixed(4)}° ${lonDir}`;
}

function getHaversine(p1, p2) {
    const R = 6371; 
    const dLat = (p2.lat - p1.lat) * Math.PI / 180;
    const dLon = (p2.lon - p1.lon) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

document.getElementById('addCityBtn').addEventListener('click', async () => {
    const cityName = document.getElementById('destInput').value.trim();
    if (!cityName) return;

    loadingTxt.classList.remove('hidden');

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${cityName}`);
        const data = await response.json();

        if (data && data.length > 0) {
            locations.push({
                name: cityName,
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon)
            });
            document.getElementById('destInput').value = "";
            renderTrip();
        } else {
            alert("City not found.");
        }
    } catch (err) {
        alert("API Error.");
    } finally {
        loadingTxt.classList.add('hidden');
    }
});

async function renderTrip() {
    const startName = document.getElementById('startCity').value;
    const rate = parseFloat(document.getElementById('fuelRate').value);
    const n = locations.length;

    if (n === 0) return;

    const startRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${startName}`);
    const startData = await startRes.json();
    if (startData.length === 0) return;

    const startPt = { lat: parseFloat(startData[0].lat), lon: parseFloat(startData[0].lon) };
    
    let currentPt = startPt;
    let totalKm = 0;
    let html = "";
    let unvisited = [...locations];

    // Greedy Sort Logic (Comparing Costs Ascending)
    while (unvisited.length > 0) {
        let bestIdx = 0;
        let bestDist = getHaversine(currentPt, unvisited[0]);
        let bestCost = bestDist * rate;

        for (let i = 1; i < unvisited.length; i++) {
            let d = getHaversine(currentPt, unvisited[i]);
            let currentCost = d * rate;
            // Compare city cost - pick cheapest next step
            if (currentCost < bestCost) {
                bestCost = currentCost;
                bestDist = d;
                bestIdx = i;
            }
        }

        const next = unvisited.splice(bestIdx, 1)[0];
        totalKm += bestDist;

        html += `
            <div class="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm hover:border-indigo-300 transition">
                <div>
                    <h4 class="font-bold text-slate-800">${next.name}</h4>
                    <p class="text-[11px] font-mono text-slate-500 mt-1 bg-white inline-block px-2 py-1 rounded border">
                        ${formatGPS(next.lat, next.lon)}
                    </p>
                </div>
                <div class="text-right">
                    <span class="text-emerald-600 font-bold">+₹ ${bestCost.toFixed(2)}</span>
                    <p class="text-[10px] text-slate-400 font-bold uppercase">${bestDist.toFixed(1)} km</p>
                </div>
            </div>
        `;
        currentPt = next;
    }

    totalKm += getHaversine(currentPt, startPt);

    // Update UI
    document.getElementById('itineraryContainer').innerHTML = html;
    document.getElementById('totalDist').innerText = `${totalKm.toFixed(2)} km`;
    document.getElementById('totalCost').innerText = `₹ ${(totalKm * rate).toLocaleString('en-IN', {minimumFractionDigits: 2})}`;

    // Complexity Analysis Logic
    document.getElementById('complexityBox').classList.remove('hidden');
    document.getElementById('complexityTime').innerText = `Time Complexity: O(n²) | Operations: ~${(n * n)} comparisons`;
    document.getElementById('complexitySpace').innerText = `Space Complexity: O(n) | Storing ${n} location objects`;
}

document.getElementById('clearAllBtn').addEventListener('click', () => {
    locations = [];
    document.getElementById('complexityBox').classList.add('hidden');
    document.getElementById('itineraryContainer').innerHTML = "";
    document.getElementById('totalDist').innerText = "0 km";
    document.getElementById('totalCost').innerText = "₹ 0.00";
});