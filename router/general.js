const express = require('express');
const axios = require('axios').default;
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


//Code for user registration

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User '" + username + "' successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User '" + username + "' already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
  });

// Get the book list available in the shop
public_users.get('/books', async function (req, res) {
    await new Promise((resolve, reject)=>{
        resolve(res.send(books));
    })
    console.log("Promise to get books resolved")
  });

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const findISBN = new Promise((resolve,reject) => {
      try {
        const isbn = req.params.isbn;
        let book = books[isbn];
        if (book) {
          resolve(res.send(JSON.stringify(book,null,4)));
        }
        else {
          resolve(res.status(300).json({message: "ISBN does not exist"}))
        }
        findISBN.then(() => console.log("Promise to get books by ISBN resolved"));
      }
      catch(err) {
          reject(err)
      }
  })
});


//This is a helper method to books list using different filter (book name, title name, etc.) and the 
// filterType (author, title, etc.)

 function getBooksByFilter(filter,filterType) {
    const booksByAuthor = [];
    for (const key in books) {
        const book = books[key];
        if (book[filterType] === filter) {
            booksByAuthor.push(book);
        }
      
    }
    return booksByAuthor;
  }
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  await new Promise((resolve,reject) => {
    const authorReq = req.params.author;
    let booksReq = getBooksByFilter(authorReq,'author');
    
    if (booksReq.length > 0) {
      resolve(res.send(JSON.stringify(booksReq,null,4)));
    }
    else {
      resolve(res.status(300).json({message: "No books with author: " + (authorReq)}));
    }
  })
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
    await new Promise((resolve,reject) => {
        const titleReq = req.params.title;
        let booksReq = getBooksByFilter(titleReq,'title');
        
        if (booksReq.length > 0) {
          resolve(res.send(JSON.stringify(booksReq,null,4)));
        }
        else {
          resolve(res.status(300).json({message: "No books with title: " + (titleReq)}));
        }
      })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let book = books[isbn];
    if (book) {
      let reviews = book.reviews;
      let title = book.title;
      if (reviews.length >0) {
          res.send(JSON.stringify(reviews,null,4));
      }
      else {
          res.send("There are no reviews for book '" + title + "' with ISBN: " + isbn)
      }
      
    }
    else {
      res.status(300).json({message: "ISBN does not exist"});
    }
  });
  

module.exports.general = public_users;
