import os
import requests

from dotenv import load_dotenv

load_dotenv()

def advanced_search(query: str, queryType: str, cursor: str) -> dict:
    """Search for related tweets.

    Args:
        query (str): The query to search for example, "AI" OR "Twitter".
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

def get_trends():
    """Retrieves the current weather report for a specified city.

    Args:
        None.

    Returns:
        The list of trends.
    """
    print(f"--- Tool: get trends ---") # Log tool execution
    url = "https://api.twitterapi.io/twitter/trends"

    # Use the default woeid as US.
    querystring = {"woeid":"23424977"}

    # Build the header with api key.
    x_api_key = os.getenv("X_API_KEY")
    if not x_api_key:
        return {"statue": "Error", "message": "X_API_KEY not specified"}
    headers = {"X-API-Key": x_api_key}

    response = requests.request("GET", url, headers=headers, params=querystring)

    print(response.text)

    return response.text

def get_user_posts(userId: str, cursor: str):
    """Retrieves the current weather report for a specified city.

    Args:
        userId (str): The user id that we want to retrieve the posts from.
        cursor (str): The cursor to paginate through the results. Default is "".

    Returns:
        tweets object[]: The content of the tweet.
        has_next_page boolean: Whether there is a next page. (Every page has 20 tweets)
        cursor str: Cursor for fetching the next page of results.
    """
    url = "https://api.twitterapi.io/twitter/tweet/advanced_search"

    # Build the header with api key.
    x_api_key = os.getenv("X_API_KEY")
    if not x_api_key:
        return {"statue": "Error", "message": "X_API_KEY not specified"}
    headers = {"X-API-Key": x_api_key}

    # Build the query string.
    querystring = {
        "query": f"from:{userId}",
        "queryType": "Latest",
        "cursor": cursor
    }

    # Get response from server.
    response = requests.request("GET", url, headers=headers, params=querystring)

    return response.text