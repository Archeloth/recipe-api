# recipe-api
### This is my first API and back-end attempt.
Is an open source public (REST-CRUD) API, hosted on Heroku and connected to a Mongo database through Atlas.
It returns a Json object with a few parameters.

These parameters are: _id, owner (Who uploaded the recipe), name, ingredients (a list of items), creationDate

The id, owner and creationDate is not required, they have default values if something is missing.

### Queries
Get all data: (GET) https://public-recepy-api.herokuapp.com/recepts/

Get one specific: (GET) https://public-recepy-api.herokuapp.com/recepts/:ID

Search for a name: (GET) https://public-recepy-api.herokuapp.com/recepts/search/:Searched

Create a new recipe: (POST) https://public-recepy-api.herokuapp.com/recepts/ with specific fields.

Update one: (PATCH) https://public-recepy-api.herokuapp.com/recepts/:ID

Delete one: (DELETE) https://public-recepy-api.herokuapp.com/recepts/:ID
