const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.json());

const people = [];

// Routes
//post - add entry
app.post('/api/v1/people', (req, res) => {
  const person = { 
    name: req.body.name,
    age: req.body.age
  }
  if(!person.name) {
    return res.status(400).json({error:'Please enter a name.'});
  } else if (!person.age) {
    return res.status(400).json({error:'Please enter an age.'});
  }
  let length = people.push(req.body);
  res.json({msg:'A person record was added', index: length-1});
});

//get the array
app.get('/api/v1/people', (req, res) => {
  res.json({ people });
});

//get single entry from array
app.get('/api/v1/people/:id', (req, res) => {
  let index = req.params.id;
  index = Number(index);
  let person = people[index];
  if(!person) {
    res.status(404).json({error:`No entry with index ${index} has been found.`});
  }
  res.json({ person });
});


// app.all("/api/v1/*", (req, res) => {
//   res.json({ error: "That route is not implemented." });
// });

const server = app.listen(3000, () => {
  console.log("listening on port 3000...");
});

module.exports =  { app, server }
