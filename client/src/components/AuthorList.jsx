import { useEffect, useState } from 'react';
import { getAuthors, deleteAuthor } from '../services/authorService';
import styles from '../styles/List.module.css';

export default function AuthorList() {
    const [authors, setAuthors] = useState([]);
    const ANON_ID = 999;

    useEffect(() => {
        getAuthors().then(setAuthors);
    }, []);

    const handleDelete = async (id) => {
        if (id == ANON_ID){
            alert("Cannot delete default value, Anonymous author.")
            return;
        }
        const response = await deleteAuthor(id);
        if (response.status !== 204){
            alert("Cannot delete. Author is used in a book or network error.");
        }
        else {
            setAuthors(authors.filter(a => a.id !== id));
        }
    };

    return (
        <div className={styles.card}>
            <h2>👤 Authors</h2>
            <ul>
                {authors.map(author => (
                    <li key={author.id}>
                        {author.name}
                        <button onClick={() => handleDelete(author.id)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
