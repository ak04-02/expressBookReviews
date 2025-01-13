const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  let new_user=req.body.username;
  let new_password=req.body.password;
  if(new_user && new_password) {
    if(users[new_user]) {
      res.status(200).json({ message: "username already exists" });
    } else {
      users[new_user] = new_password;
      res.status(200).json({ message: "Successfully registered" });
    }
  } else {
    res.status(200).json({ message: "username and/or password is not provided." });
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let book=JSON.stringify(books,null,4);
  if(book)
  return res.status(200).send(book);
else
return res.status(500).send("Not available");
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  let q=req.params.isbn;
  return res.send(JSON.stringify(books[q],null,4));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  let au=req.params.author;
  let book=books[au];
  if(book)
  {
    return res.send(JSON.stringify(book,null,4));
  }
  else{
    return res.status(404).send("Not found");
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let au=req.params.title;
  let book=books[au];
  if(book)
  {
    return res.send(JSON.stringify(book,null,4));
  }
  else{
    return res.status(404).send("Not found");
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  let q=req.params.isbn;
  if(q)
  return res.send(books[q].reviews);
else
  return res.status(404).send("Not found");
});

module.exports.general = public_users;
