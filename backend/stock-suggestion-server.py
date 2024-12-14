# Import Flask packages
import json
import os

from flask import Flask, request, Response
from flask_cors import CORS

# Define an instance of Flask object
app = Flask(__name__)
CORS(app, origins='http://localhost:3000')
app.config['CORS_HEADERS'] = 'Content-Type'

""" Stocks for investment strategies"""

# Replace 'YOUR_FINANCIAL_MODELING_PREP_API_KEY' with your actual API key
api_key = 'nGNYeJajsvrBRZnZ4rq1Gmj7shiF9Ytf'

## Stocks as per the intense study and survey based on the strategies
ethical_investing = ["AAPL", "TSLA", "ADBE"]
growth_investing = ["OXLC", "ECC", "AMD"]
index_investing = ["VOO", "VTI", "ILTB"]
quality_investing = ["NVDA", "MU", "CSCO"]
value_investing = ["INTC", "BABA", "GE"]

import requests

def get_stock_quote(stock_list):
    """Function that calls Financial Modeling Prep API for each stock to fetch stock details"""
    stock_quote = []

    for ticker in stock_list:
        # HTTP GET call to Financial Modeling Prep API
        resp = requests.get(f'https://financialmodelingprep.com/api/v3/quote/{ticker}?apikey={api_key}')

        # Print the URL for debugging
        print(f'Request URL for {ticker}: {resp.url}')

        # Check the status code
        if resp.status_code == 200:
            data = resp.json()

            # Check if the request was successful
            if data:
                stock_quote.append(data[0])
            else:
                print(f"Error fetching data for {ticker}: No data available")
        else:
            print(f"Error in HTTP request for {ticker}. Status code: {resp.status_code}")

    return stock_quote
@app.route('/getData', methods=['POST'])
# @cross_origin(origin='*')
def return_data():
    Strategies = request.json['Strategies']
    Amount = request.json['Amount']

    response = []
    amt1 = Amount*0.5
    amt2 = Amount*0.30
    amt3 = Amount*0.20
    responseAmount = []

    responseAmount.append(amt1)
    responseAmount.append(amt2)
    responseAmount.append(amt3)

    for x in Strategies:
        if x == "Ethical Investing":
            response.append(get_stock_quote(ethical_investing))
        elif x == "Growth Investing":
            response.append(get_stock_quote(growth_investing))
        elif x == "Index Investing":
            response.append(get_stock_quote(index_investing))
        elif x == "Quality Investing":
            response.append(get_stock_quote(quality_investing))
        elif x == "Value Investing":
            response.append(get_stock_quote(value_investing))
        else:
            response.append("Invalid Strategy")

    if Strategies is None or Amount is None:
        return jsonify({"error": "Invalid request. Strategies and Amount are required."}), 400

    # get_stock_quote(value)
    dict1 = {"strategiesResponse": response, "amountResponse": responseAmount}
    response=Response(json.dumps(dict1), mimetype='application/json')
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
