const express = require('express')
const fs = require('fs').promises
const path = require('path')

const app = express()

// Data Access Layer
const readQuizFile = async (filePath) => {
    const data = await fs.readFile(filePath, 'utf8')
    return JSON.parse(data)
}

const getQuizFiles = async (dirPath) => {
    const files = (await fs.readdir(dirPath)).filter(f => path.extname(f) === '.json')
    return files.map(file => path.join(dirPath, file))
}

// Service Layer
const getQuizzes = async (category, difficulty, size) => {
    const dirPath = path.join(__dirname, "Quizzes")
    const quizFiles = await getQuizFiles(dirPath)

    const quizzes = await Promise.all(quizFiles.map(readQuizFile))
    const matchingQuizzes = quizzes.filter(quiz =>
        category.includes(quiz.category.toLowerCase()) && quiz.difficulty.toLowerCase() === difficulty)

    if (!matchingQuizzes.length) {
        return null
    }

    const selectedQuestions = []
    const baseSize = Math.floor(size / category.length)
    let remainder = size % category.length

    for (const quiz of matchingQuizzes) {
        const selectedCount = remainder > 0 ? baseSize + 1 : baseSize
        selectedQuestions.push(...quiz.questions.slice(0, selectedCount))
        remainder--
    }

    return selectedQuestions
}

// Route Handling Layer
app.get('/quizzes', async (req, res, next) => {
    let { category, difficulty, size } = req.query
    category = Array.isArray(category) ? category : [category]

    try {
        const selectedQuestions = await getQuizzes(
            category.map(c => c.toLowerCase()),
            difficulty.toLowerCase(),
            parseInt(size))

        if (!selectedQuestions) {
            return res.status(404).json({ "error": "No matching quizzes found" })
        }
        return res.json(selectedQuestions)
    } catch (error) {
        next(error)
    }
})

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({ "error": "Internal Server Error" })
})

// Server Setup
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running on port ${port}`))
