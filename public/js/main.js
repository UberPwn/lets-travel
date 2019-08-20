let callMeForm = document.querySelector('.call-me-form');
let emailForm = document.querySelector('.email-form');



emailForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let emailName = emailForm.querySelector('#name');
    let emailEmail = emailForm.querySelector('#email');
    let emailMessage = emailForm.querySelector('#message');
    fetch('http://localhost:3000/emails', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            name : emailName.value,
            email : emailEmail.value,
            message : emailMessage.value
        })
    }).then((resp) => resp.text())
})


callMeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let phoneInp = callMeForm.querySelector('input');
    fetch('http://localhost:3000/callback-requests', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            phoneNumber : phoneInp.value
        })
    }).then((resp) => resp.text())
      .then( () =>  {
          phoneInp.value = '';
          alert('We will call you as soon as possible!');
      })
})

document.addEventListener('DOMContentLoaded' , async function () {
    let posts = await getPosts();
    let articles = document.querySelector('.articles');
    articles.innerHTML = '';
    posts.forEach((post) => {

        let postHTML = `
    <div class="col-4">
        <div class="card">
            <img src="${post.imageURL}" alt="${post.title}" class="card-img-top">
            <div class="card-body">
                <h4 class="card-title">${post.title}</h4>
                <p class="card-text">${post.description}</p>
                <a href="/sight?id=${post.id}" class="btn btn-primary">Details</a>
            </div>
        </div>
   </div>`;
    articles.insertAdjacentHTML('beforeend',postHTML);
    } )
})