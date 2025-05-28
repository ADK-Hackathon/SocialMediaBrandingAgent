import os
import requests

from dotenv import load_dotenv

load_dotenv()

def advanced_search(query: str, queryType: str, cursor: str) -> dict:
    """Retrieves the current weather report for a specified city.

    Args:
        query (str): The query to search for example, "AI" OR "Twitter" from:elonmusk since:2021-12-31_23:59:59_UTC.
        queryType (enum<str>): The query type to search for. "Latest" OR "Top"
        cursor (str): The cursor to paginate through the results. First page is "".

    Returns:
        tweets object[]: The content of the tweet.
        has_next_page boolean: Whether there is a next page. (Every page has 20 tweets)
        cursor str: Cursor for fetching the next page of results.
    """
    print(f"--- Tool: advanced search for query: {query} ---") # Log tool execution
    
    url = "https://api.twitterapi.io/twitter/tweet/advanced_search"

    # Build the header with api key.
    x_api_key = os.getenv("X_API_KEY")
    if not x_api_key:
        return {"statue": "Error", "message": "X_API_KEY not specified"}
    headers = {"X-API-Key": x_api_key}

    # Build the query string.
    querystring = {
        "query": query,
        "queryType": queryType,
        "cursor": cursor
    }

    # Get response from server.
    response = requests.request("GET", url, headers=headers, params=querystring)

    return response.text