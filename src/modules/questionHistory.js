import { createElement } from './domUtils';
import { ENEMY_EVENT_TYPES } from './enemy';

const tableBody = document.querySelector('#question-history tbody');

const cssClasses = {
    answer: 'question-history-answer',
    wrongAnswer: 'question-history-wrong-answer',
    correctAnswer: 'question-history-correct-answer',
    hitCastleIcon: 'fas fa-heart-broken',
};

function createQuestionHistoryUserAnswer(event) {
    const bgColorClass = event.answer.isCorrect
        ? cssClasses.correctAnswer
        : cssClasses.wrongAnswer;

    const answerText =
        event.type === ENEMY_EVENT_TYPES.HIT_CASTLE ? '' : event.answer.value;

    const answerSpan = createElement('span', {
        attributes: {
            className: `${cssClasses.answer} ${bgColorClass}`,
        },
        text: answerText,
    });

    if (event.type === ENEMY_EVENT_TYPES.HIT_CASTLE) {
        const iconI = createElement('i', {
            attributes: {
                className: cssClasses.hitCastleIcon,
                title: 'Enemy Hit Castle',
            },
        });
        answerSpan.appendChild(iconI);
    }

    return answerSpan;
}

function createQuestionHistoryTableRow(question, lastAnswersToShow) {
    const tableRow = createElement('tr');
    const questionData = createElement('td', { text: `${question.text} = ` });
    const questionAnswer = createElement('span', {
        text: question.answer.toString(),
        attributes: {
            className: `${cssClasses.answer} ${cssClasses.correctAnswer}`,
        },
    });
    const userAnswerData = createElement('td');

    question.events.slice(-lastAnswersToShow).forEach((event) => {
        const userAnswerEl = createQuestionHistoryUserAnswer(event);
        userAnswerData.appendChild(userAnswerEl);
    });

    questionData.appendChild(questionAnswer);
    tableRow.appendChild(questionData);
    tableRow.appendChild(userAnswerData);

    return tableRow;
}

function populateQuestionHistory(questionHistory, lastAnswersToShow) {
    const fragment = document.createDocumentFragment();

    questionHistory.forEach((question) => {
        const row = createQuestionHistoryTableRow(question, lastAnswersToShow);
        fragment.appendChild(row);
    });

    tableBody.replaceChildren(fragment);
}

export default populateQuestionHistory;
