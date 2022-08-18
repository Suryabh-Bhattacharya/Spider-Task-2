
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt')

crypt("password");

const posts = [
  {
    username: 'Kali',
    title: 'Post 1'
  },
  {
    username: 'Suryabh',
    title: 'Post 2'
  }
]

app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/login.html', authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.body.name))
})

const port = 3500;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

function crypt(pass) {
    bcrypt.hash(pass, 10, (err, hash) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(hash);
    });
}

function verification(req, res, next) {
  try {
    const token = req.session.token;
    console.log(`Verifying ${token}`);
    if (typeof token == "undefined" || token == null) {
      throw new Error("Invalid token");
    }
    const user = jwt.verify(req.session.token, process.env.SECRET);
    if (typeof user == "undefined" || user == null) {
      throw new Error("Invalid token");
    }
    else{
      next();
    }
  } catch (e) {
    req.flash("info", "you must be logged in to view this page");
    res.redirect("/login");
  }
}

