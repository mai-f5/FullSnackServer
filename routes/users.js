var express = require('express');
var router = express.Router();
const api = require('../DAL/users');
const { validateCookie, cpUpload } = require('../utils/middlewares')
const bcrypt = require('bcrypt')
const saltRounds = 10;
// GET
router.get('/:userId', validateCookie, async function (req, res, next) {
  const usersData = await api.getUserData(req.params.userId)
  // const usersData = await api.getUserData(req.params.userId)
  res.send(usersData);
});

// PUT
router.put('/:userId', cpUpload, validateCookie, async function (req, res, next) {
  try {
    const userUpdateRes = await api.updateUserData({ ...req.params, profile_img: `images/${req.file.filename}` })
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

      // const hashedUserId = await bcrypt.hash(JSON.stringify(user.dataValues.id), saltRounds);
      res.cookie('fsCookie', JSON.stringify(user.id), { httpOnly: true })

      const privateUser = { ...user.dataValues, password: '' }
      res.send(privateUser)
    } else {
      res.status(403).send('Incorrect Username/Password')
    }
  } catch (err) {
    res.status(403).send('Incorrect Username/Password')
  }
});


router.delete('/logout', async function (req, res, next) {
  try {
    res.clearCookie('fsCookie', { maxAge: Date.now() })
    res.send('logged out')

  } catch (err) {
    console.log(err)
  }
});

module.exports = router;
