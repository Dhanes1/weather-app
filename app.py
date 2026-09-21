from flask import Flask, render_template, request, jsonify
import requests
app = Flask(__name__)
api_key ="5525cdae91c7ab504312c94fb759d89c"
api_url="https://api.openweathermap.org/data/2.5/weather"
@app.route('/')
def home():
    return render_template("index.html")
@app.route('/weather', methods=['POST'])
def get_weather():
    city = request.json.get('city')
    if not city:
        return jsonify({'error': 'City name is required'}), 400
    try:
        params={
            'q': city,
            'appid': api_key,
            'units': 'metric'
        }
        response = requests.get(api_url, params=params)
        if response.status_code == 200:
            data=response.json()
            weather_info={
                'city': [data['name']],
                'country': [data['sys']['country']],
                'temperature': [data['main']['temp']],
                "feels_like": [data['main']['feels_like']],
                "temp_min": [data['main']['temp_min']],
                "temp_max": [data['main']['temp_max']],
                "humidity": [data['main']['humidity']],
                'pressure': [data['main']['pressure']],
                'wind_speed': [data['wind']['speed']],
                'description': [data['weather'][0]['description']],
                'icon': [data['weather'][0]['icon']],
                'cloudiness': [data['clouds']['all']],
                'visibility': [data['visibility']/1000]  # Convert to kilometers
            }
            print(weather_info)
            return jsonify(weather_info),200
        elif response.status_code == 401:
            return jsonify({'error': 'Invalid API key'}), 401
        elif response.status_code == 404:
            return jsonify({'error': 'City not found'}), 404
        else:
            return jsonify({'error': 'Failed to retrieve weather data'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)