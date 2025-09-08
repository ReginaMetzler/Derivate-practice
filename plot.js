// f(x) = x^2 + 10
function f(x) {
    return x * x + 10;
}
// f'(x) = 2x
function df(x) {
    return 2 * x;
}

const canvas = document.getElementById('plot');
const ctx = canvas.getContext('2d');
const derivCanvas = document.getElementById('derivPlot');
const derivCtx = derivCanvas.getContext('2d');
const x0Slider = document.getElementById('x0');
const x0Value = document.getElementById('x0-value');

function drawPlot(x0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Plot settings
    const w = canvas.width;
    const h = canvas.height;
    const xMin = -20, xMax = 20;
    const yMin = -120, yMax = 420;
    // Axes
    ctx.strokeStyle = '#888';
    ctx.beginPath();
    // x axis
    ctx.moveTo(0, h - (0 - yMin) / (yMax - yMin) * h);
    ctx.lineTo(w, h - (0 - yMin) / (yMax - yMin) * h);
    // y axis
    ctx.moveTo((0 - xMin) / (xMax - xMin) * w, 0);
    ctx.lineTo((0 - xMin) / (xMax - xMin) * w, h);
    ctx.stroke();
    // Tickmarks (x axis)
    ctx.strokeStyle = '#aaa';
    ctx.font = '12px Arial';
    for (let x = xMin; x <= xMax; x += 2) {
        const px = (x - xMin) / (xMax - xMin) * w;
        const py = h - (0 - yMin) / (yMax - yMin) * h;
        ctx.beginPath();
        ctx.moveTo(px, py - 5);
        ctx.lineTo(px, py + 5);
        ctx.stroke();
        ctx.fillStyle = '#555';
        ctx.textAlign = 'center';
        ctx.fillText(x, px, py + 18);
    }
    // Tickmarks (y axis)
    for (let y = yMin; y <= yMax; y += 20) {
        const py = h - (y - yMin) / (yMax - yMin) * h;
        const px = (0 - xMin) / (xMax - xMin) * w;
        ctx.beginPath();
        ctx.moveTo(px - 5, py);
        ctx.lineTo(px + 5, py);
        ctx.stroke();
        ctx.fillStyle = '#555';
        ctx.textAlign = 'right';
        ctx.fillText(y, px - 8, py + 4);
    }
    // Plot f(x)
    ctx.strokeStyle = '#0074D9';
    ctx.beginPath();
    for (let px = 0; px <= w; px++) {
        const x = xMin + (xMax - xMin) * px / w;
        const y = f(x);
        const py = h - (y - yMin) / (yMax - yMin) * h;
        if (px === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.stroke();
    // Plot point (x0, f(x0))
    const px0 = (x0 - xMin) / (xMax - xMin) * w;
    const py0 = h - (f(x0) - yMin) / (yMax - yMin) * h;
    ctx.fillStyle = '#FF4136';
    ctx.beginPath();
    ctx.arc(px0, py0, 6, 0, 2 * Math.PI);
    ctx.fill();
    // Draw line through origo and (x0, f(x0)), extended in both directions
    const pxOrigo = (0 - xMin) / (xMax - xMin) * w;
    const pyOrigo = h - (0 - yMin) / (yMax - yMin) * h;
    ctx.save();
    ctx.strokeStyle = '#8e44ad';
    ctx.lineWidth = 2;
    ctx.setLineDash([7, 7]);
    // Calculate slope
    let x1 = xMin;
    let y1 = (f(x0) / x0) * x1;
    let x2 = xMax;
    let y2 = (f(x0) / x0) * x2;
    // Special case: x0 == 0 (vertical line)
    if (x0 === 0) {
        x1 = 0;
        x2 = 0;
        y1 = yMin;
        y2 = yMax;
    }
    const px1 = (x1 - xMin) / (xMax - xMin) * w;
    const py1 = h - (y1 - yMin) / (yMax - yMin) * h;
    const px2 = (x2 - xMin) / (xMax - xMin) * w;
    const py2 = h - (y2 - yMin) / (yMax - yMin) * h;
    ctx.beginPath();
    ctx.moveTo(px1, py1);
    ctx.lineTo(px2, py2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
    // Dotted lines from point to axes
    ctx.save();
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = '#111';
    // Vertical (to x axis)
    ctx.beginPath();
    ctx.moveTo(px0, py0);
    ctx.lineTo(px0, h - (0 - yMin) / (yMax - yMin) * h);
    ctx.stroke();
    // Horizontal (to y axis)
    ctx.beginPath();
    ctx.moveTo(px0, py0);
    ctx.lineTo((0 - xMin) / (xMax - xMin) * w, py0);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
    // Draw colored x0 and f(x0) on axes
    ctx.font = 'bold 14px Arial';
    // x0 on x axis
    ctx.fillStyle = '#e67e22';
    ctx.textAlign = 'center';
    ctx.fillText('x₀ = ' + x0, px0, h - (0 - yMin) / (yMax - yMin) * h + 35);
    // f(x0) on y axis
    ctx.fillStyle = '#2980b9';
    ctx.textAlign = 'right';
    ctx.fillText('y = ' + f(x0), (0 - xMin) / (xMax - xMin) * w - 10, py0 + 5);
}

function drawDerivPlot(x0) {
    derivCtx.clearRect(0, 0, derivCanvas.width, derivCanvas.height);
    // Plot settings
    const w = derivCanvas.width;
    const h = derivCanvas.height;
    const xMin = -20, xMax = 20;
    const yMin = -120, yMax = 120;
    // Axes
    derivCtx.strokeStyle = '#888';
    derivCtx.beginPath();
    // x axis
    derivCtx.moveTo(0, h - (0 - yMin) / (yMax - yMin) * h);
    derivCtx.lineTo(w, h - (0 - yMin) / (yMax - yMin) * h);
    // y axis
    derivCtx.moveTo((0 - xMin) / (xMax - xMin) * w, 0);
    derivCtx.lineTo((0 - xMin) / (xMax - xMin) * w, h);
    derivCtx.stroke();
    // Tickmarks (x axis)
    derivCtx.strokeStyle = '#aaa';
    derivCtx.font = '12px Arial';
    for (let x = xMin; x <= xMax; x += 2) {
        const px = (x - xMin) / (xMax - xMin) * w;
        const py = h - (0 - yMin) / (yMax - yMin) * h;
        derivCtx.beginPath();
        derivCtx.moveTo(px, py - 5);
        derivCtx.lineTo(px, py + 5);
        derivCtx.stroke();
        derivCtx.fillStyle = '#555';
        derivCtx.textAlign = 'center';
        derivCtx.fillText(x, px, py + 18);
    }
    // Tickmarks (y axis)
    for (let y = yMin; y <= yMax; y += 5) {
        const py = h - (y - yMin) / (yMax - yMin) * h;
        const px = (0 - xMin) / (xMax - xMin) * w;
        derivCtx.beginPath();
        derivCtx.moveTo(px - 5, py);
        derivCtx.lineTo(px + 5, py);
        derivCtx.stroke();
        derivCtx.fillStyle = '#555';
        derivCtx.textAlign = 'right';
        derivCtx.fillText(y, px - 8, py + 4);
    }
    // Plot f'(x)
    derivCtx.strokeStyle = '#2ECC40';
    derivCtx.beginPath();
    for (let px = 0; px <= w; px++) {
        const x = xMin + (xMax - xMin) * px / w;
        const y = df(x);
        const py = h - (y - yMin) / (yMax - yMin) * h;
        if (px === 0) derivCtx.moveTo(px, py);
        else derivCtx.lineTo(px, py);
    }
    derivCtx.stroke();
    // Plot point (x0, f'(x0))
    const px0 = (x0 - xMin) / (xMax - xMin) * w;
    const py0 = h - (df(x0) - yMin) / (yMax - yMin) * h;
    derivCtx.fillStyle = '#FF4136';
    derivCtx.beginPath();
    derivCtx.arc(px0, py0, 6, 0, 2 * Math.PI);
    derivCtx.fill();
    // Dotted lines from point to axes
    derivCtx.save();
    derivCtx.setLineDash([5, 5]);
    derivCtx.strokeStyle = '#111';
    // Vertical (to x axis)
    derivCtx.beginPath();
    derivCtx.moveTo(px0, py0);
    derivCtx.lineTo(px0, h - (0 - yMin) / (yMax - yMin) * h);
    derivCtx.stroke();
    // Horizontal (to y axis)
    derivCtx.beginPath();
    derivCtx.moveTo(px0, py0);
    derivCtx.lineTo((0 - xMin) / (xMax - xMin) * w, py0);
    derivCtx.stroke();
    derivCtx.setLineDash([]);
    derivCtx.restore();
    // Draw colored x0 and f'(x0) on axes
    derivCtx.font = 'bold 14px Arial';
    // x0 on x axis
    derivCtx.fillStyle = '#e67e22';
    derivCtx.textAlign = 'center';
    derivCtx.fillText('x₀ = ' + x0, px0, h - (0 - yMin) / (yMax - yMin) * h + 35);
    // f'(x0) on y axis
    derivCtx.fillStyle = '#2980b9';
    derivCtx.textAlign = 'right';
    derivCtx.fillText('y = ' + df(x0), (0 - xMin) / (xMax - xMin) * w - 10, py0 + 5);
}

function update() {
    const x0 = parseFloat(x0Slider.value);
    x0Value.textContent = x0;
    drawPlot(x0);
    drawDerivPlot(x0);
    // Show coordinates above the Function plot
    const coordsDiv = document.getElementById('coords');
    coordsDiv.innerHTML = `<span style="color:#e67e22;font-weight:bold;">x₀ = ${x0}</span>, <span style="color:#2980b9;font-weight:bold;">y = ${f(x0)}</span>`;
}

x0Slider.addEventListener('input', update);
window.onload = update;
