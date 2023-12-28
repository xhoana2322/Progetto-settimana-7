/*fetch("https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/", {
headers: {
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NDMxMGMwNTgzNTAwMTg1MjMxOWYiLCJpYXQiOjE3MDI0NjQyNzUsImV4cCI6MTcwMzY3Mzg3NX0.bJV3SfNb1WlfJHXHPGIP0z04W9bu8aia69BAScOKEoM"
}
})
  .then((response) => response.json())
  .then((obj) => {
    console.log(obj);
    
  })
  .catch((error) => console.log("Error!! " + error)); */

// caricamento della pagina
  document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('back-office.html')) {
        addProduct();
        fetchProducts();
        createProductCard();
    } else if (window.location.pathname.includes('index.html')) {
        fetchDataAndAppend();
        buttonBackOffice();
        getProductById();
        
    } else if (window.location.pathname.includes('dettaglio.html')) {
        let params = new URLSearchParams(document.location.search);
        let id = params.get("id");
        search = params.get("search");
        getProductById(id);
    }
});


// prendiamo i dati 
async function fetchDataAndAppend() {
   await fetch('https://striveschool-api.herokuapp.com/api/product/', {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThkNTZlZTkyNWU0NjAwMThmZDFiMGUiLCJpYXQiOjE3MDM3NjE2NDYsImV4cCI6MTcwNDk3MTI0Nn0.Frq26jaUPufu4yLB3btliUcHdxqidmryN61T1SpW6Vw"
        }
    })
    .then(response => response.json())
    .then(products => {
        appendDataToIndex(products);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

// appendiamo i dati presi sopra alla card
function appendDataToIndex(products) {
    let cardContainer = document.querySelector('#sentCardContainer');
    cardContainer.innerHTML = '';

    products.forEach(product => {
        let card = createCardIndex(product);
        cardContainer.appendChild(card);
    });
}

// funzione per form 
 function addProduct() {
    // console.log('addProduct() function called');
    let button = document.querySelector('.backOfficeIntro #btn');
    // if (button) {
        button.addEventListener('click', () => {
            let form = document.createElement('form');
                
            form.innerHTML = `
                <div class="mt-2">
                    <label for="text1" class="form-label">Add name</label>
                    <input type="text" class="form-control" id="text1">
                </div>
                <div class="">
                    <label for="text2" class="form-label">Add description</label>
                    <input type="text" class="form-control" id="text2">
                </div>
                <div class="">
                    <label for="text3" class="form-label">Add Brand</label>
                    <input type="text" class="form-control" id="text3">
                </div>
                <div class="">
                    <label for="text4" class="form-label">Add image</label>
                    <input type="text" class="form-control" id="text4">
                </div>
                <div class="">
                    <label for="text5" class="form-label">Add price</label>
                    <input type="text" class="form-control" id="text5">
                </div>
                <button type="submit" id='submit' class="btn btn-primary mt-3">Submit</button>`;

            let formInput = document.querySelector('#formInput');
            formInput.appendChild(form);

            form.addEventListener('submit', async function(e){
                e.preventDefault();

                let name = document.querySelector('#text1').value;
                let description = document.querySelector('#text2').value;
                let brand = document.querySelector('#text3').value;
                let imageUrl = document.querySelector('#text4').value;
                let price = document.querySelector('#text5').value;

                let data = {
                    "name": name,
                    "description": description,
                    "price": price,
                    "imageUrl": imageUrl,
                    "brand": brand
                }; 

                await fetch('https://striveschool-api.herokuapp.com/api/product/', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThkNTZlZTkyNWU0NjAwMThmZDFiMGUiLCJpYXQiOjE3MDM3NjE2NDYsImV4cCI6MTcwNDk3MTI0Nn0.Frq26jaUPufu4yLB3btliUcHdxqidmryN61T1SpW6Vw"
                    },
                    body: JSON.stringify(data),
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Risposta dal server:', data);
                    clearForm();
                    form.remove();
                    fetchProducts();
                })
                .catch((error) => {
                    console.error('Errore durante la richiesta:', error);
                });
            });
        });
    // }
}


// funzione per prendere i prodotti
async function fetchProducts() {
    await fetch('https://striveschool-api.herokuapp.com/api/product/', {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThkNTZlZTkyNWU0NjAwMThmZDFiMGUiLCJpYXQiOjE3MDM3NjE2NDYsImV4cCI6MTcwNDk3MTI0Nn0.Frq26jaUPufu4yLB3btliUcHdxqidmryN61T1SpW6Vw"
        },
    })
    .then(response => response.json())
    .then(products => {
        displayProducts(products);
    })
    .catch(error => {
        console.error('Errore durante la richiesta GET:', error);
    });
}


