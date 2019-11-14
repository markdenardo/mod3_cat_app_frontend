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

  -a user is able to increase the number of like of any cat (PATCH) fetch to 'localhost:3000' JSON api

  ------------------------------------------------------------------------------------------------------------------------------------------

  DESTROY

  -a user is able to delete a cat (stretch)

  -a user is able to delete their name (stretch)

--------------------------------------------------------------------------------------------------------------------------------------------

STEPS

1. make rails mod3_cat_app --api --database=postgresql
2. add faker gem to the gemfile and run bundle install
3. rails db:create to create mod3_cat_app_development
4. rails g resource User name
5. rails g resource Cat user_id:integer likes:integer name url
6. rails db:migrate
7.  create seeds.rb to test database
8. rails db:seed
9. rails s
10. localhost:3000/cats and localhost:3000/users to check that the back end is working
11. add routes: #get '/cats', to: 'cats#index', as: 'cats'
12. uncomment cors gemfile and run bundle install
13. uncomment cors file and add *
14.
