# Review Questions

## What is Node.js?

* Builds scalable network applications. Used a lot in servers.

## What is Express?

* A framework that provides a set of features for the web/mobile with Node.js

## Mention two parts of Express that you learned about this week.

* Routing and middleware

## What is Middleware?

* Functions that have access to the error, request, response and next, objects and are executed before it gets sent to the route.

## What is a Resource?

* A resource is a file. Say we had a file userRoutes and postRoutes, they would be a resource with endpoints inside them.

## What can the API return to help clients know if a request was successful?

* A request.status() with the status code in the params.

## How can we partition our application into sub-applications?

* Using routes

## What is express.json() and why do we need it?

* express.json() is a body-parser and allows the request.body to be read to the client.
