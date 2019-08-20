let uniqid = require('uniqid');
let Email = require('../models/emails').Email;
let express  = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req,resp) => {
    resp.send(await Email.find());
});

router.post('/', async (req,resp) => {
    let reqBody = req.body;
    let newEmail =  new Email ( {
        id : uniqid(),
        name : reqBody.name,
        email : reqBody.email,
        message : reqBody.message,
        date : new Date()
    })
    await newEmail.save();
    resp.send('Accepted');
});

router.delete('/:id' , authMiddleware ,async (req,resp) => {
    let id = req.params.id;
    await Email.deleteOne({id:id});
    resp.send('Deleted');
});

module.exports = router;