const DEFAULT_SETTINGS = {
    SPAWN_POINTS: {
        FIRST_LANE: { x: 0, y: 50 },
        SECOND_LANE: { x: 0, y: 165 },
        THIRD_LANE: { x: 0, y: 280 },
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
    lastAnswersToShow: 3,
};

export default DEFAULT_SETTINGS;
