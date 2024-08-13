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
        //... (other quotes)
    ];
    function setRandomQuote() {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteElement.textContent = randomQuote;
    }

    setRandomQuote(); // Quote!

    // Fetch GitHub repositories
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
});