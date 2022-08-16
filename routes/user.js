const express = require('express');
const router = express.Router();
const userCtrl = require ('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup',userCtrl.signup);
router.post('/login',userCtrl.login);

router.get('/myprofil/:userId',auth ,userCtrl.UserProfile) 
router.put('/myprofil/:userId', userCtrl.UserModify)
router.delete('/myprofil/:userId', auth, userCtrl.deleteUser)


module.exports = router;