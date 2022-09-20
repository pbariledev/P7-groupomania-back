const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const multerConfig = require('../middleware/multer-config');




router.post('/',multerConfig, postCtrl.createPost);
router.get('/', postCtrl.getAllPost);
router.get('/:idPost', postCtrl.getOnePost);
router.put('/:idPost', postCtrl.ModifyOnePost);
router.put('/',multerConfig, postCtrl.likePost);




module.exports = router;