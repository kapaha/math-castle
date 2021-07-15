// enemy class
class Enemy {
    // private properties
    _element = document.createElement('div');
    _width = 50; // enemy size (still not sure about the right size)
    _height = 50;
    _x;
    _y;
    _speed;
    _selected; // boolean
    _question;
    _answer;

    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    // getters
    getSpeed = () => {
        return this._speed;
    };

    getSelected = () => {
        return this._selected;
    };

    getQuestion = () => {
        return this._question;
    };

    getAnswer = () => {
        return this._answer;
    };

    // setters

    setSelected = (selected) => {
        this._selected = selected;
    };

    setQuestion = () => {
        // should access questions data and assign it to _question property
    };

    setAnswer = () => {
        // should access questions data and assign right answer to _answer property
    };

    // methods

    _draw = () => {
        // draw the enemy to the DOM
    };

    _update = () => {
        // update enemy x position
    };

    _delete = () => {
        // delete enemy once collided or attacked
    };
}

export default Enemy;
