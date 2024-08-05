const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

let posts = [];
let comments = [];
let postId = 1;
let userId = 1;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/posts', (req, res) => {
    const { content, user } = req.body;
    const newPost = { id: postId++, content, user, likes: 0 };
    posts.push(newPost);
    res.json(newPost);
});

app.post('/posts/:id/like', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post) {
        post.likes++;
        res.json(post);
    } else {
        res.status(404).send('Post not found');
    }
});

app.post('/posts/:id/comments', (req, res) => {
    const { content } = req.body;
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post) {
        const newComment = { postId: post.id, content };
        comments.push(newComment);
        res.json(newComment);
    } else {
        res.status(404).send('Post not found');
    }
});

app.post('/profile', (req, res) => {
    const { username } = req.body;
    // Simulate updating profile
    res.json({ username });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
