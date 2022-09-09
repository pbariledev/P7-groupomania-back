const express = require('express');
const router = express.Router();
const userCtrl = require ('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');



router.post('/signup', userCtrl.signup);
router.post('/login',userCtrl.login);

router.get('/myprofil/:userId',auth,multer, userCtrl.UserProfile) 
router.put('/myprofil/:userId',auth,multer, userCtrl.UserModify)
router.delete('/myprofil/:userId', auth, userCtrl.deleteUser)


module.exports = router;