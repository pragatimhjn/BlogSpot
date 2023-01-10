const express = require('express');
const router = express.Router();

let blogs = [
    {
        blogId:1,
        title: 'Food',
        description: 'Healthy food recipes and more..'
       
    },
    {
        blogId:2,
        title: 'Travel',
        description: 'Planning guide and tips on travel and more..'
    },
    {
        blogId:3,
        title: 'Photography',
        description: 'Photography tutorial'
    },
    {
        blogId:4,
        title: 'Arts and Crafts',
        description: 'Explore arts and crafts from india in this blog'
    },
    {
        blogId:5,
        title: 'Education',
        description: 'Master subjects with experts'
    },
    {
        blogId:6,
        title: 'Technology',
        description: 'Innovative and Creative minds share ideas'
    },
];

router.get('/', (req, res) => {
    res.json(blogs);
});

router.get('/search', (req, res) => {
    const { blogId,title} = req.query;
    const filteredBlogs = blogs.filter(blog => {
        let query = true;
        if (title !== undefined){
           query = query && blog.title.toLowerCase().includes(title.toLowerCase());
        }
        if (blogId !== undefined){
            query = query && blog.blogId === +blogId
        }
        return query;
    });
    res.json({
        blogs: filteredBlogs
    });
});

//dynamic routes 
router.get('/:blogId', (req, res) => {
    const { blogId } = req.params;
    const blog = blogs.find(blog => blog.blogId === +blogId);
    if (blog) {
        res.json(blog);
    } else {
        res.status(404).json({
            msg: 'Blog not found'
        });
    }
});

router.post('/', (req, res) => {
    const { title, description } = req.body;
    const blog = {
        blogId:blogs.length + 1,
        title,
        description 
    };
    //post creates new blog 
    blogs.push(blog);
    res.status(201).json({
        data:blog
    });
});

router.put('/:blogId', (req, res) => {
    const { blogId } = req.params;
    const { title, description } = req.body;
    const blog = blogs.find(blog => blog.blogId === +blogId);
    //put replaces entire target object
    if (blog) {
        blog.title = title;
        blog.description = description;

        res.json(blog);
    } else {
        res.status(404).json({
            msg: 'Blog not found'
        });
    }


});
router.patch('/:blogId', (req, res) => {
    const { blogId } = req.params;
    const { title, description } = req.body;
    const blog = blogs.find(blog => blog.blogId === +blogId);

    // patch updates value only for given key
    if (blog) {
        if (title !== undefined ){
            blog.title = title;
        }
        if (description !== undefined ){
            blog.description = description;
        }

        res.json(blog);
    } else {
        res.status(404).json({
            msg: 'Blog not found'
        });
    }


});



router.delete('/:blogId',(req, res) => {
    const { blogId } = req.params;
    const blog = blogs.find(blog => blog.blogId === +blogId);
    if(blog){
        blogs = blogs.filter(blog => blog.blogId !== +blogId);
        res.sendStatus(204);
    } else {
        res.status(404).json({
            msg: 'Blog not found'

        });
    }

})

module.exports = router;