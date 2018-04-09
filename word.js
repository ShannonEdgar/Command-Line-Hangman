var Letter = require('./letter.js')

function Word(werd) {
    this.word = werd
    this.letters = []
    this.wordFound = false

  
    this.getLetters = function () {
        for (var i = 0; i < this.word.length; i++) {
            var newLetter = new Letter(this.word[i]);
            this.letters.push(newLetter);
        }
    }


    // // The every method tests whether all elements in the array pass 
    // the test implemented by the provided function.
    this.checkWord = function () {
        if (this.letters.every(function (lttr) {
            return lttr.appear === true;
        })) {
            this.wordFound = true;
            return true;
        }
    }


    // forEach runs function on each element in the array
    this.checkIfLetterFound = function (guessedLetter) {
        var whatToReturn = 0
        this.letters.forEach(function (lttr) {
            if (lttr.letter === guessedLetter) {
                lttr.appear = true
                whatToReturn++
            }
        })
        return whatToReturn
    }

    this.wordRender = function () {
        var display = ''
        this.letters.forEach(function (lttr) {
            var currentLetter = lttr.letterRender()
            display += currentLetter
        })
        return display
    }
}

module.exports = Word
