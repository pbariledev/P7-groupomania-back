const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const multerConfig = require('../middleware/multer-config');
const auth = require('../middleware/auth');



router.post('/',multerConfig, postCtrl.createPost);
router.get('/', postCtrl.getAllPost);
router.get('/:idPost', postCtrl.getOnePost);
router.put('/:idPost',auth, postCtrl.ModifyOnePost);
router.put('/',multerConfig,auth, postCtrl.likePost);




module.exports = router;