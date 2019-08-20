let uniqid = require('uniqid');
let CallbackRequest = require('../models/callback-request').CallbackRequest;
let express  = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth');


router.get('/', authMiddleware ,async (req,resp) => {
    resp.send(await CallbackRequest.find());
});
router.post('/', async (req,resp) => {
    let reqBody = req.body;
    let newRequet =  new CallbackRequest ( {
        id : uniqid(),
        phoneNumber : reqBody.phoneNumber,
        date : new Date()
    })
    await newRequet.save();
    resp.send('Accepted');
});
router.delete('/:id' , authMiddleware, async (req,resp) => {
    let id = req.params.id;
    await CallbackRequest.deleteOne({id:id});
    resp.send('Deleted');
});

module.exports = router;