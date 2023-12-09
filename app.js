// app.js
import express from 'express';
import { recommendBooks } from './BookRecomendationEngine.js';
import { BookList } from './models/BookList.js';
import { userPreferences } from './models/UserPreference.js';
import cors from 'cors';

// Creating express object
const app = express();

// For parsing application/json
app.use(express.json());

app.use(cors());
 
// Handling GET request
app.post('/suggest-books', (req, res) => {
    const { bookChoosingMethod, genrePreferences, readingPace } = req.body;
    const up = userPreferences;

    // Implement your book suggestion logic based on userPreferences
    const suggestedBooks = recommendBooks(BookList, up, bookChoosingMethod, genrePreferences, readingPace);

    res.json({ suggestedBooks });
}) 
 
// Port Number
const PORT = process.env.PORT ||5001;
 
// Server Setup
app.listen(PORT,console.log(
  `Server started on port ${PORT}`));