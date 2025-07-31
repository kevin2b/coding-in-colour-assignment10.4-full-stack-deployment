const express = require('express');
const router = express.Router();

// access to books and authors arrays. You will need to use both here.
const { books, authors, getAndUpdateNextBookId } = require('../data/data');

// The first get method is provided below.
router.get('/', (req, res) => { // Get all books
  try {
    res.status(200).json(books);
  } catch (error) {
    res.sendStatus(500);
  }
});

/**
 * TODO: Use router to define the rest of CRUD operations: get by id, post a new book, update a book, and delete a book.
 *       Make sure to follow best practices as much as you can: use try-catch, use status codes efficiently, 
 *       and use console.log or console.error to print errors.
 *       Make sure to cover the cases of getting, deleting and updating an item that doesn't exist in the array, which should return: not found code (404)
 *       
 *      
 */

/**
 *  Should return 200 on successful get, 404 if book not found and 500 on error.
 * 
 */
router.get('/:id', (req, res) => { // Get one book by ID
  try {
    // TODO.. 
    const book = books.find((book) => book.id.toString() === req.params.id);
    if (!book){
      return res.status(404).json({"error": "Book Not Found"});
    }
    return res.json(book);
  } catch (error) {
    // TODO.. 
    return res.status(500).json({"error": "Internal Server Error"});
  }
});

/**   When creating a new book, you need to assigne an auhtor to it through author_id. 
*     You need to check if author_id provided in the request is valid, which means it is available in the authors array.
*     If it doesn't exist in the array, or if it is missing from the request, you should give it a default value of 99, i.e. anonymous author.
*     
*     Important: ids of books should be incremental. In books array in data.js we have two books with ids 1 and 2 respectively.
*     Next added book should have id 3, and the next should have id of 4 and so on.
*      
*     You should also return "Bad request (400)" if name or price are missing.
*
*     Should return 201 on successful post, and 500 on error.
*/
router.post('/', (req, res) => {   //  Add a new book
  try {
    // TODO.. 
    const name = req.body.name;
    const price = req.body.price;
    const author_id = authors.some((author)=>{return req.body.author_id === author.id.toString()})? Number(req.body.author_id): 99;

    //This is only basic check and does not account for NaN
    if (!name|| !name.trim() || price === undefined || price === null || price === ""){
      return res.status(400).json({"error": "Name or price missing"});
    }

    const book = {
      id: getAndUpdateNextBookId(),
      name,
      price,
      author_id
    }
    books.push(book);
    res.status(201).json(book);
  } catch (error) {
    // TODO.. 
    return res.status(500).json({"error": "Internal Server Error"});
  }
});

/**
 *    Make sure to cover the case of updating an item that doesn't exist in the array, which should return: not found code (404)
 * 
 *    Should return 200 on successful put, and 500 on error.
 */
router.put('/:id', (req, res) => { // Update a book by ID
  try {
    // TODO.. 
    const name = req.body.name;
    const price = req.body.price;
    const author_id = authors.some((author)=>{return req.body.author_id === author.id.toString()})? Number(req.body.author_id): 99;
    const id = Number(req.params.id);
    if(!books.some(book => book.id === id)){
      return res.status(404).json({"error": "id not found"});
    }

    //This is only basic check
    if (!name|| !name.trim() || price === undefined || price === null || price === ""){
      return res.status(400).json({"error": "Name or price missing"});
    }

    const newBook = {
      id,
      name,
      price,
      author_id
    }
    books[books.findIndex((book) =>  book.id === newBook.id)] = newBook;
    return res.status(200).json(newBook);
  } catch (error) {
    // TODO.. 
    return res.status(500).json({"error": "Internal Server Error"});
  }
});

/**
 *    Make sure to cover the case of deleting an item that doesn't exist in the array, which should return: not found code (404)
 *    
 *    Should return 204 on successful delete, and 500 on error.
 */
router.delete('/:id', (req, res) => { // Delete a book by ID
  try {
    // TODO.. 
    const id = Number(req.params.id);
    if(!books.some(book => book.id === id)){
      return res.status(404).json({"error": "id not found"});
    }
    books.splice(books.findIndex((book) =>  book.id === id), 1);
    return res.status(204).end();
  } catch (error) {
    // TODO.. 
    return res.status(500).json({"error": "Internal Server Error"});
  }
});

module.exports = router;
