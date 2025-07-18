from sklearn.ensemble import RandomForestRegressor
import numpy as np
import pandas as pd

def generate_data(n_samples=1000):
    np.random.seed(42)
    data = {
        "humidity": np.random.uniform(40, 100, n_samples),
        "pressure": np.random.uniform(1000, 1025, n_samples),
        "wind_direction": np.random.uniform(0, 360, n_samples),
        "solar_radiation": np.random.uniform(0, 800, n_samples),
        "prev_wave_height": np.random.uniform(0.5, 3.0, n_samples),
        "prev_wind_speed": np.random.uniform(5, 30, n_samples),
        "prev_temp": np.random.uniform(15, 35, n_samples),
        "system_cpu_usage": np.random.uniform(30, 95, n_samples),
    }

    df = pd.DataFrame(data)
    df["wave_height"] = df["prev_wave_height"] + np.random.normal(0, 0.3, n_samples)
    df["wind_speed"] = df["prev_wind_speed"] + np.random.normal(0, 2.0, n_samples)
    df["temperature"] = df["prev_temp"] + np.random.normal(0, 1.5, n_samples)
    df["system_load"] = df["system_cpu_usage"] + np.random.normal(0, 6.0, n_samples)

    return df

def train_all_models():
    df = generate_data()
    features = df[[
        "humidity", "pressure", "wind_direction", "solar_radiation",
        "prev_wave_height", "prev_wind_speed", "prev_temp", "system_cpu_usage"
    ]]
    targets = ["wave_height", "wind_speed", "temperature", "system_load"]

    models = {}
    for target in targets:
        model = RandomForestRegressor()
        model.fit(features, df[target])
        models[target] = model

    return models
