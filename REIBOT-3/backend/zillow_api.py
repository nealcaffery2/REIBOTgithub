import requests

def get_zillow_data(location, polygon=None, page=None, status_type=None, home_type=None, sort=None, minPrice=None, maxPrice=None, bathsMin=None, bathsMax=None, bedsMin=None, bedsMax=None, sqftMin=None, sqftMax=None, buildYearMin=None, buildYearMax=None, daysOn=None, soldInLast=None, isBasementFinished=None, isBasementUnfinished=None, isPendingUnderContract=None, isComingSoon=None, otherListings=None, isNewConstruction=None, keywords=None, lotSizeMin=None, lotSizeMax=None, isAuction=None, saleByAgent=None, saleByOwner=None, hasPool=None, isMountainView=None, isCityView=None, isParkView=None, isWaterView=None, isWaterfront=None):
    url = "https://zillow69.p.rapidapi.com/search"

    headers = {
        'X-RapidAPI-Key': "012231363amsh5ba1972066a1d26p10819djsnad2f682ad157",  # Replace with your RapidAPI key
        'X-RapidAPI-Host': "zillow69.p.rapidapi.com"
    }

    data = {'location': location}

    # Add optional parameters to the data dictionary
    if polygon:
        data['polygon'] = polygon
    if page:
        data['page'] = page
    if status_type:
        data['status_type'] = status_type
    # Add other optional parameters here...

    response = requests.post(url, headers=headers, data=data)
    return response.json()
