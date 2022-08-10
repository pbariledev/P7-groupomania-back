const express = require('express');
const router = express.Router();
const userCtrl = require ('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup',userCtrl.signup);
router.post('/login',userCtrl.login);

router.get('/myprofil',auth ,userCtrl.UserProfile)
router.put('/myprofil',auth ,userCtrl.UserModify)
router.delete('/myprofil', auth, userCtrl.deleteUser)


module.exports = router;