//funzione per la visibilità dei prodotti sulla homepage
function displayProducts(products) {
    let cardContainer = document.querySelector('#cardContainer');
    cardContainer.innerHTML = '';

    products.forEach(product => {
        let card = createProductCard(product);
        cardContainer.appendChild(card);
    });
}

//funzione per la creazione delle card su JS per il backoffice ?
function createProductCard(product) {
   let submitBtn = document.querySelector('form #submit');
   console.log(submitBtn)
    submitBtn.addEventListener('click', () => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
                <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                <div class="card-body d-flex flex-column">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text">$${product.price}</p>
                <p class="card-text">${product.brand}</p>
                <button class="btn btn-primary delete-btn">Edit</button>
                <button class="btn btn-success send-btn my-2">Public</button>
                <button class="btn btn-danger delete-btn">Delete</button>
            </div>`;


    let deleteButton = card.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
        deleteProduct(product._id);
    });
   
    let sendButton = card.querySelector('.send-btn');
    sendButton.addEventListener('click', () => {
        sendProductToHomepage(product);
    });

    return card;
    })
}


// funzione per creare card nell'html
function createCardIndex(product) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <a href="dettaglio.html">
            <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
        </a>
        <div class="card-body text-center d-flex flex-column justify-content-center">
            <h5 class="card-title fs-4"> ${product.name}</h5>
            <p class="card-text fs-5"> ${product.description}</p>
            <p class="card-text fs-5">$${product.price}</p>
            <p class="card-text">${product.brand}</p>
            <button class="btn btn-success send-btn">Description</button>
        </div>`;
        
        return card;
}

function sendProductToHomepage(product) {
    // Costruisci l'URL con i parametri della card, incluso l'URL dell'immagine
    const url = `index.html?name=${encodeURIComponent(product.name)}&description=${encodeURIComponent(product.description)}&price=${encodeURIComponent(product.price)}&brand=${encodeURIComponent(product.brand)}&imageUrl=${encodeURIComponent(product.imageUrl)}`;

    // Naviga alla pagina index con l'URL costruito
    window.location.href = url;
}





    async function deleteProduct(productId) {
       await fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThkNTZlZTkyNWU0NjAwMThmZDFiMGUiLCJpYXQiOjE3MDM3NjE2NDYsImV4cCI6MTcwNDk3MTI0Nn0.Frq26jaUPufu4yLB3btliUcHdxqidmryN61T1SpW6Vw"
            }
        })
        .then(response => {
            if (response.ok) {
                // Rimuovi la card dal DOM dopo l'eliminazione
                let deletedCard = document.querySelector(`[data-product-id="${productId}"]`);
                if (deletedCard) {
                    deletedCard.remove();
                }
                fetchProducts();
            } else {
                console.error('Errore durante l\'eliminazione dell\'elemento');
            }
        })
        .catch(error => {
            console.error('Errore durante la richiesta DELETE:', error);
        });
    }

function clearForm() {
    document.querySelector('#text1').value = '';
    document.querySelector('#text2').value = '';
    document.querySelector('#text3').value = '';
    document.querySelector('#text4').value = '';
    document.querySelector('#text5').value = '';
}

function buttonBackOffice() {
    let btnBackOffice = document.querySelector('#btnBackOffice');

    btnBackOffice.addEventListener('click', () => {
        location.href = "back-office.html"
    })
}


// pagina del dettaglio
async function getProductById(id) {
    let url = `https://striveschool-api.herokuapp.com/api/product/${id}`;

    await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThkNTZlZTkyNWU0NjAwMThmZDFiMGUiLCJpYXQiOjE3MDM3NjE2NDYsImV4cCI6MTcwNDk3MTI0Nn0.Frq26jaUPufu4yLB3btliUcHdxqidmryN61T1SpW6Vw"
        }
    })
    .then(response => response.json())
    .then(json => {
        console.log(json)
    })
    .catch(error => console.log(error))
}

// FINIRE DI INSERIRE LA PAGINA DEL DETTAGLIO

function createPhotoCardDettaglio() {
    let card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <a href="dettaglio.html">
            <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
        </a>
        <div class="card-body text-center d-flex flex-column justify-content-center">
            <h5 class="card-title fs-4"> ${product.name}</h5>
            <p class="card-text fs-5"> ${product.description}</p>
            <p class="card-text fs-5">$${product.price}</p>
            <p class="card-text">${product.brand}</p>
            <button class="btn btn-success send-btn">Description</button>
        </div>`;
        
        return card;
}