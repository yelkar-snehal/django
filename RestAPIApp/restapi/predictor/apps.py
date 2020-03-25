from django.apps import AppConfig
from django.conf import settings
import os
import joblib


class PredictorConfig(AppConfig):
    # create path to models
    path = os.path.join(settings.MODELS, 'ml_model.pkl')

    # load models
    data_from_joblib = joblib.load(path)
