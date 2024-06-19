// Platform detection and element visibility
document.addEventListener('DOMContentLoaded', function () {
    let currentPlatform = detectPlatform();
    updateUI(currentPlatform);
});

function detectPlatform() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (userAgent.indexOf('Linux') > -1) return 'Linux';
    if (userAgent.indexOf('Android') > -1) return 'Android';
    if (userAgent.indexOf('Windows') > -1) return 'Windows';
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return 'iOS';
    return 'Unknown';
}

function updateUI(platform) {
    const repoButtons = document.getElementById('repo-buttons');
    const linuxRepo = document.getElementById('linux-repo');
    const packageManagerText = document.getElementById('package-manager-text');

    if (platform === 'Linux') {
        repoButtons.style.display = 'none';
        linuxRepo.style.display = 'block';
        packageManagerText.style.display = 'none';
    } else if (platform === 'iOS') {
        repoButtons.style.display = 'flex';
        linuxRepo.style.display = 'none';
        packageManagerText.style.display = 'block';
    } else if (platform === 'Windows' || platform === 'Android') {
        repoButtons.style.display = 'none';
        linuxRepo.style.display = 'none';
        packageManagerText.style.display = 'none';
    }
}

// Quotes that will be randomly selected upon loading
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
    "SPAAAAAAAAAACEEEEE",
    "Shoot the moon kid!",
    "I'm CrInGiNg!",
    "Pork. Sausage. Bacon. SCRAPPLE!!!",
    "Who even is Jon Doe?",
    "A light bulb was such a good idea it became the symbol for a good idea...",
    "import tkinter as tk",
    "from tkinter import tkk",
    "If only Xcode was available for Windows 7... or iOS... or any OS that's not Mac...",
    "Why doesn't Python3 support Windows XP?",
    "If only WSL worked on Windows 7...",
    "Duh Duh Duh, duh duh duh Duh Duh Duh...",
    "CEREAL!!!",
    "Oatmeal?",
    "Because I'M a POTATO!!!",
    "[Insert Random Quote Here]",
    "[Subject Name Here]",
    "Oh, hi O!",
    "Synthesia needs more particle effects.",
    "Why can't all the (jb) tweaks be free?",
    "The satisfaction when you win a giveaway",
    "X > 31.244",
    "Yet another day and I still haven't used 'y = mx + b' (:",
    "Something I need to do > Something I want to do",
    "Just do it",
    "We do what we must, because we can",
    "For the good of all of us. Except the ones who are dead.",
    "But there's no sense crying over every mistake, you just keep on trying till you run out of cake.",
    "You keep on trying till you run out of cake...",
    "Man, I LOVE this game!",
    "Thanks to you, I think I've been well-prepared. As far as heroes go, I'd say you're not too bad.",
    "Yay!",
    "Hey, remember when you tried to kill me twice?",
    "Oh, how we laughed and laughed...",
    "Do you have an alibi?",
    "That's still unconfirmed. Investigations pending, but..."
];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
document.getElementById('quote').innerText = randomQuote;

// Fetch GitHub Repos
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

// Create confetti on button click
function createConfetti(color) {
    return function (event) {
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
});

function createHoverConfetti(color) {
    return function (event) {
        if (event.type === 'mouseover') {
            confetti({
                particleCount: 5,
                spread: 50,
                origin: {
                    x: event.clientX / window.innerWidth,
                    y: event.clientY / window.innerHeight
                },
                colors: [color]
            });
        }
    };
}