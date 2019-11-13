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
