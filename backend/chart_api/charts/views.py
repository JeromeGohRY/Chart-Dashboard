from django.shortcuts import render

from django.http import JsonResponse

# Candlestick Data
def candlestick_data(request):
    data = [
        { "x": "2024-09-01T00:00:00Z", "y": [100, 105, 95, 100] },
        { "x": "2024-09-02T00:00:00Z", "y": [100, 110, 100, 105] },
        { "x": "2024-09-03T00:00:00Z", "y": [105, 115, 102, 110] },
        { "x": "2024-09-04T00:00:00Z", "y": [110, 120, 108, 115] },
        { "x": "2024-09-05T00:00:00Z", "y": [115, 125, 112, 120] },
        { "x": "2024-09-06T00:00:00Z", "y": [120, 130, 118, 125] },
        { "x": "2024-09-07T00:00:00Z", "y": [125, 135, 123, 130] }
    ]
    return JsonResponse(data, safe=False)

# Line Chart Data
def line_chart_data(request):
    data = {
        "labels": ["Jan", "Feb", "Mar", "Apr"],
        "data": [10, 20, 30, 40]
    }
    return JsonResponse(data)

# Bar Chart Data
def bar_chart_data(request):
    data = {
        "labels": ["Product A", "Product B", "Product C"],
        "data": [100, 150, 200]
    }
    return JsonResponse(data)

# Pie Chart Data
def pie_chart_data(request):
    data = {
        "labels": ["Red", "Blue", "Yellow"],
        "data": [300, 50, 100]
    }
    return JsonResponse(data)
