const express = require('express');
const path = require('path');
// for the id, v4: uuid we are giving a new name to v4
const { v4: uuid} = require('uuid');
const methodOverrride = require('method-override');
const { Console } = require('console');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// to decode the body from req in new comment creation:
app.use(express.urlencoded({ extended: true}));
app.use(methodOverrride('_method')) 

let comments = [
    {
        id: uuid(),
        username: 'Lana',
        comment: 'Whaaat this is so great!'
    },
    {
        id: uuid(),
        username: 'Daaaan',
        comment: 'LOL.'
    },
    {
        id: uuid(),
        username: 'TurkishCoffee4ever',
        comment: 'Sip sip'
    },
    {
        id: uuid(),
        username: 'BobBean',
        comment: 'I do agree on that, however I do not think it is politically correct. But it is just my opinion on the matter. Anyway, it might be false...'
    }
]

app.listen(3000, () => {
    console.log('listening on port 3000');
})

app.get('/comments', (req, res) => {
    res.render('index.ejs', { comments });
})

app.get('/comments/new', (req, res) => {
    res.render('new.ejs');
})

app.post('/comments', (req, res) => {
    const {username, comment} = req.body;
    comments.push({username, comment, id: uuid()});
    res.redirect('/comments');
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('show.ejs', { comment });
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('edit.ejs', { comment })
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})