//---------------------------------------------------------------------------------------------------------------------------------
// Selecting things from the HTML page to call them inside my DOM JS
//---------------------------------------------------------------------------------------------------------------------------------


let catCollectionDiv = document.querySelector('#cat-collection');
let container = document.querySelector(".container");






//---------------------------------------------------------------------------------------------------------------------------------
// Fetch Cats from the rails API || getCats : is where my function fetches the API
//---------------------------------------------------------------------------------------------------------------------------------


function getCats(){
  return fetch("http://localhost:3000/cats")
  .then( res => res.json() )
}





//---------------------------------------------------------------------------------------------------------------------------------
// Rendering fetch API to the DOM || renderCats is where my function creates the element tags, and assigns the values to them
//---------------------------------------------------------------------------------------------------------------------------------


function renderCats(cat){

  //create card elements

  let newDiv = document.createElement('div')
  let h1 = document.createElement('h1')
  let img = document.createElement('img')
  let button = document.createElement('button')
  let bigButton = document.createElement('button')
  let h3 = document.createElement('h3')
  let deleteButton = document.createElement('button')






// assign values to my card elements


  newDiv.id = `${cat.id}`  // In case I wanted to remove the whole cat div later
  newDiv.className = 'css_styling_div'
  img.className = "img"    // CSS purpose


  h1.id = `${cat.id}`
  h1.innerText = `${cat.name}`


  img.id = `${cat.id}`
  img.src = `${cat.url}`

  button.id = `${cat.id}`
  button.innerText = `Likes: ${cat.likes}`

  bigButton.id = `${cat.id}`
  bigButton.innerText = `make ${cat.name} uppercase`  // uppercase the cats name once the button uppercase is clicked

  h3.id = `${cat.id}`
  h3.innerText = `owner of ${cat.user.name}`

  deleteButton.id = `${cat.id}`
  deleteButton.innerText = `delete`


  //the append, first to newDiv, then to catCollectionDiv; all the tags get shovelled in this way into newDiv
  newDiv.append(h1, img, button, h3, bigButton, deleteButton)

  // add deleteButton into the above list
  catCollectionDiv.append(newDiv)



  //---------------------------------------------------------------------------------------------------------------------------------
  // Fetch DELETE : deleting the newDiv once deleteButton is clicked
  //---------------------------------------------------------------------------------------------------------------------------------


//  Event Listener to delete my newDiv once button is clicked

  deleteButton.addEventListener('click', (e) => {

    // callBack function to delete
    deleteCat(cat, newDiv)
  })






  //  Event Listener to Uppercase my cat name once bigButton is clicked

  bigButton.addEventListener('click', (e) => {
    bigUp(cat, e, h1)
  })







  //  Event Listener to Likes update

  button.addEventListener('click', (e) => {
    like(cat, e);
  });
}




//---------------------------------------------------------------------------------------------------------------------------------
// Fetch POST : Create new cats
//---------------------------------------------------------------------------------------------------------------------------------




// Time to POST || postCat function can do the fetch POST :

function postCat(){

  // create the form <form>  </form>
  let form = document.createElement('form')
  form.className = "form_css_styling"





  // append the form variable to the parent container newDiv
  container.append(form)





  // create the form <form>...............{innerHTML}.................</form>



  form.innerHTML =

  // ...............{Begining of : innerHTML}.......................

      `<h3>GET a Cat!</h3>
      <input type="text"  name="name" value="" placeholder="Enter a User name..." class="input-text">
      <input type="text"  name="catname" value="" placeholder="Enter a Cat name..." class="input-text">
      <input type="text"  name="url" value="" placeholder="Enter a Cat image url..." class="input-text">
      <br>
      <br>
      <input type="submit" name="submit" value="Create New Cat" class="submit">`

  // ...............{End of : innerHTML}...............................









  // add event listener to the form I Created

  form.addEventListener("submit", (event) => {
    event.preventDefault();





    // pulls the input from user and assigns it to variables
    let userInput = event.target["name"].value              // whatever the user typed, get the value
    let cat = event.target.catname.value                    // cat name value
    let caturl = event.target.url.value                     // cat url




// .......1st fetch for userInput : user name in database


    // fetch to Create a new user in the database
    fetch('http://localhost:3000/users',{
      method: "POST",                         //1st Fetch POST
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": userInput
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
function makeCat(userInput, cat, caturl) {
  fetch('http://localhost:3000/cats', {
    method: "POST",                        //2nd Fetch POST
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": cat,
      "url": caturl,
      "likes": 10,
      'user_id': userInput.id
    })
  })
  .then( res => res.json())
  .then( catObj =>{
    // console.log(catObj)
    renderCats(catObj);
  })
}





//---------------------------------------------------------------------------------------------------------------------------------
// Fetch PATCH : Update Cats' Likes
//---------------------------------------------------------------------------------------------------------------------------------




// Time to PATCH
function like(cat, event){

// Slice is used to remove the string from the like button
    let addLike = parseInt(event.target.innerText.slice(7)) + 1;



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
  .then( jsonObj => {
    event.target.innerText = `Likes: ${jsonObj.likes}`
  })
}



//---------------------------------------------------------------------------------------------------------------------------------
// Uppercase the name of the cat once I click the Uppercase Button
//---------------------------------------------------------------------------------------------------------------------------------


    function bigUp(cat, event, h1){
      let makeUppercase = cat.name.toUpperCase()
      let id = cat.id

      // REMEMBER: When posting and patching, fetch takes 2 arguments.
      // the URL and an object {}

      fetch(`http://localhost:3000/cats/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "name": makeUppercase
        })
      })
      .then( res => res.json())
      .then( jsonObj => {
        h1.innerText = `${jsonObj.name}`

      })
    }


//---------------------------------------------------------------------------------------------------------------------------------
// Delete function to be called above once the Delete Button is clicked
//---------------------------------------------------------------------------------------------------------------------------------

  function deleteCat(cat, newDiv){
      return fetch(`http://localhost:3000/cats/${cat.id}`, {
        method: "DELETE"
      }) //End of Fetch
      .then(data => {
        newDiv.remove();
      })
  }



getCats().then( cats => {
  cats.forEach(renderCats)
})





//---------------------------------------------------------------------------------------------------------------------------------
// Invoking the postCat function created earlier, so it will be rendered
//---------------------------------------------------------------------------------------------------------------------------------
postCat()
