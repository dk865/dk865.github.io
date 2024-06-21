//Welcome to my Lair!

//This fetches all of my GitHub Repos and puts them in that Fancy box thing
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

// Use Canvas Confetti Script to create confetti when the user has the correct decision to add my repo
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

// Emits 1 confetti piece when they hover a mouse over it (hmmm... not useful for a mobile device adding my repo...)
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
});

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
    "For the good of all of us, except the ones who are dead.",
    "You just keep on trying 'till you run out of cake"
];

// Randomly select the quote
function displayRandomQuote() {
    const quoteElement = document.getElementById('quote');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.classList.remove('visible');
    setTimeout(() => {
        quoteElement.innerText = quotes[randomIndex];
        quoteElement.classList.add('visible');
    }, 0); //Old logic I never deleted...
}

displayRandomQuote();

// Platform detection
const platform = navigator.platform.toLowerCase();
const iosButtons = document.getElementById('ios-buttons');
const altOption = document.getElementById('alt-option');
const linuxRepo = document.getElementById('linux-repo');

if (platform.includes('iphone') || platform.includes('g') || platform.includes('ipod')) {
    iosButtons.style.display = 'flex';
    altOption.style.display = 'block';
    linuxRepo.style.display = 'none';
} else if (platform.includes('ipad')) {
    iosButtons.style.display = 'none';
    altOption.style.display = 'none';
    linuxRepo.style.display = 'block';
} else {
    iosButtons.style.display = 'none';
    altOption.style.display = 'none';
    linuxRepo.style.display = 'none';
}
