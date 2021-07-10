var express = require('express');
var router = express.Router();
const api = require('../DAL/users');
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `public/images/`)
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype === 'image/jpeg' ? 'jpg' : 'png'}`)
  }
})

const upload = multer({ storage: storage })
const cpUpload = upload.single('profileImg')


// GET
router.get('/:userId', async function (req, res, next) {
  const usersData = await api.getUserData(req.params.userId)
  // const usersData = await api.getUserData(req.params.userId)
  res.send(usersData);
});

// PUT
router.put('/:user_id', cpUpload, async function (req, res, next) {
  try {
    const userUpdateRes = await api.updateUserData({ ...req.params, profile_img: `images/${req.file.filename}` })
    res.send(userUpdateRes)
  }
  catch (err) {
    console.log(err)
  }
});

router.put('/:userId/password', async function (req, res, next) {
  try {
    const userPassUpdate = await api.updateUserPassword(req.body)
    res.send(userPassUpdate);
  } catch (err) {
    console.log(err)
  }

});


//POST
router.post('/signup', function (req, res, next) {
  //validations
  try {
    const newUserId = api.addNewUser(req.body)
    res.send(newUserId)
  } catch (err) {
    console.log(err)
  }
});

router.post('/login', async function (req, res, next) {
  try {
    const userLoginRes = await api.login(req.body)
    if (!userLoginRes) {
      res.status(500).send('Incorrect Username or Password')
    }
    else {
      res.send(userLoginRes)
    }
  }
  catch (err) {
    console.log(err)
  }

});

module.exports = router;
