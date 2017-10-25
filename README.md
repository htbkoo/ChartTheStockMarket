# README #

* This is the repository of hey-chart-the-stock-market, a full stack JavaScript app that can allow user to add/remove stocks and to chart those stocks 
* This project is part of my implementation to the projects in [freeCodeCamp](https://www.freecodecamp.org/challenges/chart-the-stock-market).
* An instance is deployed to heroku: https://hey-chart-the-stock-market.herokuapp.com/ 
* The swagger-documentation for the server-side api is available here: https://hey-chart-the-stock-market.herokuapp.com/docs
* There are two modules in this project
    * the Server part ([/](https://github.com/htbkoo/ChartTheStockMarket))
    * the UI part ([/views/chart-the-stock-market-ui](https://github.com/htbkoo/ChartTheStockMarket/tree/master/views/chart-the-stock-market-ui))

### What is this repository for? (Work in progress) ###

* hey-chart-the-stock-market
* API available as swagger-ui at [/docs](https://hey-chart-the-stock-market.herokuapp.com/docs) page

### How do I get set up? ###

* Summary of set up:
    * Server: "npm install" to download dependencies and the API would be ready. 
        * However the index page would depend on the UI part - otherwise, currently HTTP 404 would be returned.
    * ui: it is a create-react-app project so "npm install" to download dependencies and then follow the [setup instructions for create-react-app](https://github.com/facebookincubator/create-react-app).
* Configuration:
    * update api/swagger/swagger.yaml (hint: "npm run swagger-edit")
    * the API and API docs would be updated automatically
    * update [.env](https://github.com/htbkoo/ChartTheStockMarket/blob/master/.env) file or pass in environment arguments for environment config
* Dependencies: Listed at package.json
* Database configuration: N/A
* How to run tests: "npm run test" (coming soon)
* Deployment instructions:
    * For heorku:
        1. Typical nodejs application deployment steps
        2. 2 process env variables config needed:
            * SWAGGER_HOST (set to your host name)
            * SWAGGER_REQUIRES_PORT (set to false)
* How to start:
    * server: "npm run start"
    * ui: see [README for ui](https://github.com/htbkoo/ChartTheStockMarket/tree/master/views/chart-the-stock-market-ui)
    * both: "npm run rebuild-run"

### Contribution guidelines ###

* Writing tests: N/A
* Code review: N/A
* Other guidelines: N/A

### Who do I talk to? ###

* Repo owner or admin: me (htbkoo)
* Other community or team contact: N/A
