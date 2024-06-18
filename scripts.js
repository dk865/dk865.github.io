async function fetchRepos() {
    const githubResponse = await fetch('https://api.github.com/users/dk865/repos');
    const githubRepos = await githubResponse.json();
    const githubContainer = document.getElementById('github-container');
    githubContainer.innerHTML = '<div class="repo-label">GitHub Projects</div>';

    githubRepos.forEach(repo => {
        const repoElement = document.createElement('div');
        repoElement.className = 'repo';
        repoElement.innerHTML = `<a href="${repo.html_url}">${repo.name}</a>`;
        githubContainer.appendChild(repoElement);
    });
}

fetchRepos();

function createConfetti(color) {
    return function(event) {
        confetti({
            particleCount: 15,
            spread: 70,
            origin: {
                x: event.clientX / window.innerWidth,
                y: event.clientY / window.innerHeight
            },
            colors: [color]
        });
    };
}

const buttons = document.querySelectorAll('.button');

function createHoverConfetti(color) {
    return function(event) {
        confetti({
            particleCount: 1,
            spread: 20,
            origin: {
                x: event.clientX / window.innerWidth,
                y: event.clientY / window.innerHeight
            },
            colors: [color]
        });
    };
}

buttons.forEach(button => {
    let color;
    if (button.classList.contains('button-blue')) {
        color = '#00d9ff';
    } else if (button.classList.contains('button-purple')) {
        color = '#b64bfd';
    } else if (button.classList.contains('button-red')) {
        color = '#ff9d4e';
    } else if (button.classList.contains('button-brown-orange')) {
        color = '#ffc400';
    }

    button.addEventListener('click', createConfetti(color));
    button.addEventListener('mouseover', createHoverConfetti(color));


    const icon = document.querySelector('.icon');
    let iconTimeout;
    
    icon.addEventListener('mousedown', () => {
        icon.style.transform = 'scale(0.95) translateY(5px)';
    });
    
    icon.addEventListener('mouseup', () => {
        icon.style.transform = 'scale(1) translateY(0) rotate(0)';
        icon.style.transition = 'transform 0.5s ease';
        iconTimeout = setTimeout(() => {
            icon.style.transform = 'rotate(360deg)';
            confetti({
                particleCount: 15,
                spread: 360,
                startVelocity: 10,
                colors: ['#003757', '#005157'],
                origin: { y: 0.125 }
            });
        }, 100);
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1) translateY(0)';
        clearTimeout(iconTimeout);
    });
    
});

// Array of quotes
const quotes = [
    "[Announcer] Caroline Deleted.",
    "Womp Womp",
    "The best time to wear a striped sweater, is all the time.",
    "I am NOT a MORON!",
    "Ba duh duh duh-duh duh duh circus duh duh duh duh-duh duh duh afro...",
    "This was a triumph.",
    "The cake is a lie.",
    "You will be baked, and then there will be cake.",
    "I don't blame you.",
    "Marley was dead to begin with...",
    "Ruh-Roh Raggy!",
    "*Clap* [3 Second Pause] *Clap* [3 Second Pause] *Clap*",
    "Target Lost.",
    "I 'C' a 'Python', 'Swift'ly get it out of here!!!",
    "SPAAAAAAAAAACEEEEE",
    "Shoot the moon kid!",
    "I'm CrInGiNg!",
    "Pork. Sausage. Bacon. Ms. Piggy. SCRAPPLE!!!",
    "Who even is Jon Doe?",
    "Settings -> General -> About (take a screenshot and send it to me)",
    "A light bulb was such a good idea it became the symbol for a good idea...",
    "import tkinter as tk",
    "from tkinter import tkk",
    "If only Xcode was available for Windows 7... or iOS... or any OS that's not Mac...",
    "Why doesn't Python3 support Windows XP?",
    "If only WSL worked on Windows 7..."
];

// Function to display a random quote with animation
function displayRandomQuote() {
    const quoteElement = document.getElementById('quote');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.classList.remove('visible');
    setTimeout(() => {
        quoteElement.innerText = quotes[randomIndex];
        quoteElement.classList.add('visible');
    }, 0); // Delay to allow for the opacity transition
}

// Call the function to display a random quote when the page loads
displayRandomQuote();