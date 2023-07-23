const express = require('express');
const userController= require('./controller.js');
const multer = require( "./middlewares/multer-config.js");

const router = express.Router();


router.post('/users', multer("Image", 512 * 1024) ,userController.createUser);
router.get('/users', userController.getAllUsers);

router.get('/users/:_id', userController.getUserById);

router.get('/users/getUserByName/:FirstName', userController.getUserByName);
router.put('/users/:_id', userController.updateUserById);

router.delete('/users/:_id', userController.deleteUserById);

module.exports = router;
