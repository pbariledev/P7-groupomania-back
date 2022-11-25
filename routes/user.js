const express = require('express');
const router = express.Router();
const userCtrl = require ('../controllers/user');
const auth = require('../middleware/auth');
const multerConfig = require('../middleware/multer-config');


router.post('/signup', userCtrl.signup);
router.post('/login',userCtrl.login);

router.get('/myprofil/:userId',auth, userCtrl.UserProfile) 
router.put('/myprofil/:userId',auth,multerConfig, userCtrl.UserModify)
router.delete('/myprofil/:userId', auth,multerConfig, userCtrl.deleteUser)


module.exports = router;