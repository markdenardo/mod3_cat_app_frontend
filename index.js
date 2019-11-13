// ------------------------------------------------------------------------------------------------------------------------------------------
//
//   READ
//
//   -a user is able to see all of the cats fetch (GET) to JSON api DONE
//
//   -all the cat-cards will be shown in the 'cat-collection' div DONE
//
//   -each cat-card will display the name, owner, image, and number of likes in the 'cat-collection' div DONE
//
//   -a user is able to see all the cats owned by a single user (stretch) DONE
//
// ------------------------------------------------------------------------------------------------------------------------------------------

let catCollectionDiv = document.querySelector('#cat-collection');
let container = document.querySelector(".container");

function getCats(){
  return fetch("http://localhost:3000/cats")
  .then( res => res.json() )
}

function renderCats(cat){
  //create card elements
  let newDiv = document.createElement('div')
  let h1 = document.createElement('h1')
  let img = document.createElement('img')
  let button = document.createElement('button')
  let h3 = document.createElement('h3')
  // delete
  // let deleteButton = document.createElement('button')

  // CSS Class
  newDiv.id = "newDiv"
  img.className = "img"

  //assignment of an id to each element, followed by an innerText assignment of the data from the fetch to localhost:3000/cats
  h1.id = `${cat.id}`
  h1.innerText = `${cat.name}`

  img.id = `${cat.id}`
  img.src = `${cat.url}`

  button.id = `${cat.id}`
  button.innerText = `Likes :${cat.likes}`

  h3.id = `${cat.id}`
  h3.innerText = `owner of ${cat.user.name}`

  //the append, first to newDiv, then to catCollectionDiv; all the tags get shovelled in this way into newDiv
  newDiv.append(h1, img, button, h3)
  // add deleteButton into the above list
  catCollectionDiv.append(newDiv)

  // deleteButton.addEventListener("click", () => {
    // add delete function with fetch here
// })

  button.addEventListener('click', (e) => {

console.log("hello")
    like(cat, e);
  });
}

// ------------------------------------------------------------------------------------------------------------------------------------------
// CREATE
//
// -a user is able to make a new instance of a cat which will persist on the page fetched (POST) to the postgresql database
//
// -the create form is an html form on the index.html page eventListener('submit')
//
// -the image is a fetch request from the Cat API (GET) fetch to (https://docs.thecatapi.com/)
//
// -the new cat will be added to the DOM in the 'cat-collection' div
//
// -when the submit form is clicked(eventListener), the POST fetch is made to the 'localhost:3000' API
//
// ------------------------------------------------------------------------------------------------------------------------------------------

// Time to POST
function postCat(){
  let form = document.createElement('form')
  container.append(form)
  form.innerHTML =
     `
      <h3>GET a Cat!</h3>
      <input type="text"  name="name" value="" placeholder="Enter a User name..." class="input-text">
      <input type="text"  name="catname" value="" placeholder="Enter a Cat name..." class="input-text">
      <input type="text"  name="url" value="" placeholder="Enter a Cat image url..." class="input-text">
      <br>
      <br>
      <input type="submit" name="submit" value="Create New Cat" class="submit">
    `
    // add event listener
  form.addEventListener("submit", (event) => {
    event.preventDefault()
    console.log("hello")
    console.log(event.target)
    // pulls the input from user and assings it to variables
    let user = event.target.name.value // user name
    let cat = event.target.catname.value // cat name
    let caturl = event.target.url.value // cat url

    // fetch to Create a new user in the database
    fetch('http://localhost:3000/users',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": user
      })
    })
    .then(r => r.json())
    .then(userObj => {
      // returns a new User obj
      // pass the new User, cat name input, the cat url input
      makeCat(userObj, cat, caturl)
    })
  })
}

// fetch to create a new cat in the db
function makeCat(user, cat, caturl) {
  fetch('http://localhost:3000/cats', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": cat,
      "url": caturl,
      "likes": 10,
      'user_id': user.id
    })
  })
  .then( res => res.json())
  .then( catObj =>{
    console.log(catObj)
    renderCats(catObj);
  })
}
//------------------------------------------------------------------------------------------------------------------------------------------
//
//   UPDATE
//
//   -a user is able to increase the number of like of any cat (PATCH) fetch to 'localhost:3000' JSON api
//
//------------------------------------------------------------------------------------------------------------------------------------------

// Time to PATCH
function like(cat, event

    let addLike = parseInt(event.target.innerText.slice(7)) + 1;
  // let id = cat.target.previousElementSibling.id

  // REMEMBER: When posting and patching, fetch takes 2 arguments.
  // the URL and an object {}
  fetch(`http://localhost:3000/cats/${event.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": addLike
    })
  })
  .then( res => res.json())
  .then( jsonObj =>
    event.target.innerText = `Likes: ${jsonObj.likes}`
    // cat.target.previousElementSibling.innerText = `${jsonObj.likes} likes`
  })
}

// ------------ deletet


getCats().then( cats => {
  cats.forEach(renderCats)
})

postCat()
