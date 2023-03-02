const express = require("express");
const cors = require("cors");

const {
  getPersons,
  addPerson,
  updatePerson,
  deletePerson,
} = require("./utils/utils");

const app = express();
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
app.use(express.json());

app.get("/api/persons", (_, res) => {
  res.send(getPersons());
});

app.post("/api/add-person", (req, res) => {
  const person = req.body;
  // Do something with the user data (e.g., save to database)
  const callback = (err) => {
    if (err) {
      console.log("ERROR writing to file");
      throw err;
    }
    console.log("add-person: File written");
    // Send a response
    res.status(201).json({ message: "Person created", person: person });
  };
  addPerson(person, callback);
});

app.post("/api/update-person", (req, res) => {
  const person = req.body;
  // Do something with the user data (e.g., save to database)
  const callback = (err) => {
    if (err) {
      console.log("update-person: Error writing to file");
      throw err;
    }
    console.log("update-person: File written");
    // Send a response
    res.status(201).json({ message: "Person updated", person: person });
  };
  updatePerson(person, callback);
});
app.post("/api/delete-person", (req, res) => {
  const id = req.body;
  // Do something with the user data (e.g., save to database)
  const callback = (err) => {
    if (err) {
      console.log("delete-person: Error writing to file");
      throw err;
    }
    console.log("delete-person: File written");
    // Send a response
    res.status(201).json({ message: "Person deleted", id: id });
  };
  deletePerson(id, callback);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000!");
});
