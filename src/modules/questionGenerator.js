// \u00D7 is the unicode symbol for multiplication and \u00F7 for division in Javascript.

const operatorDifficulty = {
    easy: ['+', '-'],
    medium: ['+', '-', '\u00D7'],
    hard: ['+', '-', '\u00D7'],
    insane: ['+', '-', '\u00D7', '\u00F7'],
};

const wholeNumberGenerator = (number) => Math.floor(Math.random() * number);

// Change difficulty here as this is the factor of multiplication that determines range of numbers.
const generateDifficulty = (difficulty) => {
    switch (difficulty) {
        case 'easy':
            return 5;
        case 'medium':
            return 10;
        case 'hard':
            return 30;
        case 'insane':
            return 100;
        default:
            return 5;
    }
};

const indexOperatorGenerator = (difficulty) =>
    wholeNumberGenerator(operatorDifficulty[difficulty].length);

const operatorSelector = (difficulty) =>
    operatorDifficulty[difficulty][indexOperatorGenerator(difficulty)];

const questionNumberGenerator = (difficulty) =>
    wholeNumberGenerator(generateDifficulty(difficulty)) + 1;

const answerQuestion = (question) => {
    const questionArr = question.split(' ');
    const num1 = Number(questionArr[0]);
    const operator = questionArr[1];
    const num2 = Number(questionArr[2]);
    let answer;
    if (operator === '+') {
        answer = num1 + num2;
    } else if (operator === '-') {
        answer = num1 - num2;
    } else if (operator === '\u00D7') {
        answer = num1 * num2;
    } else {
        answer = num1 / num2;
    }
    return answer;
};

const questionGenerator = (difficulty) => {
    const operator = operatorSelector(difficulty);
    let number1 = questionNumberGenerator(difficulty);
    let number2 = questionNumberGenerator(difficulty);
    // Functions that will determine question difficulty
    while (operator === '\u00F7') {
        if (number1 % number2 !== 0) {
            number1 = questionNumberGenerator(difficulty);
            number2 = questionNumberGenerator(difficulty);
        } else {
            break;
        }
    }
    while (operator === '-') {
        if (number1 - number2 < 0) {
            number1 = questionNumberGenerator(difficulty);
            number2 = questionNumberGenerator(difficulty);
        } else {
            break;
        }
    }

    while (operator === '\u00D7') {
        if (number1 * number2 > 150) {
            number1 = questionNumberGenerator(difficulty);
            number2 = questionNumberGenerator(difficulty);
        } else {
            break;
        }
    }

    while (operator === '+') {
        if (number1 + number2 > 150) {
            number1 = questionNumberGenerator(difficulty);
            number2 = questionNumberGenerator(difficulty);
        } else {
            break;
        }
    }

    const questionText = `${number1} ${operator} ${number2}`;
    const answer = answerQuestion(questionText);

    return {
        text: questionText,
        answer,
    };
};

export default questionGenerator;
