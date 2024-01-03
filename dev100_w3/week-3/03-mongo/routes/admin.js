const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    Admin.create({
        username: username,
        password: password
    }).then(()=>{
        res.json({
            message: 'Admin created successfully'
        })
    }).catch(()=>{
        res.json({
            message: 'Something went wrong'
        })
    })
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title
    const description = req.body.description
    const imageLink = req.body.imageLink
    const price = req.body.price

    const entry = await Course.create({
        title,
        description,
        imageLink,
        price
    })
    res.json({
        message: "Course created",
        courseId: entry._id
    })

});

router.get('/courses', adminMiddleware, async (req, res) => {
    const entries = await Course.find({})

    res.json({
        courses: entries
    })
    // Implement fetching all courses logic
});

module.exports = router;