const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const dialogueText = document.getElementById('dialogueText');
const characterImage = document.getElementById('characterImage');
const typeSound = document.getElementById('typeSound');

let currentStage = 'start';

// Event listeners se añaden UNA VEZ, fuera del handler
button1.addEventListener('click', () => handleButtonClick(button1.dataset.next));
button2.addEventListener('click', () => handleButtonClick(button2.dataset.next));

function handleButtonClick(nextStage) {
    if (!nextStage) return;

    currentStage = nextStage;
    const stageData = dialogStages[currentStage];

    if (!stageData) {
        console.error("Stage data not found for:", currentStage);
        return;
    }

    typeText(stageData.text, () => {
        characterImage.src = stageData.image || characterImage.src;
        updateButtons(stageData.button1, stageData.button2);

        // Ejecuta la acción si está definida
        if (stageData.action) {
            stageData.action();
        }
    });
}

function updateButtons(text1, text2) {
    button1.innerText = text1;
    button2.innerText = text2;
    button2.style.display = text2 ? 'inline-block' : 'none';

    // Establece la siguiente etapa para cada botón usando atributos de datos
    button1.dataset.next = dialogStages[currentStage]?.nextStage1;
    button2.dataset.next = dialogStages[currentStage]?.nextStage2;
}

function typeText(text, callback) {
    dialogueText.innerText = '';
    const buttons = document.querySelectorAll('.buttons button');

    buttons.forEach(button => button.disabled = true);

    typeSound.play();

    let index = 0;
    function type() {
        if (index < text.length) {
            dialogueText.innerHTML += text.charAt(index) === ' ' ? '&nbsp;' : text.charAt(index);
            index++;
            setTimeout(type, 50);
        } else {
            typeSound.pause();
            typeSound.currentTime = 0;
            buttons.forEach(button => button.disabled = false);
            if (callback) callback();
        }
    }
    type();
}

// Función para abrir PDF
function openPDF() {
    window.open('dpoc.pdf', '_blank'); // Reemplaza 'ruta_al_pdf.pdf' con la ruta real al archivo PDF
}

// Función para abrir video de YouTube
function openYouTubeVideo() {
    window.open('https://www.youtube.com/watch?v=R5cbxTPZNL0&pp=ygUOZW5hbW9yYWRvIHR1eW8%3D', '_blank'); // Reemplaza 'https://www.youtube.com/your_youtube_video_id' con la URL del video de YouTube
}

// Creación de estrellas (sin cambios)
function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 5000);
}
setInterval(createStar, 100);

// Datos del diálogo (con modificaciones)
const dialogStages = {
    start: {
        text: 'Buenas, como dijo mi abuelo',
        image: null,
        button1: 'que dijo??',
        button2: 'zzzz',
        nextStage1: 'grandpaQuote',
        nextStage2: 'zzz'
    },
    grandpaQuote: {
        text: 'Nose no tengo',
        image: null,
        button1: 'zzz',
        button2: '???',
        nextStage1: 'zzz',
        nextStage2: 'message'
    },
    zzz: {
        text: 'zzzzzzzzzz',
        image: null,
        button1: 'que dijo??',
        button2: 'zzzz',
        nextStage1: 'grandpaQuote',
        nextStage2: 'zzz'
    },
    message: {
        text: 'no te creas, alguien te dejo un mensaje',
        image: null,
        button1: 'Nose',
        button2: 'Nose',
        nextStage1: 'nose1',
        nextStage2: 'nose2'
    },
    nose1: {
        text: 'mensaje 1',
        image: null,
        button1: 'Nose',
        button2: 'Nose',
        nextStage1: 'nose1',
        nextStage2: 'nose2',
        action: openPDF // Llama a la función openPDF al llegar a esta etapa
    },
    nose2: {
        text: 'mensaje 2',
        image: null,
        button1: 'Nose',
        button2: 'Nose',
        nextStage1: 'nose1',
        nextStage2: 'nose2',
        action: openYouTubeVideo // Llama a la función openYouTubeVideo al llegar a esta etapa
    }
};

// Inicializa la primera etapa del diálogo
handleButtonClick('start');