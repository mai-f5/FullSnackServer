
//MULTER
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

//COOKIES
function validateCookie(req, res, next) {
    const cookies = req.cookies;
    if ('fsCookie' in cookies) {
        if (cookies.fsCookie === 'logged_in') next();

        else {
            res.status(403).send({ msg: 'Not logged in' })
        }
    } else {
        res.status(403).send({ msg: 'Not logged in' })
    }
}


module.exports = { cpUpload, validateCookie }