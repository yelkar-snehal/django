from django.shortcuts import render
from django.http import HttpResponse

import joblib
from sklearn.neighbors import KNeighborsClassifier as KNN
from sklearn.model_selection import train_test_split
import numpy as np

# Load dataset
from sklearn.datasets import load_iris

from django.views.decorators.csrf import csrf_exempt, csrf_protect

# Create your views here.


def home(request):
    train()
    return render(request, 'train.html')

# method to train the model


def train():

    iris = load_iris()

    X = iris.data
    y = iris.target

    # Split dataset into train and test
    # X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)

    # import KNeighborsClassifier model
    knn = KNN(n_neighbors=3)

    # train model
    knn.fit(X, y)

    # Save the model as a pickle in a file
    joblib.dump(knn, 'ml_model.pkl')


@csrf_exempt
def predict(request):

    print(request.POST)
    if request.method == 'POST':

        sepal_length = request.POST['slength']
        sepal_width = request.POST['swidth']
        petal_length = request.POST['plength']
        petal_width = request.POST['pwidth']

        # Load the model from the file
        knn_from_joblib = joblib.load('ml_model.pkl')

        # Use the loaded model to make predictions
        result = knn_from_joblib.predict(
            [[sepal_length, sepal_width, petal_length, petal_width]])

        return render(request, 'result.html', {'result': result})
