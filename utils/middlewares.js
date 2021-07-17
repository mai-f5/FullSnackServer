//MULTER
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `public/files/`)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({ storage: storage })

const fileUploads = upload.fields([
    { name: 'profileImg', maxCount: 1 },
    { name: 'assetsSrc', maxCount: 1 },
    { name: 'pictures', maxCount: 10 },
])

//COOKIES
async function validateCookie(req, res, next) {
    const cookies = req.cookies;
    const currentUserId = req.params.userId || req.query.userId || req.body.userId || req.body.user_id;
    if ('fsCookie' in cookies) {
        if (cookies.fsCookie == currentUserId) next();
        else {
            res.status(403).send({ msg: 'Not logged in' })
        }
    } else {
        res.status(403).send({ msg: 'Not logged in' })
    }
}


module.exports = { fileUploads, validateCookie }