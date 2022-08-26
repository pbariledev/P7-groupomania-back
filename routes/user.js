const express = require('express');
const router = express.Router();
const userCtrl = require ('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post('/signup',multer, userCtrl.signup);
router.post('/login',userCtrl.login);

router.get('/myprofil/:userId',auth, userCtrl.UserProfile) 
router.put('/myprofil/:userId',auth, userCtrl.UserModify)
router.put('/myprofil/:userId/pict',auth, multer, userCtrl.UserPicModify)
router.delete('/myprofil/:userId', auth, userCtrl.deleteUser)


module.exports = router;