const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];


//checks if username is valid
const isValid = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

//checks if username and password are valid

const authenticatedUser = (username,password)=>{
  let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}


//only registered users can login

regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }
  
    if (authenticatedUser(username,password)) {
      let accessToken = jwt.sign({
        data: password
      }, 'access', { expiresIn: 60 * 60 });
  
      req.session.authorization = {
        accessToken,username
    }
    return res.status(200).send("User '" + username + "' successfully logged in");
    } else {
      return res.status(208).json({message: "Invalid Login. Check username and password"});
    }
});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const username = req.session.authorization.username;
    const review = req.body.review;
    const isbn = req.params.isbn;
    let book = books[isbn];
    let noReview = true; 

    if (book) {
        let numReviews = Object.keys(book.reviews).length; //this is number of reviews for book
        for (const rev in Object.keys(book.reviews)) {
            if (book.reviews[rev].username === username) {
                book.reviews[rev].review = review; 
                reviewExists = false;
                return res.send("The review '" + review + "' for book with ISBN " + isbn + " has been modified for user '" + username +"'")
                //return res.send(JSON.stringify(books,null,4));   //used to troubleshoot, can see if review was added
            }
        }
        if (noReview) {
            book.reviews[numReviews] = {
                "username":username,
                "review":review
            }
            return res.send("The review '" + review + "' for book with ISBN " + isbn + " has been added for user '" + username +"'")
            //return res.send(JSON.stringify(books,null,4));   //used to troubleshoot, can see if review was added
        }

    }
    else {
        return res.status(300).json({message: "ISBN does not exist"});
    }
});

// Delete a book review

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const username = req.session.authorization.username;
    const isbn = req.params.isbn;
    let book = books[isbn];

    if (book) {
        for (const rev in Object.keys(book.reviews)) {
            if (book.reviews[rev].username === username) {
                delete book.reviews[rev];
                return res.send("The review for book with ISBN " + isbn + " has been deleted for user '" + username +"'")
                // return res.send(JSON.stringify(books,null,4));
            }
        }
        res.status(300).json({message: "No reviews to delete for ISBN " + isbn + " for user " + username});
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
