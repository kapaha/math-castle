function hideElement(element) {
    const el = element;
    el.style.display = 'none';
}

function showElement(element, displayValue) {
    const el = element;
    el.style.display = displayValue;
}

function createElement(tagName, { attributes = {}, text } = {}) {
    const el = document.createElement(tagName);

    Object.assign(el, attributes);

    if (text) el.appendChild(document.createTextNode(text));

    return el;
}

export { hideElement, showElement, createElement };
