from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from model import train_all_models
import numpy as np
from fastapi import HTTPException
from src.backend.mysql_connection import create_connection
from fastapi.responses import JSONResponse

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

@app.get("/sensor-data")
def get_sensor_data():
    connection = create_connection()
    if connection is None:
        raise HTTPException(status_code=500, detail="Database connection failed")
    try:
        cursor = connection.cursor(dictionary=True)
        # Assuming table name is 'data' and columns match SensorInput fields
        cursor.execute("""
            SELECT humidity, pressure, wind_direction, solar_radiation,
                   prev_wave_height, prev_wind_speed, prev_temp, system_cpu_usage
            FROM data
            ORDER BY id DESC
            LIMIT 1
        """)
        row = cursor.fetchone()
        cursor.close()
        connection.close()
        if row is None:
            raise HTTPException(status_code=404, detail="No sensor data found")
        return row
    except Exception as e:
        connection.close()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/predict-static")
def predict_static():
    data = {
        "wave_height": 55.0,
        "wind_speed": 101.0,
        "wind_direction": 190.0,
        "solar_radiation": 210.0,
        "prev_wave_height": 1.5,
        "prev_wind_speed": 14.0,
        "temperature": 20.0,
        "system_load": 60.0
    }
    return JSONResponse(content=data)

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
