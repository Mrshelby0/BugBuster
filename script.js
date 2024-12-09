// DOM Elements
const searchButton = document.getElementById('search-button');
const repoInput = document.getElementById('repo-input');
const issuesContainer = document.getElementById('issues-container');
const loadingSpinner = document.getElementById('loading-spinner');
const errorMessage = document.getElementById('error-message');
const navLinks = document.getElementById('nav-links');
const userMenu = document.getElementById('user-menu');

// User Authentication Simulation
let loggedIn = false; // Change to true to simulate a logged-in user
let username = "JohnDoe"; // Example username

// Event Listeners
hamburgerBtn.addEventListener('click', toggleNavbar);
searchButton.addEventListener('click', fetchGitHubIssues);

// Initialize the User Menu
updateUserMenu();

/**
 * Toggle the visibility of the navbar menu for mobile devices.
 */
function toggleNavbar() {
    navLinks.classList.toggle('hidden');
    navLinks.classList.toggle('flex');
}

/**
 * Update the user menu to display login options or a personalized greeting.
 */
function updateUserMenu() {
    userMenu.innerHTML = loggedIn
        ? `<a href="#">Hello, ${username}</a>`
        : `<a href="#" onclick="signIn()">Sign In</a> | <a href="#" onclick="signUp()">Sign Up</a>`;
}

/**
 * Simulate the sign-in process.
 */
function signIn() {
    alert("Sign-In functionality will be implemented later.");
}

/**
 * Simulate the sign-up process.
 */
function signUp() {
    alert("Sign-Up functionality will be implemented later.");
}

/**
 * Fetch GitHub issues from a repository and display them.
 */
async function fetchGitHubIssues() {
    const repoName = repoInput.value.trim();

    if (!repoName) {
        alert("Please enter a valid repository name!");
        return;
    }

    toggleLoading(true);
    clearPreviousIssues();

    try {
        const response = await fetch(`https://api.github.com/repos/${repoName}/issues?labels=good%20first%20issue,help%20wanted`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch issues: ${response.statusText}`);
        }

        const issues = await response.json();

        if (issues.length === 0) {
            showMessage("There are no issues in this repo.");
        } else {
            displayIssues(issues);
        }
    } catch (error) {
        console.error("Error fetching issues:", error);
        showMessage("An error occurred. Please check the repository name and try again.");
    } finally {
        toggleLoading(false);
    }
}

/**
 * Toggle the loading spinner and issues container visibility.
 * @param {boolean} isLoading - Whether to show the loading spinner.
 */
function toggleLoading(isLoading) {
    loadingSpinner.style.display = isLoading ? "block" : "none";
    issuesContainer.style.display = isLoading ? "none" : "grid";
}

/**
 * Clear previously displayed issues and error messages.
 */
function clearPreviousIssues() {
    issuesContainer.innerHTML = '';
    errorMessage.style.display = 'none';
}

/**
 * Display a message in the error message container.
 * @param {string} message - The message to display.
 */
function showMessage(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
}

/**
 * Display the fetched GitHub issues in the issues container.
 * @param {Array} issues - The list of GitHub issues to display.
 */
function displayIssues(issues) {
    issues.forEach(issue => {
        const issueCard = document.createElement('div');
        issueCard.className = "issue-card border p-4 rounded-lg shadow hover:shadow-lg transition";

        issueCard.innerHTML = `
            <h3 class="font-bold text-lg text-blue-500 hover:underline">
                <a href="${issue.html_url}" target="_blank">${issue.title}</a>
            </h3>
            <p class="text-gray-600">${issue.body ? issue.body.slice(0, 100) + "..." : "No description provided."}</p>
            <p class="text-sm text-gray-400 mt-2">Created by: ${issue.user.login}</p>
        `;

        issuesContainer.appendChild(issueCard);
    });
}
