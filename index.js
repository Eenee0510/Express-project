const express = require("express");
const { all } = require("express/lib/application");
const router = express.Router();
const fs = require("fs");
const app = express();

app.use(express.json());
app.use("/book", router);

router.get("/", (req, res) => {
  fs.readFile("./data/book.json", function (err, data) {
    if (err) {
      throw err;
    } else {
      const allBooks = JSON.parse(data);
      const title = allBooks.books.map((e) => {
        return e.title;
      });
      let bookArr = [];
      let previousIndex = [];
      for (i = 0; i < 3; i++) {
        let randomIndex = Math.floor(Math.random() * title.length);
        if (previousIndex.includes(randomIndex)) {
          randomIndex = Math.floor(Math.random() * title.length);
          randomIndex = Math.floor(randomIndex + 1);
          previousIndex.push(randomIndex);
        } else {
          previousIndex.push(randomIndex);
        }

        const random = title[randomIndex];
      }
      console.log(previousIndex);
      console.log(bookArr);
      res.send(bookArr);
    }
  });
});
// router.get("/isbn_id", (req, res) => {
//   fs.readFile("./data/book.json", function (err, data) {
//     if (err) {
//       throw err;
//     } else {
//       let bookobj = JSON.parse(data);
//     }
//   });
// });
app.listen(3000);
