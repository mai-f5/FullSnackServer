var express = require('express');
var router = express.Router();
const api = require('../DAL/api');

//MULTER EXAMPLE

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

// getting users data
router.get('/:userId', async function (req, res, next) {
  const usersData = await api.getUserData(req.params.userId)
  res.send(usersData);
});

// updating users data
router.put('/:userId', cpUpload, async function (req, res, next) {
  // console.log('this is the file', req.file) 
  // console.log('these are the texts', req.params)

  const userUpdateRes = await api.updateUserData({ ...req.params, profileImg: `images/${req.file.filename}` })
  res.send(userUpdateRes)
});



/* GET users listing. */

router.get('/:userId/projects', async function (req, res, next) {
  res.send('GET USERS PROJECTS LIST');
});

router.get('/:userId/projects/edit/:projectId', async function (req, res, next) {
  const projectPics = await api.getProjectsAllPics(req.params.pid)
  res.send('GET EDITED PROJECT\'S DATA');
});

/* POST users listing */
router.post('/:userId/projects', function (req, res, next) {
  res.send('ADD PROJECT');
});

/* PUT users listing */
router.put('/:userId/projects/:projectId/update', function (req, res, next) {
  res.send('SAVE EDITED PROJECT NEW DATA');
});

router.put('/:userId/projects/:projectId/remove', function (req, res, next) {
  res.send('HIDE PROJECT');
});


router.put('/:userId/updatepassword', function (req, res, next) {
  res.send('UPDATE USER\'S PASSWORD');
});

/* DELETE users listing */
router.delete('/:userId/projects/:projectId/remove/picture/:picId', function (req, res, next) {
  res.send('REMOVE IMAGE');
});
router.delete('/:userId/projects/:projectId/remove/requiredTech/:reqtechid', function (req, res, next) {
  res.send('REMOVE PROJECT\'S REQUIRED TECH ');
});

module.exports = router;
