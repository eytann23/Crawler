# ScrapingSite

ScrapingSite is a crawler which scrape data acoording to input from the user.

## Usage

The user has to enter the following details:
1. Start URL - the url to start scraping from
2. Max depth - the maximum depth to crawl down to from the start url
3. Max total pages - the max number of pages for the entire scrape

The service will save the request details and will scrape the relevant data according to BFS algorithm.

## Future Plans
1. Check for url duplications in db
2. Validation for client side
3. Make the UI from scratch, using React
4. Better errors handling