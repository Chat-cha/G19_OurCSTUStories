const commentsContainer = document.getElementById('commentsContainer');
let comments = [];

// Function to display comments on the page
function displayComments() {
    commentsContainer.innerHTML = '';
    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment-box');
        commentDiv.innerHTML = `<p class="comment-name">${comment.name}</p><p>${comment.text}</p>`;
        commentsContainer.appendChild(commentDiv);
    });
}

// Handle form submission
document.getElementById('commentForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const comment = document.getElementById('comment').value.trim();

    if (name && comment) {
        comments.push({ name, text: comment });
        displayComments();
        document.getElementById('commentForm').reset();
    }
});

// Function to download comments as a .txt file
document.getElementById('downloadBtn').addEventListener('click', function () {
    let commentText = comments.map(c => `${c.name}: ${c.text}`).join('\n');
    const blob = new Blob([commentText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'comments.txt';
    link.click();
});

// Load existing comments on page load (if any)
displayComments();