# ✈️ TravelScope

> Discover the world! Click, search, and explore real weather, famous places, and travel insights for any location—instantly.

---

## 🌍 Overview

**TravelScope** is a Python Flask web application featuring:
- A zoomable, interactive world map (Leaflet + OpenStreetMap)
- Click or search any place to instantly see:
  - Current weather & 4-day forecast (Open-Meteo API)
  - Real nearby attractions (Geoapify Places API)
  - Brief Wikipedia-sourced highlight for top local sights
- Dynamic, animated UI themed by weather and temperature
- Polished responsive design with travel branding

Perfect for: Travelers, students, demo portfolios, or anyone curious about the world!

---

## 🚀 Features

- **Live World Map:** Pan, zoom, and click any spot on earth
- **Search Bar:** Find any city or landmark by name—auto-zoom and auto-info
- **Weather Data:** See live temperature, weather conditions, and forecasts
- **Travel Places:** Real famous and must-see nearby places via open Places API
- **Descriptions:** Brief Wikipedia travel summaries for top sights
- **Theming:** Animated backgrounds/colors match weather & temperature
- **Mobile-Friendly:** Works on desktop, tablet, or phone
- **Easy Deploy:** Free hosting support for Render, Replit, and PythonAnywhere
- **No credit card needed** for map and place APIs

---

## 🛠️ Technologies

- **Backend:** Flask, Python 3.x
- **Frontend:** Leaflet.js, HTML, CSS, JavaScript
- **APIs:** Open-Meteo (weather), Geoapify (famous places), Wikipedia REST API (descriptions)
- **Map Tiles:** OpenStreetMap

---

## 🖼️ Quick Demo

<!-- You can add your own screenshot below. Example: -->
<!-- ![TravelScope Screenshot](static/screenshot.png) -->
![Plane Logo](https://img.icons8.com/color/96/airplane-take-off.png)

---

## 🔧 Setup & Installation

1. **Clone the repository:**
    ```
    git clone https://github.com/your-username/travelscope.git
    cd travelscope
    ```

2. **Set up a Python virtual environment:**
    ```
    python -m venv venv
    source venv/bin/activate      # On Windows: venv\Scripts\activate
    ```

3. **Install requirements:**
    ```
    pip install -r requirements.txt
    ```

4. **[Geoapify API Key](https://my.geoapify.com/):**
   - Register your free key and set in `app.py` as a variable or via env var.

5. **Run the app locally:**
    ```
    python app.py
    ```
    Visit [http://localhost:5000](http://localhost:5000) in your browser.

---

## 💡 Deployment

- Push your code to GitHub.
- On [Render.com](https://render.com/), create a “Web Service” from your repo.
- Ensure your `app.py` ends with:
    ```
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
    ```
- Add your Geoapify key as a Render environment variable.
- Other good options: [Replit](https://replit.com/), [PythonAnywhere](https://www.pythonanywhere.com/)

---

## 🚦 Usage

- **Click** any location, or **search** for a city or landmark name.
- Instantly see city/country, weather, real famous places, and a description.
- Enjoy animated colors based on real climate!

---

## 📦 File Structure

travelscope/
│
├── app.py
├── requirements.txt
├── static/
│ ├── style.css
│ ├── map.js
│ └── favicon.png
├── templates/
│ └── index.html
├── README.md



---

## 🚩 API Keys & Notes

- **Geoapify:** Required for famous places (see `get_famous_places` in `app.py`)
- **Open-Meteo & Wikipedia:** No key required!
- Deploy/public repos: Never expose private keys.

---

## 📄 License

MIT License

---

## 🙏 Credits

- [Leaflet.js](https://leafletjs.com/)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [Geoapify](https://www.geoapify.com/)
- [Open-Meteo](https://open-meteo.com/)
- [Wikipedia REST API](https://en.wikipedia.org/api/rest_v1/)
- Icons by [Icons8](https://icons8.com/)

---

## 👤 Author
Yashvi Khare

---

## ✨ Contributions

Feel free to fork, open issues, or submit pull requests—pulling the world closer, one click at a time!
