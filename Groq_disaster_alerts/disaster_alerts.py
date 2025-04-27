from flask import Flask, request, jsonify, send_file
import requests
from openai import OpenAI
from datetime import datetime

app = Flask(__name__)

# Initialize Groq client
client = OpenAI(
    api_key="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",
    base_url="https://api.groq.com/openai/v1"
)

# OpenCage API key
OPENCAGE_API_KEY = "c61fbca2ac50408a8723c6386052893b"

messages = [{"role": "system", "content": "You are a disaster response assistant."}]

def format_date(date_str):
    dt = datetime.fromisoformat(date_str.replace("Z", "+00:00"))
    return dt.strftime("%d-%m-%Y %H:%M:%S")

def get_location_name(lat, lon):
    try:
        url = f"https://api.opencagedata.com/geocode/v1/json?q={lat}+{lon}&key={OPENCAGE_API_KEY}"
        response = requests.get(url)
        data = response.json()
        if data['results']:
            return data['results'][0]['formatted']
        else:
            return "Unknown Location"
    except Exception:
        return "Unknown Location"

def get_earthquake_data():
    url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_hour.geojson"
    response = requests.get(url)
    data = response.json()
    earthquakes = data.get('features', [])
    if not earthquakes:
        return "No significant earthquakes in the last hour."

    result = ["🌍 Recent Earthquakes:"]
    for eq in earthquakes:
        prop = eq["properties"]
        coords = eq["geometry"]["coordinates"]
        lon, lat = coords[0], coords[1]
        place = get_location_name(lat, lon)
        time = datetime.utcfromtimestamp(prop["time"] / 1000).strftime("%d-%m-%Y %H:%M:%S")
        result.append(
            f"Magnitude {prop['mag']} - {prop['place']}\n"
            f"Date: {time}\n"
            f"Coordinates: (Lat: {lat}, Lon: {lon})\n"
            f"Location: {place}"
        )
    return "\n\n".join(result)

def get_disaster_data(event_type):
    url = f"https://eonet.gsfc.nasa.gov/api/v3/events?status=open&category={event_type}"
    response = requests.get(url)
    data = response.json()
    events = data.get("events", [])
    if not events:
        return f"No active {event_type.title()} alerts at the moment."

    result = [f"🔥 Active {event_type.title()} Alerts:"]
    for event in events[:5]:
        title = event["title"]
        geometry = event["geometry"][0]
        date = format_date(geometry["date"])
        coords = geometry["coordinates"]
        lon, lat = coords[0], coords[1]
        location = get_location_name(lat, lon)
        result.append(
            f"{title}\n"
            f"Date: {date}\n"
            f"Coordinates: (Lat: {lat}, Lon: {lon})\n"
            f"Location: {location}"
        )
    return "\n\n".join(result)

disaster_responses = {
    "earthquake": get_earthquake_data,
    "wildfire": lambda: get_disaster_data("wildfires"),
    "flood": lambda: get_disaster_data("floods"),
    "volcano": lambda: get_disaster_data("volcanoes"),
    "landslide": lambda: get_disaster_data("landslides"),
    "storm": lambda: get_disaster_data("severeStorms"),
    "ice": lambda: get_disaster_data("seaLakeIce"),
    "dust": lambda: get_disaster_data("dustHaze"),
    "smoke": lambda: get_disaster_data("smoke"),
    "temperature": lambda: get_disaster_data("temperatureExtremes"),
    "drought": lambda: get_disaster_data("drought"),
    "snow": lambda: get_disaster_data("snow"),
    "fog": lambda: get_disaster_data("fog"),
    "lightning": lambda: "⚡ Real-time lightning data requires a paid API."
}

@app.route('/')
def home():
    return send_file('index.html')

@app.route('/styles.css')
def serve_css():
    return send_file('styles.css')

@app.route('/script.js')
def serve_js():
    return send_file('script.js')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_input = data.get('user_input', '').lower()

    if not user_input:
        return jsonify({'reply': "Please type something!"})

    found = False
    for keyword, fetch_function in disaster_responses.items():
        if keyword in user_input:
            reply = fetch_function()
            found = True
            break

    if not found:
        messages.append({"role": "user", "content": user_input})
        response = client.chat.completions.create(
            model="llama3-70b-8192",
            messages=messages
        )
        reply = response.choices[0].message.content.strip()
        messages.append({"role": "assistant", "content": reply})

    return jsonify({'reply': reply})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
