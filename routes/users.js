var express = require('express');
var router = express.Router();
const api = require('../DAL/users');
const { validateCookie, fileUploads } = require('../utils/middlewares')
const bcrypt = require('bcrypt')
const saltRounds = 10;
// GET
router.get('/:userId', validateCookie, async function (req, res, next) {
  const usersData = await api.getUserData(req.params.userId)
  res.send(usersData);
});

// PUT
router.put('/:userId', fileUploads, validateCookie, async function (req, res, next) {
  console.log('testttttttt', req.files, req.files.profileImg)
  console.log(req.body)
  try {
    const updatedUser = {
      ...req.body
    }
    if (req.files && req.files.profileImg) {
      updatedUser['profile_img'] = `images/${req.files.profileImg[0].filename}`
    };

    const userUpdateRes = await api.updateUserData({
      ...updatedUser
    })
    res.send(userUpdateRes)
  }
  catch (err) {
    console.log(err)
  }
});

router.put('/:userId/password', validateCookie, async function (req, res, next) {
  try {
    const userPassUpdate = await api.updateUserPassword(req.body)
    res.send(userPassUpdate);
  } catch (err) {
    console.log(err)
  }
});


//POST
router.post('/', async function (req, res, next) {
  //validations
  try {
    const { username, password, email } = req.body
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const newUserId = await api.addNewUser({ username, email, password: hashedPassword })
    res.send(newUserId)

  } catch (err) {
    console.log(err)
  }
});

router.post('/login', async function (req, res, next) {
  const { username, password } = req.body
  //validate username
  try {
    const user = await api.login(username);
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      res.cookie('fsCookie', JSON.stringify(user.id), { sameSite: true })

      const privateUser = { ...user.dataValues, password: '' }
      res.send(privateUser)
    } else {
      res.status(403).send('Incorrect Username/Password')
    }
  } catch (err) {
    res.status(403).send('Incorrect Username/Password')
  }
});

module.exports = router;
