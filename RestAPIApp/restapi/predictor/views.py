from django.shortcuts import render
from .apps import PredictorConfig
from django.http import JsonResponse
from rest_framework.views import APIView
import pandas as pd



class predict(APIView):
    def post(self, request):
        from pprint import pprint
        # pprint(vars(request))
        # if request and request.parser_context:
        #     print(request.parser_context.request)
        print(request.headers)
        pprint(vars(request.POST))
        if request.method == 'POST':
            sepal_length = request.POST['slength']
            sepal_width = request.POST['swidth']
            petal_length = request.POST['plength']
            petal_width = request.POST['pwidth']

            # Use the loaded model to make predictions
            response = PredictorConfig.data_from_joblib.predict(
                [[sepal_length, sepal_width, petal_length, petal_width]])

            # return response
            return JsonResponse(pd.Series(response).to_json(orient='values'), safe=False)
