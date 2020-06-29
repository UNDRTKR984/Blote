const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const path = require("path");

const app = express();

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "client/build")));

const selectAll = "SELECT * FROM posts";

const con = mysql.createPool({
  host: "us-cdbr-east-02.cleardb.com",
  user: "b529de70178ced",
  password: "38c4c070",
  database: "heroku_81813ba035c5746",
});

// con.connect((err) => {
//   if (err) {
//     return err;
//   }
// });

app.use(cors());

app.get("/", (req, res) => {
  res.send("hello. go to /posts to see posts");
});

app.get("/posts/add", (req, res) => {
  const { title, content } = req.query;
  const insertPost = `INSERT INTO posts (title, content) VALUES ('${title}', '${content}')`;
  con.query(insertPost, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("successfully added post");
    }
  });
});

app.get("/posts/delete", (req, res) => {
  const { id, title, conent } = req.query;
  const deletePost = `DELETE FROM posts WHERE id=${id}`;
  con.query(deletePost, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("successfully deleted post");
    }
  });
});

app.get("/posts", (req, res) => {
  con.query(selectAll, (err, results) => {
    if (err) {
      return res.send(err);
    }
    return res.json({
      data: results,
    });
  });
});

// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}

app.listen(port, function () {
  console.log(port);
});
