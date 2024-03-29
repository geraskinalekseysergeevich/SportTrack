const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/saveUserCallorie', userController.saveUserCallorie);
router.post('/saveUserExercises', userController.saveUserExercises);
router.post('/saveUserPreset', userController.saveUserPreset);
router.get('/user/data', userController.getUserData);
router.put('/updateData', userController.putUserData);
router.delete('/deleteUserPreset', userController.deleteUserPreset);
router.put('/updateUserPreset', userController.updateUserPreset);


module.exports = router;