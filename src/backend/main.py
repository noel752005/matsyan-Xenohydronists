from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from model import train_all_models
import numpy as np

app = FastAPI()
models = train_all_models()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or restrict to localhost:5173 if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SensorInput(BaseModel):
    humidity: float
    pressure: float
    wind_direction: float
    solar_radiation: float
    prev_wave_height: float
    prev_wind_speed: float
    prev_temp: float
    system_cpu_usage: float

@app.post("/predict")
def predict(input_data: SensorInput):
    features = [[
        input_data.humidity,
        input_data.pressure,
        input_data.wind_direction,
        input_data.solar_radiation,
        input_data.prev_wave_height,
        input_data.prev_wind_speed,
        input_data.prev_temp,
        input_data.system_cpu_usage
    ]]
    predictions = {
        metric: float(model.predict(features)[0])
        for metric, model in models.items()
    }
    return predictions
