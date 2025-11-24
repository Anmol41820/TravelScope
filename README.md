✈️ TravelScope
Discover the world! Click, search, and explore real weather, famous places, and travel insights for any location—instantly.

🌍 Overview
TravelScope is a Python Flask web application featuring:

A zoomable, interactive world map (Leaflet + OpenStreetMap)

Click or search any place to instantly see:

Current weather & next 4-day forecast (Open-Meteo API)

Real nearby attractions (Geoapify Places API)

Brief Wikipedia-sourced highlight for top local sights

Dynamic, animated UI themed by weather and temperature

Polished responsive design with travel branding

Perfect for: Travelers, students, demo portfolios, or anyone curious about the world!

🚀 Features
Live World Map: Pan, zoom, and click any spot on earth

Search Bar: Find any city or landmark by name—auto-zoom and auto-info

Weather Data: See live temperature, weather type, and forecasts

Travel Places: Real famous and must-see nearby places via open Places API

Descriptions: Brief Wikipedia travel summaries for top sights

Theming: Animated backgrounds/colors match weather & temperature

Mobile-Friendly: Works on desktop, tablet, or phone

Easy Deploy: Free hosting support for Render, Replit, and PythonAnywhere

No credit card needed for open map and place APIs

🛠️ Technologies
Backend: Flask, Python 3.x

Frontend: Leaflet.js, HTML, CSS, JavaScript

APIs: Open-Meteo (weather), Geoapify (famous places), Wikipedia REST API (descriptions)

Map Tiles: OpenStreetMap

🖼️ Quick Demo
![TravelScope Screenshot](https://img.icons8.com/color/96/airplane-t Setup & Installation

Clone the repository:

bash
git clone https://github.com/your-username/travelscope.git
cd travelscope
Set up (preferably) a virtual environment:

text
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate
Install requirements:

text
pip install -r requirements.txt
Geoapify API Key:

Get your free key, set in app.py as variable or via env var.

Run the app locally:

bash
python app.py
Visit http://localhost:5000.

💡 Deployment (Render)
Push your code to GitHub.

On Render.com, create a new Web Service from your repo.

Important: Your app.py should use:

python
port = int(os.environ.get("PORT", 5000))
app.run(host="0.0.0.0", port=port)
Add your Geoapify key as a Render environment variable if you don't want it hardcoded.

🚦 Usage
Click anywhere on the map, or search for a place by name.

Instantly see city/country, weather, real famous places nearby, and a one-liner description.

Experience animated theming based on local climate!

📦 File Structure
text
travelscope/
│
├── app.py
├── requirements.txt
├── static/
│   ├── style.css
│   └── map.js
├── templates/
│   └── index.html
├── static/favicon.png
└── README.md
⚡ API Keys & Notes
Geoapify: Required for famous places (get_famous_places in app.py)

Open-Meteo & Wikipedia: No key required

Deploy: Never expose private keys in public repos

📄 License
MIT License

🙏 Credits
Leaflet.js

OpenStreetMap

Geoapify**

Open-Meteo

Wikipedia REST API

Icons by Icons8

👤 Author
Your Name
LinkedIn | GitHub

✨ Contributions
Feel free to fork, open issues or submit pull requests—pulling the world closer one click at a time!
