var inquirer = require('inquirer')
var Word = require('./word.js')
var isLetter = require('is-letter')
var currentWord
var wordBank = ['ELEPHANT', 'BADGER','TIGER', 'CHICKEN', 'HAMSTER', 'SNAKE']
var guessesRemaining = 10
var guessedLetters = []
 

startGame()

function startGame() {
    if (guessedLetters.length > 0) {
        guessedLetters = []
    }

    inquirer.prompt([
        {
            name: 'play',
            type: 'confirm',
            message: 'Are you ready to play?'
        }
    ]).then(function (answer) {
        if (answer.play) {
            console.log('')            
            console.log('Guess the mystery animal. You have 10 guesses')
            newGame()
        } else {
            console.log('Goodbye')
        }
    })
}

function newGame() {
    if (guessesRemaining === 10) {
        console.log('---------------------------------------------------------')
        var randNum = Math.floor(Math.random() * wordBank.length)
        currentWord = new Word(wordBank[randNum])
        currentWord.getLetters()
        console.log('')
        console.log(currentWord.wordRender())
        console.log('')
        promptPlayer()
    } else {
        clearGuesses()
        newGame()
    }
}

function clearGuesses() {
    guessesRemaining = 10
}

function promptPlayer() {
    inquirer.prompt([
        {
            name: 'chosenLetter',
            type: 'input',
            message: 'Choose a letter',
            validate: function(value) {
                if (isLetter(value)) {
                    return true
                } else {
                    return false
                }
            }
        }
    ]).then(function(letr) {

        var letterReturned = (letr.chosenLetter).toUpperCase()

  
        var guessedAlready = false
        for (var i = 0; i < guessedLetters.length; i++) {
            if(letterReturned === guessedLetters[i]) {
                guessedAlready = true
            }
        }

        if (guessedAlready === false) {
            guessedLetters.push(letterReturned)
            var found = currentWord.checkIfLetterFound(letterReturned)

            if (found === 0) {
                console.log('Wrong guess')

                guessesRemaining--

                console.log('Guesses reamaining: ' + guessesRemaining)
                console.log('')
                console.log(currentWord.wordRender())
                console.log('')
                console.log('---------------------------------------------------------')
                console.log('Letters guessed: ' + guessedLetters)
            } else {
                console.log('You are correct!')

                if (currentWord.checkWord() === true) {
                    console.log('')
                    console.log(currentWord.wordRender())
                    console.log('')
                    console.log('----- YOU WIN -----')
                    startGame()
                } else {
                    console.log('Guesses remaining: ' + guessesRemaining)
                    console.log('')
                    console.log(currentWord.wordRender())
                    console.log('')
                    console.log('---------------------------------------------------------')
                    console.log('Letters guessed: ' + guessedLetters)
                }
            }


            if (guessesRemaining > 0 && currentWord.wordFound === false) {
                promptPlayer();
            } else if (guessesRemaining === 0) { 
                console.log('')                
                console.log('----- GAME OVER -----')
                console.log('')
                console.log('The word was: ' + currentWord.word)
                console.log('')                
            }
        } else { 
            console.log('You"ve already guessed that letter.')
            promptPlayer();
        }
    })
}
