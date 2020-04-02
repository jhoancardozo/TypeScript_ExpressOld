const express = require('express');

const usersController = require('../../controllers/v1/users-controller');

const { isValidhostName, isAuth, isAdmin } = require('../../middlewares/auth');

const router = express.Router();

router.post('/create', usersController.createUser);

router.post(
  '/delete',
  isValidhostName,
  isAuth,
  isAdmin,
  usersController.deleteUser
);

router.post('/update', isValidhostName, isAuth, usersController.updateUser);

router.get(
  '/get-all',
  isValidhostName,
  isAuth,
  isAdmin,
  usersController.getUser
);

router.post('/login', usersController.login);

module.exports = router;
