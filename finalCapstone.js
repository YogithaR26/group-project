// const express = require('express')
// const app = express()
// const port = 3000
// const { initializeApp, cert } = require('firebase-admin/app');
// const { getFirestore } = require('firebase-admin/firestore');

// var serviceAccount = require("./key.json");

// // Initialize the Firebase Admin SDK with the service account key
// initializeApp({
//   credential: cert(serviceAccount)
// });
// const db=getFirestore();
// app.set("view engine", "ejs")
// app.get('/signup', (req, res) => {
//   res.render("signup")
// })
// app.get('/login', (req, res) => {
//   res.render("login")
// })
// app.get("/loginsubmit", (req, res) => {
//   const username=req.query.username;
//   const email=req.query.email;
//   const password=req.query.password;

//   db.collection('user')
//         .where("username", "==", username)
//         .where("email", "==", email)
//         .where("password", "==", password)
//         .get()
//         .then((docs) => {
//             // Check if any documents match the query
//             if (docs.size > 0) {
                
//                 res.render("demo",{username:username}); 
//             } else {
//                 res.send("Fail"); // Send failure message
//             }
//         });
// })
// app.get("/register", (req, res) => {
//   const firstname=req.query.firstname;
//   const lastname=req.query.lastname;
//   const email=req.query.email;
//   const password=req.query.password;
//   const phoneno=req.query.phno;
//   //adding new data to collection
//   db.collection('user').add({
//     username:firstname+lastname,
//     email:email,
//     password:password,
//     phoneno:phoneno
//  }).then(()=>{
//   res.render("demo", { username: firstname + lastname });
//  })
// })
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })




// // Serve static files from a directory (e.g., 'public')
// app.use(express.static('public'));

// // Define a route to serve quiz.html
// app.get('/quiz.html', (req, res) => {
//   res.sendFile('public/quiz.html', { root: __dirname });
// });

// // Other routes and server setup

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

const express = require('express');
const app = express();
const port = 3000;
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

var serviceAccount = require("./key.json");

// Initialize the Firebase Admin SDK with the service account key
initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();
app.set("view engine", "ejs");

// Define a route to serve quiz.html before starting the server
app.get('/quiz.html', (req, res) => {
  res.sendFile('public/quiz.html', { root: __dirname });
});

app.get('/signup', (req, res) => {
  res.render("signup");
});

app.get('/login', (req, res) => {
  res.render("login");
});

app.get("/loginsubmit", (req, res) => {
  const username = req.query.username;
  const email = req.query.email;
  const password = req.query.password;

  db.collection('user')
    .where("username", "==", username)
    .where("email", "==", email)
    .where("password", "==", password)
    .get()
    .then((docs) => {
      // Check if any documents match the query
      if (docs.size > 0) {
        res.render("demo", { username: username });
      } else {
        res.send("Fail"); // Send a failure message
      }
    });
});

app.get("/register", (req, res) => {
  const firstname = req.query.firstname;
  const lastname = req.query.lastname;
  const email = req.query.email;
  const password = req.query.password;
  const phoneno = req.query.phno;

  // Adding new data to the collection
  db.collection('user').add({
    username: firstname + lastname,
    email: email,
    password: password,
    phoneno: phoneno
  }).then(() => {
    res.render("demo", { username: firstname + lastname });
  });
});

// Serve static files from a directory (e.g., 'public')
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

