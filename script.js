class Form {
    state = {
        types: {
            introvert: {
                name: 'Интроверт',
                count: 0,
                percentage: 0
            },
            extrovert: {
                name: 'Экстраверт',
                count: 0,
                percentage: 0
            },
            unknown: {
                name: 'Не знаю',
                count: 0,
                percentage: 0
            }
        },
        totalAnswers: 0
    }
    radioButtons = document.querySelectorAll('input[type="radio"]')
    resultWrapper = document.querySelector('.results')
    submit = document.querySelector('.submit-btn')
    userAnswer = null

    init = () => {
        this.setSubmitListener()
    }

    setSubmitListener = () => {
        this.submit.addEventListener('click', (e) => {
            e.preventDefault()
            this.formHandler()
        })
    }

    setResults = () => {
        this.state.types[this.userAnswer].count++
        this.state.totalAnswers++
    }

    calculateResults = () => {
        Object.keys(this.state.types).map(type => {
            this.state.types[type].percentage = Math.round((this.state.types[type].count / this.state.totalAnswers) * 100)
        })
    }

    showResults = () => {
        Object.keys(this.state.types).map(type => {
            if (type === this.userAnswer) {
                return this.resultWrapper.innerHTML += `<p>${this.state.types[type].percentage}% ответило также как и вы ${this.state.types[type].name}</p>`
            }
            return this.resultWrapper.innerHTML +=`<p>${this.state.types[type].percentage}% ответило ${this.state.types[type].name}</p>`
        })
    }

    chooseLastLetter = letter => {
        const lastDigit = this.getLastDigit()

        switch (letter) {
            case 'a':
                return ( this.state.totalAnswers < 10 && lastDigit >= 2 && lastDigit <= 4) ? letter : (this.state.totalAnswers > 20 && lastDigit >= 2 && lastDigit <= 4) ? letter : ''
            case 'о':
                return this.state.totalAnswers === 1 ? '' : letter
        }

        return ( this.state.totalAnswers < 10 && lastDigit >= 2 && lastDigit <= 4) ? letter : (this.state.totalAnswers > 20 && lastDigit >= 2 && lastDigit <= 4) ? letter : ''
    }

    getLastDigit = () => {
        return this.state.totalAnswers % 10;
    }

    showTotal = () => {
        document.querySelector('.total-answers').innerHTML = `<span>Ответил${this.chooseLastLetter('о')} ${this.state.totalAnswers} человек${this.chooseLastLetter('a')}</span>`
    }

    clearResults = () => {
        this.resultWrapper.innerHTML = ''
    }

    formHandler = () => {
        this.clearResults()

        for (let radio of this.radioButtons) {
            if (radio.checked) {
                this.userAnswer = radio.value
            }
        }

        this.setResults()
        this.calculateResults()
        this.showResults()
        this.showTotal()
    }
}

const form = new Form()
form.init()

