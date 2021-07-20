const operatorDifficulty = {
    easy: ['+', '-'],
    medium: ['+', '-', '*'],
    hard: ['+', '-', '*'],
    insane: ['+', '-', '*', '/'],
};

const wholeNumberGenerator = (number) => Math.floor(Math.random() * number);

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
    } else if (operator === '*') {
        answer = num1 * num2;
    } else {
        answer = num1 / num2;
    }
    return answer;
};

const questionGenerator = (difficulty) => {
    const operator = operatorSelector(difficulty);
    const questionText = `${questionNumberGenerator(
        difficulty
    )} ${operator} ${questionNumberGenerator(difficulty)}`;
    const answer = answerQuestion(questionText);

    return {
        text: questionText,
        answer,
    };
};

export default questionGenerator;
