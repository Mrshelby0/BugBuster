// GitHub Issues Fetching & Displaying Logic
const searchButton = document.getElementById('search-button');
const repoInput = document.getElementById('repo-input');
const issuesContainer = document.getElementById('issues-container');
const loadingSpinner = document.getElementById('loading-spinner');
const errorMessage = document.getElementById('error-message');
const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('nav-links');
const userMenu = document.getElementById('user-menu');

// Simulate whether the user is logged in
let loggedIn = false; // Change to true to simulate a logged-in user
let username = "JohnDoe"; // Change to the logged-in username

// Toggle the hamburger menu for small screens
hamburgerBtn.addEventListener('click', () => {
    document.querySelector('.navbar').classList.toggle('open');
});

// Update the user menu based on login status
function updateUserMenu() {
    if (loggedIn) {
        userMenu.innerHTML = `<a href="#">Hello, ${username}</a>`;
    } else {
        userMenu.innerHTML = `<a href="#" onclick="signIn()">Sign In</a> | <a href="#" onclick="signUp()">Sign Up</a>`;
    }
}

// Simulate the sign-in process
function signIn() {
    alert("Sign-In functionality will be implemented later.");
}

// Simulate the sign-up process
function signUp() {
    alert("Sign-Up functionality will be implemented later.");
}

searchButton.addEventListener('click', fetchGitHubIssues);

async function fetchGitHubIssues() {
    const repoName = repoInput.value.trim();
    if (!repoName) {
        alert("Please enter a repository name!");
        return;
    }

    showLoading(true);
    clearPreviousIssues();

    try {
        const response = await fetch(`https://api.github.com/repos/${repoName}/issues?labels=good%20first%20issue,help%20wanted`);
        
        if (!response.ok) {
            throw new Error("Failed to fetch issues");
        }
        
        const issues = await response.json();
        
        if (issues.length === 0) {
            errorMessage.textContent = "No issues found for this repository.";
            errorMessage.style.display = "block";
        } else {
            displayIssues(issues);
        }
    } catch (error) {
        console.error("Error fetching issues:", error);
        errorMessage.textContent = "Oops! Something went wrong. Please try again.";
        errorMessage.style.display = "block";
    } finally {
        showLoading(false);
    }
}

function showLoading(isLoading) {
    if (isLoading) {
        loadingSpinner.style.display = "block";
        issuesContainer.style.display = "none";
    } else {
        loadingSpinner.style.display = "none";
        issuesContainer.style.display = "grid";
    }
}

function clearPreviousIssues() {
    issuesContainer.innerHTML = '';
    errorMessage.style.display = 'none'; // Hide error message if it's displayed
}