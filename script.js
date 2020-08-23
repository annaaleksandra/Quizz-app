let request = new XMLHttpRequest();
request.open("GET", "https://opentdb.com/api.php?amount=1&type=multiple");
request.send();
request.onload = () => {
    
    if (request.status == 200) {
        let data = JSON.parse(request.response)
        
        // Show category before the question
        const category = document.getElementById('category');
        category.innerHTML = "Category: " + data["results"][0]["category"];

        // Get question from API
        const question = document.getElementById('question');
        question.innerHTML = data["results"][0]["question"];

        // Empty array that will be populated with all answers, correct and incorrect
        let options = [];
        
        // Push correct answer to the array
        const correctAnswer = data["results"][0]["correct_answer"];
        options.push(correctAnswer);

        // Push incorrect answers to the array
        let incorrectAnswers = data["results"][0]["incorrect_answers"]
        for (let i = 0; i < incorrectAnswers.length; i++)
            options.push(incorrectAnswers[i])
        
        // Shuffle the answer options
        // eslint-disable-next-line no-inner-declarations
        function shuffleOptions(options) {
            for (let i = options.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                let temp = options[i];
                options[i] = options[j];
                options[j] = temp;
            }
        }
        shuffleOptions(options);

        // Append answers to DOM
        let answerOptions = document.getElementById('options');
        options.forEach(function(element){
            let answer = document.createElement('button')
            answer.setAttribute('class', 'buttons')
            answer.setAttribute('id', element)
            answer.innerHTML = element
            answerOptions.appendChild(answer);
        })
        
        // Make the buttons listen for a click
        let allButtons = document.querySelectorAll('.buttons')
        /*buttonAnswers.forEach(function(element){
            element.addEventListener('click', findAnswer)
        })*/
 
        console.log(correctAnswer)

        for (let i = 0; i < allButtons.length; i++) {
            allButtons[i].addEventListener('click', function() {
                this.disabled = true;
                let answers = document.getElementById('answers')
                let yourAnswer = document.createElement('p')
                yourAnswer.innerHTML = "You answered: " + this.innerHTML
                let rightAnswer = document.createElement('p')
                rightAnswer.setAttribute('id', 'correctAnswer')
                rightAnswer.innerHTML = "Correct answer: " + correctAnswer

                answers.appendChild(rightAnswer) 
            });
        }

        let refresh = document.getElementById('next')
        refresh.addEventListener('click', refreshPage)

        // eslint-disable-next-line no-inner-declarations
        function refreshPage(){
            location.reload()
        }

    } else {
        console.log(`error ${request.status} ${request.statusText}`)
    }
}