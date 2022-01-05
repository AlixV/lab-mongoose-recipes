// npm i 
// node index.js 
// nodemon index.js

// Don't forget :
const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
// My own database adress, mon compass à moi.

// Connection to the database "recipe-app"
mongoose.connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // => Connected to the database: "recipe-app" ??
    // Before adding any recipes to the database, let's remove all existing ones :
    return Recipe.deleteMany()
  })
  .then(() => {
    Recipe.create({ // CREATE cf const Recipe = mongoose.model('Recipe', recipeSchema);
      title: "Charlotte aux fraises ",
      level: "Amateur Chef",
      ingredients: [
        "1/2 cup sucre",
        "5 tablespoons honey",
        "1/3 cup vanille",
        "1/4 butter",
        "3 milk",
        "3 farine",
        "fraises",
      ],
      cuisine: "French",
      dishType: "dessert",
      image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Alix",
    })
  .then((res)=> console.log(res.title)) // => Charlotte aux fraises OK
  .catch((error)=> console.log("error",error))
  })

  .then(() => {
    Recipe.insertMany(data) // ADD many docs 
    .then( (recipeDoc) => {
      recipeDoc.forEach((recipe)=> {
        console.log(recipe.title); // => 6 recipes logués OK
      }); // No catch ??
      Recipe.findOneAndUpdate( // FIND rigatoni & UPDATE duration
        { title: 'Rigatoni alla Genovese' }, 
        { duration: 100 }, 
        {new:true}
        ).then((res)=> console.log(res)) // modif duration OK
        .catch((error)=>console.error("error",error));

        Recipe.deleteOne( // DELETE ONE
          {title: "Carrot Cake"}) 
      .then((res)=> console.log(res)) // Ai-je réussi ? NON, mais "deletedCount: 1" ?
      .catch((error)=>console.error("error",error));
      })
      
      .catch((error)=>console.error("error",error)); // que fais-tu là ? InsertMany ?
    })

    .catch(error => {
      console.error('Error connecting to the database', error);
      })
  
    
  
 



 

