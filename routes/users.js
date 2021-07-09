var express = require('express');
var router = express.Router();
const api = require('../DAL/api');
const db = require('../config/database');
const { User } = require('../models/associations');
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
  const usersData = await User.findByPk(req.params.userId, { include: ['gender', 'occupation'] })
  // const usersData = await api.getUserData(req.params.userId)
  res.send(usersData);
});

// PUT
router.put('/:userId', cpUpload, async function (req, res, next) {
  try {
    const userUpdateRes = await User.update(
      { profile_img: `images/${req.file.filename}` },
      { where: { id: req.params.userId } })
    res.send(userUpdateRes)
  }
  catch (err) {
    console.log(err)
  }
  // console.log('this is the file', req.file) 
  // console.log('these are the texts', req.params)

  // const userUpdateRes = await api.updateUserData({ ...req.params, profileImg: `images/${req.file.filename}` })

});

router.put('/:userId/password', function (req, res, next) {
  res.send('UPDATE USER\'S PASSWORD');
});


/* POST USER */
router.post('/signup', function (req, res, next) {
  res.send('ADD USER');
});

router.post('/login', function (req, res, next) {
  res.send('LOGIN USER');
});

module.exports = router;
