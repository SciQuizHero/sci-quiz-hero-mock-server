const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

// Helper function to load quiz from a JSON file
async function loadQuiz(file, category, difficulty) {
    try {
        let rawdata = await fs.readFile(file);
        let quiz = JSON.parse(rawdata);
        if (quiz.category === category && quiz.difficulty === difficulty) {
            return quiz.questions;
        }
    } catch (err) {
        console.error(`Error reading or parsing file ${file}: `, err);
    }
    return null;
}

app.get('/quizzes', async (req, res) => {
    let size = req.query.size || 10;  // Default size is 10 if not provided
    let category = req.query.category;
    let difficulty = req.query.difficulty;
    let quizFolder = path.join(__dirname, 'Quizzes');

    let quizQuestions = [];
    try {
        let files = await fs.readdir(quizFolder);
        for (let file of files) {
            if (path.extname(file) === '.json') {
                let questions = await loadQuiz(path.join(quizFolder, file), category, difficulty);
                if (questions) {
                    quizQuestions.push(...questions);
                }
            }
        }
    } catch (err) {
        console.error(`Error reading directory ${quizFolder}: `, err);
        res.status(500).send('Server error');
        return;
    }

    // Randomize and cut down the size of the quizQuestions array
    quizQuestions.sort(() => Math.random() - 0.5);
    quizQuestions = quizQuestions.slice(0, size);
    res.json(quizQuestions);
});

app.listen(3000, () => {
    console.log('App is listening on port 3000');
});
