# Server Stats WOT :chart_with_upwards_trend:

This site provides statistics of last 48 hours online players on all available World of Tanks servers. You can also check the average number of online players in last [week](https://server-stats-wot.herokuapp.com/week) or [month](https://server-stats-wot.herokuapp.com/month) 

## Data harvesting scripts [here](https://github.com/DontEatRice/wot-server-stats-harvester)

## How does it work:interrobang: 
Client-side [javaScript](https://github.com/DontEatRice/Server-Stats-WOT/tree/master/public/javascripts) is making GET request to [API](https://github.com/DontEatRice/Server-Stats-WOT/blob/master/routes/api.js) for data and then it generates the [Chart.js](https://www.chartjs.org/) charts
## Run code!
1. Create `.env` file that looks like this :heavy_check_mark:
    ```Text
    DB_LINK=<mongoDB connection string>
    APP_ID=<your WG API ID>
    ``` 
    [WG API](https://developers.wargaming.net/#)
2. Install modules using npm :heavy_check_mark:
    ```Bash
    npm install
    ```
3. Run script! :heavy_check_mark:
    ```Bash
    node .\bin\www
    ```
