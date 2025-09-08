// Derivative calculator for f(x) = 3x^4 - 5x^2 + 7
// The derivative is f'(x) = 12x^3 - 10x

function f(x) {
    return 3 * Math.pow(x, 4) - 5 * Math.pow(x, 2) + 7;
}

function derivativeF(x) {
    return 12 * Math.pow(x, 3) - 10 * x;
}

// Simple UI
window.onload = function() {
    const input = document.createElement('input');
    input.type = 'number';
    input.placeholder = 'Enter x';
    input.id = 'xValue';

    const button = document.createElement('button');
    button.textContent = 'Calculate f(x) and f\'(x)';
    button.onclick = function() {
        const x = parseFloat(input.value);
        if (isNaN(x)) {
            result.textContent = 'Please enter a valid number.';
            return;
        }
        const fx = f(x);
        const dfx = derivativeF(x);
        result.textContent = `f(${x}) = ${fx}, f'(${x}) = ${dfx}`;
    };

    const result = document.createElement('div');
    result.id = 'result';
    result.style.marginTop = '10px';

    document.body.appendChild(input);
    document.body.appendChild(button);
    document.body.appendChild(result);
};
