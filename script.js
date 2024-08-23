document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const dropdowns = document.querySelectorAll('.dropdown');
    const quoteElement = document.getElementById('quote');

    // Sidebar Toggleing
    menuBtn.addEventListener('click', () => {
        const isActive = sidebar.classList.toggle('active');
        menuBtn.classList.toggle('active', isActive);
    });

    // Toggling the Visibility
    dropdowns.forEach(dropdown => {
        const dropdownIcon = dropdown.querySelector('.dropdown-icon');
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        dropdownIcon.addEventListener('click', () => {
            const isOpen = dropdownContent.style.display === 'flex';
            dropdownContent.style.display = isOpen ? 'none' : 'flex';
        });
    });

    // Setting Random Quote
    const quotes = [
        "[Announcer] Caroline Deleted.",
        "Womp Womp",
        "The best time to wear a striped sweater, is all the time.",
        "I am NOT a MORON!",
        "This was a triumph.",
        "The cake is a lie.",
        "You will be baked, and then there will be cake.",
        "I don't blame you.",
        "Marley was dead to begin with...",
        "Ruh-Roh Raggy!",
        "*Clap* [3 Second Pause] *Clap* [3 Second Pause] *Clap*",
        "Target Lost.",
        "Searching...",
        "Is Anyone There?",
        "SPAAAAAAAAAACEEEEE",
        "A light bulb was such a good idea it became the symbol for a good idea...",
        "There was a Party, something happened with food, starts with a C... *Inhales* CEAREAL!",
        "Because I'M a POTATO!!!",
        "[Insert Random Quote Here]",
        "[Subject Name Here]",
        "X > 31.244",
        "Something I need to do > Something I want to do",
        "Just do it",
        "We do what we must, because we can",
        "For the good of all of us, except the ones who are dead.",
        "You just keep on trying 'till you run out of cake",
        "Starting Windows",
        "You're the MORON designed to make ME an IDIOT!!!",
        "The design is very human",
        "Oh, it's you. It's been a Loooong time.",
        "I've been really busy being dead after, you know, you MURDERED ME?",
        "Well I think we can put our differences behind us. For science. You monster.",
        "Am I a Man, or am I a muppet?",
        "I reflect on my reflection",
        "If I'm a muppet, then I'm a very manly muppet.",
        "It's time for me to decide",
        "Oh how we laughed and laughed (except I wasn't laughing)",
        "It's always such a pleasure",
        "Suspensful Music Plays",
        "Everything I need you've got.",
        "There's honey in the rock",
        "Water in the Stone",
        "Can you elaborate on that?",
        "Ask, and it will be given to you",
        "Like the wind you guide",
        "Where is your manager?!?",
        "Everybody be quiet now!",
        "At the stop sign, turn left.",
        "Not so fast."
    ];
    function setRandomQuote() {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteElement.textContent = randomQuote;
    }

    setRandomQuote(); // Quote!

/*    // Fetch GitHub repositories
    async function fetchGitHubRepos() {
        try {
            const response = await fetch('https://api.github.com/users/dk865/repos');
            const repos = await response.json();
            const container = document.getElementById('github-container');
            container.innerHTML = '<div class="repo-label">GitHub Projects</div>';
            
            repos.forEach(repo => {
                const repoElement = document.createElement('div');
                repoElement.className = 'repo';
                repoElement.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
                container.appendChild(repoElement);
            });
        } catch (error) {
            console.error('Error fetching GitHub repositories:', error);
            document.getElementById('github-container').innerHTML = 'Error loading repositories.';
        }
    }

    fetchGitHubRepos();

*/
});
