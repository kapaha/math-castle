function hideElement(element) {
    const el = element;
    el.style.display = 'none';
}

function showElement(element, displayValue) {
    const el = element;
    el.style.display = displayValue;
}

export { hideElement, showElement };
