document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const symbols = document.querySelectorAll('.symbol');

    // Arrastrar símbolos
    symbols.forEach(symbol => {
        symbol.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', symbol.dataset.type);
        });
    });

    // Soltar símbolos en el canvas
    canvas.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    canvas.addEventListener('drop', (e) => {
        e.preventDefault();
        const type = e.dataTransfer.getData('text/plain');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        createShape(type, x, y);
    });

    function createShape(type, x, y) {
        const element = document.createElement('div');
        element.classList.add('flowchart-shape');
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.position = 'absolute';
        
        let svg;
        switch(type) {
            case 'inicio':
                svg = `<svg viewBox="0 0 100 50">
                    <ellipse cx="50" cy="25" rx="45" ry="20" class="forma"/>
                </svg>`;
                break;
            case 'proceso':
                svg = `<svg viewBox="0 0 100 50">
                    <rect x="5" y="5" width="90" height="40" class="forma"/>
                </svg>`;
                break;
            case 'decision':
                svg = `<svg viewBox="0 0 100 50">
                    <polygon points="50,5 95,25 50,45 5,25" class="forma"/>
                </svg>`;
                break;
        }
        
        element.innerHTML = svg;
        canvas.appendChild(element);
        
        // Hacer las formas arrastrables
        makeShapeDraggable(element);
    }

    function makeShapeDraggable(element) {
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        
        element.addEventListener('mousedown', dragStart);
        element.addEventListener('mousemove', drag);
        element.addEventListener('mouseup', dragEnd);
        
        function dragStart(e) {
            initialX = e.clientX - element.offsetLeft;
            initialY = e.clientY - element.offsetTop;
            isDragging = true;
        }
        
        function drag(e) {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                element.style.left = `${currentX}px`;
                element.style.top = `${currentY}px`;
            }
        }
        
        function dragEnd() {
            isDragging = false;
        }
    }

    // Cambiar color
    const colorPicker = document.getElementById('color-picker');
    colorPicker.addEventListener('input', (e) => {
        document.querySelectorAll('.shape').forEach(shape => {
            shape.style.stroke = e.target.value;
        });
    });
});