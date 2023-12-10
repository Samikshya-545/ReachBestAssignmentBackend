// app.js
import express from 'express';
import { recommendBooks } from './BookRecomendationEngine.js';
import cors from 'cors';
import { fetchBookList, saveBookList } from './services/BookListService.js';
import dotenv from 'dotenv';
import { fetchUserPreference, saveUserPreference } from './services/UserPreferenceService.js';

// Load environment variables from .env file
dotenv.config();

// Creating express object
const app = express();

// For parsing application/json
app.use(express.json());

app.use(cors());
 
// Handling GET request
app.post('/suggest-books', async (req, res) => {
    const { bookChoosingMethod, genrePreferences, readingPace } = req.body;

    const [BookList, up] = await Promise.all([fetchBookList(), fetchUserPreference()]);
    
    const suggestedBooks = recommendBooks(BookList, up, bookChoosingMethod, genrePreferences, readingPace);

    res.json({ suggestedBooks });
}) 
 
// Port Number
const PORT = process.env.PORT ||5001;
 
// Server Setup
app.listen(PORT,console.log(
  `Server started on port ${PORT}`));