const express = require('express');
const server = express();
const PORT = 4000;
const blogRoutes = require('./routes/blog-routes');

server.use(express.urlencoded({ extended: true }));
// this is used if data is passed in json format - REST APIs
server.use(express.json());
server.get('/', (req, res) => {
    res.json({
        'msg': 'Hello Readers'
    });
});

server.use('/blogs', blogRoutes);
// wild card route
server.get('**', (req, res) => {
    res.sendStatus(404);
});

// error handling middleware
server.use((err, req, res, next) => {
    res.sendStatus(500);
});


server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});