const express = require('express');
const router = express.Router();

// access to authors array
const { authors, getAndUpdateNextAuthorId } = require('../data/data');

/**
 * TODO: Use router to define all CRUD operations: 1- get all, 2- get by id, 3- post a new author, 4- update an author, and 5- delete an author.
 *       Make sure to follow best practices as much as you can: use try-catch, use status codes efficiently, 
 *       and use console.log or console.error to print errors.
 *       Make sure to cover the cases of getting, deleting and updating an item that doesn't exist in the array, which should return: not found code (404)
 * 
 *       Follow the same rules of status codes and logic described in books routes. 
 *          
 *       Notice that post request now is a little simpler here. There is no checking of validity of "author_id" value here.
 */


router.get('/', (req, res) => { // Get all authors
  try {
    res.status(200).json(authors);
  } catch (error) {
    return res.status(500).json({"error": "Internal Server Error"});
  }
});

router.get('/:id', (req, res) => { // Get one author by ID
  try {
    const author = authors.find((author) => author.id.toString() === req.params.id);
    if (!author){
      return res.status(404).json({"error": "Author Not Found"});
    }
    return res.json(author);
  } catch (error) {
    return res.status(500).json({"error": "Internal Server Error"});
  }
});

router.post('/', (req, res) => {   //  Add a new author
  try {
    const name = req.body.name;

    if (!name || !name.trim()){
      return res.status(400).json({"error": "Name missing"});
    }

    const author = {
      id: getAndUpdateNextAuthorId(),
      name
    }
    authors.push(author);
    res.status(201).json(author);
  } catch (error) {
    return res.status(500).json({"error": "Internal Server Error"});
  }
});

router.put('/:id', (req, res) => { // Update a author by ID
  try {
    const name = req.body.name;
    const id = Number(req.params.id);
    if(!authors.some(author => author.id === id)){
      return res.status(404).json({"error": "id not found"});
    }

    if (!name|| !name.trim()){
      return res.status(400).json({"error": "Name missing"});
    }

    const newAuthor = {
      id,
      name
    }
    authors[authors.findIndex((author) =>  author.id === newAuthor.id)] = newAuthor;
    return res.status(200).json(newAuthor);
  } catch (error) {
    return res.status(500).json({"error": "Internal Server Error"});
  }
});

router.delete('/:id', (req, res) => { // Delete a author by ID
  try {
    const id = Number(req.params.id);
    if(!authors.some(author => author.id === id)){
      return res.status(404).json({"error": "id not found"});
    }
    authors.splice(authors.findIndex((author) =>  author.id === id), 1);
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({"error": "Internal Server Error"});
  }
});
/* TODO: End */
module.exports = router;