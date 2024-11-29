// Example Appwrite Integration
const appwrite = new Appwrite();
appwrite.setEndpoint('http://localhost/v1').setProject('YOUR_PROJECT_ID');

// Login Function
document.getElementById('login-button').addEventListener('click', async () => {
    try {
        await appwrite.account.createOAuth2Session('github');
        alert('Logged in successfully!');
    } catch (err) {
        console.error(err);
        alert('Login failed.');
    }
});

// Fetch Issues from Appwrite Database
async function fetchIssues() {
    try {
        const response = await appwrite.database.listDocuments('ISSUES_COLLECTION_ID');
        const issues = response.documents;

        const issuesContainer = document.getElementById('issues-container');
        issuesContainer.innerHTML = '';
        
        issues.forEach(issue => {
            const issueDiv = document.createElement('div');
            issueDiv.innerHTML = `<h3>${issue.title}</h3><p>${issue.description}</p>`;
            issuesContainer.appendChild(issueDiv);
        });
    } catch (err) {
        console.error(err);
    }
}

// Call Fetch Issues on Page Load
fetchIssues();
