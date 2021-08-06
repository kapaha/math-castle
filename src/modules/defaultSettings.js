const DEFAULT_SETTINGS = {
    SPAWN_POINTS: {
        FIRST_LANE: { x: -100, y: 35 },
        SECOND_LANE: { x: -100, y: 135 },
        THIRD_LANE: { x: -100, y: 235 },
    },
    POINTS: {
        CORRECT_ANSWER: 10,
        WRONG_ANSWER: -2,
        CASTLE_LIFE_LOST: -10,
    },
    enemySpeed: 30,
    enemySpeedIncrement: 3,
    spawnTimerMs: 2700,
    gameTimerMs: 300000,
    questionDifficulty: 'medium',
    castleStartingLives: 3,
    lastAnswersToShow: 5,
};

export default DEFAULT_SETTINGS;
