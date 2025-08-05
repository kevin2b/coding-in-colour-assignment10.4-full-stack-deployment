const express = require('express');
const router = express.Router();

// access to authors array
const { Author } = require('../model/Author.js');

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


router.get('/', async (req, res) => { // Get all authors
  try {
    const authors = await Author.findAll();
    res.status(200).json(authors);
  } catch (error) {
    return res.status(500).json({"error": "Internal Server Error"});
  }
});

router.get('/:id', async (req, res) => { // Get one author by ID
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author){
      return res.status(404).json({"error": "Author Not Found"});
    }
    return res.json(author);
  } catch (error) {
    return res.status(500).json({"error": "Internal Server Error"});
  }
});

router.post('/', async (req, res) => {   //  Add a new author
  try {
    const name = req.body.name;

    if (!name || !name.trim()){
      return res.status(400).json({"error": "Name missing"});
    }

    const author = await Author.create({
      name
    });

    res.status(201).json(author);
  } catch (error) {
    return res.status(500).json({"error": "Internal Server Error"});
  }
});

router.put('/:id', async (req, res) => { // Update a author by ID
  try {
    const name = req.body.name;
    const id = req.params.id;

    if (!name|| !name.trim()){
      return res.status(400).json({"error": "Name missing"});
    }

    const author = await Author.findByPk(id);
    if(!author){
      return res.status(404).json({"error": "id not found"});
    }

    author.name = name;
    await author.save()

    return res.status(200).json(author);
  } catch (error) {
    return res.status(500).json({"error": "Internal Server Error"});
  }
});

router.delete('/:id', async (req, res) => { // Delete a author by ID
  try {
    const id = req.params.id;
    const deleted = await Author.destroy({ where: { id } })
    if(deleted === 0){
      return res.status(404).json({"error": "id not found"});
    }
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({"error": "Internal Server Error"});
  }
});
/* TODO: End */
module.exports = router;