const BASE = import.meta.env.VITE_API_URL + '/books';

/**
 * TODO: Implement each function below using fetch().
 * You are connecting to the Express backend you built.
 */

// GET /books
export const getBooks = async () => {
    // Example: return fetch(BASE).then(res => res.json());
    return await fetch(BASE).then(res => res.json());
};

// POST /books
export const createBook = async (data) => {
    // Send a POST request with JSON body
    const response = await fetch(BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response;
};

// PUT /books/:id
export const updateBook = async (id, data) => {
    // Update a book by ID
    const response = await fetch(`${BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response;
};

// DELETE /books/:id
export const deleteBook = async (id) => {
    // Delete a book by ID
    return await fetch(`${BASE}/${id}`, { method: 'DELETE' });
};
