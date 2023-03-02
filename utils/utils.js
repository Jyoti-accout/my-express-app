const fs = require("fs");
const fileName = "data/persons.json";

function getPersons() {
  const jsonData = fs.readFileSync(fileName);
  return JSON.parse(jsonData);
}

function writeToFile(data, callback) {
  fs.writeFile(fileName, JSON.stringify(data), callback);
}

function addPerson(person, callback) {
  const persons = getPersons();
  persons.sort((a, b) => a.id - b.id);
  const newId = persons[persons.length - 1].id + 1;
  const newPerson = { ...person, id: newId };
  persons.push(newPerson);
  writeToFile(persons, callback);
}

function updatePerson(personToedit, callback) {
  const persons = getPersons();
  const index = persons.findIndex((p) => p.id === personToedit.id);
  persons[index] = { ...personToedit };
  writeToFile(persons, callback);
}

function deletePerson(id, callback) {
  const persons = getPersons();
  const index = persons.findIndex((p) => p.id === id);
  persons.splice(index, 1);
  writeToFile(persons, callback);
}

module.exports = { getPersons, addPerson, updatePerson, deletePerson };
