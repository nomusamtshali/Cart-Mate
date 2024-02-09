import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
//I imported the 'getDatabase' from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
 
const appSettings = {
    databaseURL: "https://realtime-database-1ce7b-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

/* I made it so that when you click the 'add to cart' button, whatever is written in the input field should be console logged. */
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value /* I'm going to use 'inputValue' later too and it's much better to have it defined up here once. */
    
    // I'm going to use the Firebase function 'push' to push inputValue to the database
    push(shoppingListInDB, inputValue)
    
    // I'm refactoring the line below into its own function.
    //inputFieldEl.value = "" (jump to line 41)
    
    clearInputFieldEl()
    // I'm appending a new <li> with text content inputValue to the 'shopping-list' <ul>
    
    // I'm refactoring the line below into its own function.
    //shoppingListEl.innerHTML += `<li>${inputValue}</li>`
    //appendItemToShoppingListEl (inputValue) - bug code (fixed)
   /* console.log(inputValue) - inputFieldEl.value = so that I can get the value that I type in. */
})

//I'm calling the onValue function with shoppingListInDB as the first argument and function(snapshot) {} as the second argument
onValue(shoppingListInDB, function(snapshot) {
    //I'm changing the onValue code so that it uses snapshot.exists() to show items when there are items in the database and if there are no displays then the text should be: 'No items here... yet'.
    if (snapshot.exists()) {
      let itemsArray = Object.entries(snapshot.val())
      clearShoppingListEl() 
      for (let i = 0; i < itemsArray.length; i++) {
           let currentItem = itemsArray[i] 
           let currentItemID = currentItem[0]
           let currentItemValue = currentItem[1]
        
         appendItemToShoppingListEl(currentItem)
     } 
  } else {
      shoppingListEl.innerHTML = " No items here yet....."
  }
    
})
    
    
    //Console log snapshot.val() to show all the items inside of shoppingList in the database
    //console.log(snapshot.val())
    //let itemsArray = Object.entries(snapshot.val())
    
    //clearShoppingListEl()
    //shoppingListEl.innerHTML = "" - I'm making it a function
    //console.log(itemsArray)
    //I'm writing a for loop to iterate on itemsArray and console log each item
    //for (let i = 0; i < itemsArray.length; i++) {
        //let currentItem = itemsArray[i]
        // I'm making two let variables: currentItemID and currentItemValue and I'm using currentItem to set both of them equal to the correct values.
        //let currentItemID = currentItem[0]
        //let currentItemValue = currentItem[1]
        
        //I'm using the appendItemToShoppingListEl(itemValue) function inside of the for loop to append item to the shopping list element for each iteration.
       // appendItemToShoppingListEl(currentItem)
        //console.log(itemsArray[i])
    //}
//}) 

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl () { // this function is taking the inputField element and it's setting the value to be the empty string. kind of clearing the input field/resetting it.
   inputFieldEl.value = ""
}

function appendItemToShoppingListEl (item) {
    //shoppingListEl.innerHTML += `<li>${itemValue}</li>` = it's taking the shopping list element, uses the innerHTML to append the input value at the very bottom. - we can delete this.
    
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li") //step 1 of replacing innerHTML with createElement
    newEl.textContent = itemValue // step 2
    
     //I'm attaching an event listener to newEl and making it to console log the id of the item when it's pressed
     newEl.addEventListener ("click", function() {
         //console.log(itemID)
         //I'm making a let variable called 'exactLocationOfItemInDB' and setting it equal to ref(database, something) where I substitute something with the code that will give me the exact location of the item in question.
         let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        
         //I'm using the remove function to remove the item from the database
         remove(exactLocationOfItemInDB)
     })
    
    shoppingListEl.append(newEl) // step 3 - I fetched the parent element
}