const express = require("express"),
  bodyParser = require("body-parser"),
  universityRouter = require("./Routers/universityRouter"),
  University = require("./dataBase/Model/UniversityModel");

require("./DataBase/DB");

// APP CONFIG
const app = express(),
  port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({
    Developer: {
      name: "Cosmos",
    },
    git_Repository: "https://github.com/Console45/world-universities-list-api",
    examples: {
      search_with_name: `https://world-university-list-api.herokuapp.com/index/universities?name=${encodeURIComponent(
        "University of Ghana"
      )}`,
      search_with_country: `https://world-university-list-api.herokuapp.com/index/universities?country=${encodeURIComponent(
        "Ghana"
      )}`,
      search_with_name_and_country: `https://world-university-list-api.herokuapp.com/index/universities?name=${encodeURIComponent(
        "Marywood University"
      )}&country=${encodeURIComponent("United States")}`,
    },
  });
});
app.get("/index", async (req, res) => {
  const universities = await University.find();
  res.send(universities);
});
app.use("/index", universityRouter);

app.use("*", (req, res) => {
  res.status(404).send({
    "404": "Page not found",
  });
});
app.listen(port, () => {
  console.log("Server is listening " + port);
});
