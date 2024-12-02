const commentsContainer = document.getElementById('commentsContainer');
let comments = [];

// Function to display comments on the page
function displayComments() {
    commentsContainer.innerHTML = '';
    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment-box');
        commentDiv.innerHTML = `
            <p class="comment-name">${comment.name}</p>
            <label class="comment-other"><strong>Age : </strong>${comment.age}</label>
            <label class="comment-other"><strong>Email : </strong>${comment.email}</label>
            <label class="comment-other"><strong>Website : </strong><a href="${comment.website}" target="_blank">${comment.website}</a></label>
            <label class="comment-other"><strong>Feedback : </strong>${comment.feedback}</label>
        `;
        commentsContainer.appendChild(commentDiv);
    });
}

// Handle form submission
document.getElementById('guestForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value.trim();
    const email = document.getElementById('email').value.trim();
    const website = document.getElementById('website').value.trim() || 'N/A';
    const feedback = document.getElementById('feedback').value.trim();

    if (name && age && feedback) {
        comments.push({ name, age, email, website, feedback });
        displayComments();
        document.getElementById('guestForm').reset();
    }
});

// Function to download comments as a .txt file
document.getElementById('downloadBtn').addEventListener('click', function () {
    let commentText = comments.map(c => `${c.name} : ${c.age} ${c.email} ${c.website} ${c.feedback} `).join('\n');
    const blob = new Blob([commentText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'comments.txt';
    link.click();
});

// Load existing comments on page load (if any)
displayComments();