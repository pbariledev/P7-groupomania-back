const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const postCtrl = require('../controllers/post');



router.post('/', postCtrl.createPost);
router.get('/', postCtrl.getAllPost);
router.put('/', postCtrl.likePost);




module.exports = router;