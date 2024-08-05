let currentUser = '';

async function createPost() {
    const postContent = document.getElementById('postContent').value;
    if (postContent.trim() === '') return;

    const response = await fetch('/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: postContent, user: currentUser })
    });

    const post = await response.json();
    displayPost(post);
    document.getElementById('postContent').value = '';
}

function displayPost(post) {
    const postList = document.getElementById('postList');
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.id = `post${post.id}`;
    postDiv.innerHTML = `
        <p><strong>${post.user}:</strong> ${post.content}</p>
        <button onclick="likePost(this, ${post.id})">Like</button>
        <span>${post.likes} Likes</span>
        <button onclick="followUser('${post.user}')">Follow ${post.user}</button>
        <div id="comments${post.id}">
            <input type="text" id="commentContent${post.id}" placeholder="Write a comment...">
            <button onclick="createComment(${post.id})">Comment</button>
            <div id="commentList${post.id}"></div>
        </div>
    `;
    postList.appendChild(postDiv);
}

async function createComment(postId) {
    const commentContent = document.getElementById(`commentContent${postId}`).value;
    if (commentContent.trim() === '') return;

    const response = await fetch(`/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: commentContent })
    });

    const comment = await response.json();
    displayComment(postId, comment);
    document.getElementById(`commentContent${postId}`).value = '';
}

function displayComment(postId, comment) {
    const commentList = document.getElementById(`commentList${postId}`);
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.innerHTML = `<p>${comment.content}</p>`;
    commentList.appendChild(commentDiv);
}

async function likePost(button, postId) {
    const response = await fetch(`/posts/${postId}/like`, { method: 'POST' });
    const post = await response.json();
    const postDiv = button.parentElement;
    const likeSpan = postDiv.querySelector('span');
    likeSpan.textContent = `${post.likes} Likes`;
}

async function followUser(username) {
    // Implement follow functionality if needed
    alert(`Following ${username}`);
}

async function updateProfile() {
    const username = document.getElementById('username').value;
    if (!username.trim()) return;

    currentUser = username;
    const response = await fetch('/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    });
    const profileInfo = await response.json();
    document.getElementById('profileInfo').textContent = `Username: ${profileInfo.username}`;
}
