const descriptionElement = document.getElementById('description');

const description = `opa, meu nome é Luís ou mingoo, me chame como quiser. 
gosto de passar o tempo jogando ou criando scripts
tenho 19 anos e tô no 2 ano do ensino médio
pretendo fazer faculdade de medicina quando terminar a escola.

não costumo falar muito sobre minha vida pessoal, na maior parte do tempo tento ser minha melhor versão.`;

let lineIndex = 0;
const lines = description.split('\n');
const typingSpeed = 30;

function typeLine(line, callback) {
    let charIndex = 0;

    function addChar() {
        if (charIndex < line.length) {
            descriptionElement.textContent += line.charAt(charIndex);
            charIndex++;
            descriptionElement.parentElement.scrollTop = descriptionElement.parentElement.scrollHeight;
            setTimeout(addChar, typingSpeed);
        } else {
            descriptionElement.textContent += '\n'; // Adiciona a quebra de linha ao final
            descriptionElement.parentElement.scrollTop = descriptionElement.parentElement.scrollHeight;
            if (callback) callback();
        }
    }

    addChar();
}

function scrollDescription() {
    if (lineIndex < lines.length) {
        typeLine(lines[lineIndex], () => {
            lineIndex++;
            setTimeout(scrollDescription, 200); // Delay entre as linhas
        });
    }
}

window.onload = () => {
    const audio = document.getElementById('audio');
    const startBtn = document.getElementById('startBtn');
    const container = document.querySelector('.container');

    startBtn.style.opacity = '1'; // Certifique-se de que o botão está visível desde o início.

    startBtn.addEventListener('click', () => {
        // Esconde o botão com fade-out
        startBtn.style.transition = 'opacity 1s';
        startBtn.style.opacity = '0';

        setTimeout(() => {
            startBtn.style.display = 'none';

            // Mostra o conteúdo com fade-in
            container.style.opacity = '1';

            // Toca a música
            audio.play();

            // Espera o fade-in da container antes de iniciar a digitação
            setTimeout(() => {
                scrollDescription();
            }, 1500);

        }, 1000); // Espera o botão sumir
    });
};
