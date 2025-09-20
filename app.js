const express = require('express');
const app = express();
app.use(express.json());


let profiles = [];
let books = [{ id: 1, title: "Node.js Basics" }];
let bookIdCounter = 2;


app.get('/welcome-json', (req, res) => {
  res.json({ message: "Welcome to Express Backend!" });
});

app.post('/profile', (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) return res.status(400).json({ error: "Name and age required" });
  const profile = { name, age };
  profiles.push(profile);
  res.json({ ...profile, status: "Profile created" });
});


app.get('/profile/:name', (req, res) => {
  const profile = profiles.find(p => p.name === req.params.name);
  if (profile) res.json(profile);
  else res.status(404).json({ message: "Profile not found" });
});

app.get('/profiles', (req, res) => {
  res.json(profiles);
});

app.put('/profile/:name', (req, res) => {
  const profile = profiles.find(p => p.name === req.params.name);
  if (!profile) return res.status(404).json({ message: "Profile not found" });

  if (req.body.age) profile.age = req.body.age;
  res.json({ ...profile, status: "Profile updated" });
});

app.delete('/profile/:name', (req, res) => {
  const index = profiles.findIndex(p => p.name === req.params.name);
  if (index === -1) return res.status(404).json({ message: "Profile not found" });

  profiles.splice(index, 1);
  res.json({ message: "Profile deleted" });
});

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title required" });

  const newBook = { id: bookIdCounter++, title };
  books.push(newBook);
  res.json({ ...newBook, status: "Book added" });
});


app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });

  if (req.body.title) book.title = req.body.title;
  res.json({ ...book, status: "Book updated" });
});

app.delete('/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Book not found" });

  books.splice(index, 1);
  res.json({ message: "Book deleted" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
