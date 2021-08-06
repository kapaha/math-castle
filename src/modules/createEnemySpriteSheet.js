import enemySpriteSheet from '../img/enemySpriteSheet.png';
import enemySpriteSheet2 from '../img/enemySpriteSheet2.png';
import enemySpriteSheet3 from '../img/enemySpriteSheet3.png';

const sprite = new Image();
sprite.src = enemySpriteSheet;

const sprite2 = new Image();
sprite2.src = enemySpriteSheet2;

const sprite3 = new Image();
sprite3.src = enemySpriteSheet3;

const spriteSheets = [sprite, sprite2, sprite3];

const scale = 0.2;
const spriteSheetWidth = 12060 * scale;
const spriteSheetHeight = 490 * scale;
const spriteSheetColumns = 18;
const spriteSheetRows = 1;
const frameWidth = spriteSheetWidth / spriteSheetColumns;
const frameHeight = spriteSheetHeight / spriteSheetRows;
const frameInterval = 50;
const maxFrameX = 17;
const frameY = 0;

function getRandomSpriteSheet() {
    return spriteSheets[Math.floor(Math.random() * spriteSheets.length)];
}

function getBackgroundSize() {
    return `${spriteSheetWidth}px ${spriteSheetHeight}px`;
}

function createEnemySpriteSheet() {
    let timeSinceLastFrame = 0;
    let frameX = 0;

    function incFrameX() {
        if (frameX >= maxFrameX) frameX = 0;
        else frameX += 1;
    }

    function getBackgroundPosition() {
        return `-${frameWidth * frameX}px -${frameHeight * frameY}px`;
    }

    function update(deltaTime) {
        timeSinceLastFrame += deltaTime;
        if (timeSinceLastFrame > frameInterval) {
            incFrameX();
            timeSinceLastFrame = 0;
        }
    }

    return {
        sprite: getRandomSpriteSheet(),
        frameWidth,
        frameHeight,
        getRandomSpriteSheet,
        getBackgroundPosition,
        getBackgroundSize,
        update,
    };
}

export default createEnemySpriteSheet;
