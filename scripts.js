async function fetchRepos() {
    const githubResponse = await fetch('https://api.github.com/users/dk865/repos');
    const githubRepos = await githubResponse.json();
    const githubContainer = document.getElementById('github-container');
    githubContainer.innerHTML = '<div class="repo-label">GitHub Projects</div>';

    githubRepos.forEach(repo => {
        const repoElement = document.createElement('div');
        repoElement.className = 'repo';
        repoElement.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
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
                particleCount: 10,
                spread: 360,
                colors: ['#003757', '#005157'],
                origin: { y: 0.13 }
            });
        }, 100);
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1) translateY(0)';
        clearTimeout(iconTimeout);
    });
    
});
