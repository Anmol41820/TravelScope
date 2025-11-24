from flask import Flask, render_template, request, jsonify
import requests
import os
import openai

app = Flask(__name__)

WEATHER_CODE_MAP = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Slight/Moderate thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail"
}

def reverse_geocode(lat, lng):
    url = f"https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lng}&zoom=10"
    headers = {"User-Agent": "WorldMapFlask/1.0"}
    resp = requests.get(url, headers=headers)
    address = resp.json().get('address', {})
    return {
        'country': address.get('country', 'Unknown'),
        'state': address.get('state', ''),
        'city': address.get('city', address.get('town', address.get('village', '')))
    }

def get_weather(lat, lng):
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lng}&current_weather=true"
    resp = requests.get(url)
    weather = resp.json().get('current_weather', {})
    code = weather.get('weathercode', 0)
    description = WEATHER_CODE_MAP.get(code, "Unknown")
    return {
        'temperature': weather.get('temperature', "No Data"),
        'weather_code': code,
        'weather_desc': description
    }

def get_weather_forecast(lat, lng, days=4):
    params = {
        "latitude": lat,
        "longitude": lng,
        "daily": "temperature_2m_max,temperature_2m_min,weathercode",
        "forecast_days": days,
        "timezone": "auto"
    }
    url = "https://api.open-meteo.com/v1/forecast"
    resp = requests.get(url, params=params)
    forecast = []
    if resp.ok:
        data = resp.json()
        for i in range(days):
            date = data['daily']['time'][i]
            temp_max = data['daily']['temperature_2m_max'][i]
            temp_min = data['daily']['temperature_2m_min'][i]
            weather_code = data['daily']['weathercode'][i]
            forecast.append({
                "date": date,
                "min": temp_min,
                "max": temp_max,
                "desc": WEATHER_CODE_MAP.get(weather_code, "Unknown")
            })
    return forecast


import urllib.parse
def get_wikipedia_description(place_name):
    safe_name = urllib.parse.quote(place_name.replace(' ', '_'))
    url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{safe_name}"
    headers = {'User-Agent': 'WorldExplorerMap/1.0 (your.email@example.com)'}
    resp = requests.get(url, headers=headers)
    if resp.ok:
        data = resp.json()
        return data.get("extract", "")
    return ""


def get_famous_places(lat, lng):
    api_key = "a076bed1d8f14215beeeeaeeb5d11fe8"
    url = "https://api.geoapify.com/v2/places"
    params = {
        "categories": "tourism.attraction,tourism.sights,heritage.unesco,building.historic,leisure.park,natural.mountain.peak",
        "filter": f"circle:{lng},{lat},20000",
        "limit": 3,
        "lang": "en",
        "apiKey": api_key
    }
    resp = requests.get(url, params=params)
    places = []
    desc = "Popular places to visit nearby based on real location data."
    if resp.ok:
        data = resp.json()
        for feat in data.get("features", []):
            props = feat.get("properties", {})
            name = props.get("name")
            if name:
                places.append(name)
    if places:
        desc = get_wikipedia_description(places[0])
    if not places:
        places = ["No famous places found. Try a major city or tourist area."]
    return {"desc": desc, "places": places}



@app.route('/')
def index():
    return render_template('index.html')

@app.route('/location_info', methods=['POST'])
def location_info():
    coords = request.get_json()
    lat = coords.get('lat')
    lng = coords.get('lng')
    location = reverse_geocode(lat, lng)
    weather = get_weather(lat, lng)
    forecast = get_weather_forecast(lat, lng, days=4)
    loc_query = location['city'] if location['city'] else location['country']
    # famous = get_famous_real(loc_query)
    famous = get_famous_places(lat, lng)
    return jsonify({
        "country": location['country'],
        "state": location['state'],
        "city": location['city'],
        "temperature": weather['temperature'],
        "weather_code": weather['weather_code'],
        "weather_desc": weather['weather_desc'],
        "forecast": forecast,
        "famous_for": famous['desc'],
        "nearby_places": famous['places'],
    })

@app.route('/geocode', methods=['POST'])
def geocode():
    data = request.get_json()
    place = data.get('place')
    url = "https://nominatim.openstreetmap.org/search"
    params = {
        "q": place,
        "format": "json",
        "limit": 10
    }
    headers = {"User-Agent": "WorldExplorerMap/1.0 (khareyashvi418@gmail.com)"}
    resp = requests.get(url, params=params, headers=headers)
    if resp.ok and resp.json():
        result = resp.json()[0]
        lat = float(result['lat'])
        lon = float(result['lon'])
        return jsonify({"lat": lat, "lng": lon})
    else:
        return jsonify({"error": "Location not found"}), 404


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Render sets PORT env var
    app.run(host="0.0.0.0", port=port, debug=True)

