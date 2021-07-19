const operatorDifficulty = {
  'easy': ['+', '-'],
  'medium': [ '+', '-', '*'],
  'hard': ['+', '-', '*'],
  'insane': ['+', '-', '*', '/']
}

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
}
const indexOperatorGenerator = difficulty => Math.floor(Math.random() * operatorDifficulty[difficulty].length);

const operatorSelector = difficulty => operatorDifficulty[difficulty][indexOperatorGenerator(difficulty)];

const questionNumberGenerator = (difficulty) => wholeNumberGenerator(generateDifficulty(difficulty))

const questionGenerator = (difficulty) => {
  const operator = operatorSelector(difficulty);
  const question =  `${questionNumberGenerator()} ${operator} ${questionNumberGenerator()}`;
  console.log(question);
}
