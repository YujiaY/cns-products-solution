# Canstar Backend Test

## Task

This repository contains boilerplate code for a small Express microservice. Your task is to add code to ensure the 2 predefined routes
return the data in the expected way and pass all provided unit tests.

The `/products` route should return a list of products containing the following fields, `product_id`, `effective_from`, `effective_to`, `product_category`, `name`, `description`, and `brand`. 

The `/productDetails` route should return a single products details given a `product_id` as query parameter gained from the first route. These details should contain the following fields, `features`, `eligibility`, and `fees`.

The `products.ts` file in the `lib` directory should contain the code to retrieve and return the data as the appropriate type, while the routes found in the `routes` directory will call these functions and expose the data to be consumed via http request.

## Development

In order to run this microservice you will need [Node.js](https://nodejs.org/en/) installed locally.

Run `npm install` prior to running service for the first time.

Run `npm start` to start the dev server. Then you should be able to see it is running by checking `http://localhost:3000`.

Run `npm test` to run provided unit tests against solution.

