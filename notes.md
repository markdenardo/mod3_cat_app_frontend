
Mark's Bad Cat App

------------------------------------------------------------------------------------------------------------------------------------------

CREATE

-a user is able to make a new instance of a cat which will persist on the page fetched (POST) to the postgresql database

-the create form is an html form on the index.html page fetch (GET)

-the image is a fetch request from the Cat API (GET) fetch to (https://docs.thecatapi.com/) 

-read the documentation on the Cat API to get fetch, header, and body protocol

-the new cat will be added to the DOM in the 'cat-collection' div

-when the submit form is clicked(eventListener), the fetch POST is made to the 'localhost:3000' API

------------------------------------------------------------------------------------------------------------------------------------------

READ

-a user is able to see all of the cats fetch (GET) to 'localhost:3000' JSON api

-all the cat-cards will be shown in the 'cat-collection' div

-each cat-card will display the name, owner, image, and number of likes in the 'cat-collection' div

-a user is able to see all the cats owned by a single user (stretch)

------------------------------------------------------------------------------------------------------------------------------------------

UPDATE

-a user is able to update the name of their cat (PATCH) fetch to 'localhost:3000' JSON api

------------------------------------------------------------------------------------------------------------------------------------------

DESTROY

-a user is able to delete a cat

-a user is able to delete their name

------------------------------------------------------------------------------------------------------------------------------------------
