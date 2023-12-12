// Definizione degli oggetti pianta
let url = ''
fetch('https://striveschool-api.herokuapp.com/api/product/', {
  method: 'GET',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4YmQ2YzI2NzYxNDAwMTgzYzQwNzMiLCJpYXQiOjE3MDI0MTE2MjgsImV4cCI6MTcwMzYyMTIyOH0.irG3lEPL2Hi7COi3T7ZNF-chmgWFgEXui0TNn0oPgmk'
  }
})
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(error => console.log(error))


let plant1 = {
    name: "Monstera Deliciosa",
    description: "Large, leafy indoor plant with unique splits and holes",
    species: "Monstera Deliciosa",
    imageUrl: "https://example.com/monstera.jpg",
    price: 35
  };
  
  let plant2 = {
    name: "Fiddle Leaf Fig",
    description: "Tall, upright indoor plant with violin-shaped leaves",
    species: "Ficus lyrata",
    imageUrl: "https://example.com/fiddleleaffig.jpg",
    price: 45
  };
  
  let plant3 = {
    name: "Snake Plant",
    description: "Hardy, upright plant with tall, variegated leaves",
    species: "Sansevieria trifasciata",
    imageUrl: "https://example.com/snakeplant.jpg",
    price: 25
  };
  
  let plant4 = {
    name: "Peace Lily",
    description: "Graceful indoor plant with white, lily-like flowers",
    species: "Spathiphyllum",
    imageUrl: "https://example.com/peacelily.jpg",
    price: 30
  };
  
  let plant5 = {
    name: "ZZ Plant",
    description: "Low-maintenance indoor plant with glossy, dark green leaves",
    species: "Zamioculcas zamiifolia",
    imageUrl: "https://example.com/zzplant.jpg",
    price: 28
  };
  
  let plant6 = {
    name: "Spider Plant",
    description: "Hanging indoor plant with arching leaves and small offsets",
    species: "Chlorophytum comosum",
    imageUrl: "https://example.com/spiderplant.jpg",
    price: 22
  };
  

  