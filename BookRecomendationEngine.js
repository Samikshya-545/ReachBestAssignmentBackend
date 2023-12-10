export const recommendBooks = (books, userPreferences, bookChoosingMethod, genrePreferences, readingPace) => {
    
  // Calculate the similarity between user preferences and book characteristics using Euclidean distance
  const similarityScores = books.map(book => {
    return ({
        title: book.title,
        similarity: calculateSimilarity(userPreferences, bookChoosingMethod, genrePreferences, readingPace, book.characteristics),
      });
  })

  // Sort books based on similarity in descending order
  const sortedBooks = similarityScores.sort((a, b) => {

    const roundedA = roundedSimilarity(a.similarity);
    const roundedB = roundedSimilarity(b.similarity);
    // If similarities are equal, maintain the original order
    if (a.similarity === b.similarity) {
        return a.title - b.title;
    }

    // Sort by similarity in descending order
    return roundedB - roundedA;
    
  });

//   console.log(sortedBooks);

  // Return book titles in the sorted order
  return sortedBooks.map(book => book.title);
}

function calculateSimilarity(userPreferences, bookChoosingMethod, genrePreferences, readingPace, bookCharacteristics) {
    const weights = {
        bookChoosingMethod: 0.5, // Adjust weights based on importance
        genrePreferences: 0.3,
        readingPace: 0.2,
      };

    // Calculate the similarity for each preference
    const bookChoosingMethodSimilarity = weights.bookChoosingMethod * euclideanDistance(userPreferences[bookChoosingMethod], bookCharacteristics, 2);
    const genrePreferencesSimilarity = weights.genrePreferences * euclideanDistance(userPreferences[genrePreferences], bookCharacteristics, 2);
    const readingPaceSimilarity = weights.readingPace * euclideanDistance(userPreferences[readingPace], bookCharacteristics, 2);

    // Calculate the Euclidean distance using the weighted similarities
    const squaredDifferences = [
        bookChoosingMethodSimilarity,
        genrePreferencesSimilarity,
        readingPaceSimilarity,
    ];

    const ed = Math.sqrt(squaredDifferences.reduce((sum, val) => sum + val, 0));

    // Normalize the distance to a similarity score (higher is better)
    return 1 / (1 + ed);
}

function euclideanDistance(a, b) {
    if (a.length !== b.length) {
        throw new Error("Vectors must have the same dimensionality");
    }

    const squaredDifferences = a.map((a_i, i) => Math.pow(a_i - b[i], 2));
    const sumSquaredDifferences = squaredDifferences.reduce((sum, val) => sum + val, 0);

    return Math.sqrt(sumSquaredDifferences);
}

const roundedSimilarity = (similarity) => Math.round(similarity * 10000) / 10000;
