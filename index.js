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
  newDiv.id = "newDiv"    // CSS Class

  let h1 = document.createElement('h1')

  let img = document.createElement('img')
  img.className = "img"    // CSS Class
  let button = document.createElement('button')
  let h3 = document.createElement('h3')


  h1.id = `${cat.id}`
  h1.innerText = `${cat.name}`

  img.id = `${cat.id}`
  img.src = `${cat.url}`

  button.id = `${cat.id}`
  button.innerText = `Likes :${cat.likes}`

  h3.id = `${cat.id}`
  h3.innerText = `owner of ${cat.user.name}`

newDiv.append(h1, img, button, h3)
catCollectionDiv.append(newDiv)
}


// Time to POST
function postCat(cat){
  let form = document.createElement('form')
  container.append(form)

form.innerHTML =
   `
    <h3>GET a Cat!</h3>
    <input type="text"  name="user-name" value="" placeholder="Enter a User name..." class="input-text">
    <input type="text"  name="cat-name" value="" placeholder="Enter a Cat image url..." class="input-text">
    <br>
    <br>
    <input type="submit" name="submit" value="Create New Cat" class="submit">
  `
  // add event listener
  form.addEventListener

  fetch('http://localhost:3000/cats', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": cat.name.value,
      "url": cat.url.value,
      "likes": 10,
      "user": user.name.value
    })
  })
  .then( res => res.json())
  .then( catObj =>{
    renderCats(catObj);
  })
}








getCats().then( cats => {
  cats.forEach(renderCats)
})
