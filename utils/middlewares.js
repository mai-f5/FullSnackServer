const bcrypt = require('bcrypt')
const saltRounds = 10;
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
async function validateCookie(req, res, next) {
    const cookies = req.cookies;
    const currentUserId = req.params.userId || req.query.userId || req.body.userId;
    if ('fsCookie' in cookies) {
        if (cookies.fsCookie === currentUserId) next();
        // const match = await bcrypt.compare(currentUserId, cookies.fsCookie);
        // if (match) next()
        else {
            res.status(403).send({ msg: 'Not logged in' })
        }
    } else {
        res.status(403).send({ msg: 'Not logged in' })
    }
}


module.exports = { cpUpload, validateCookie }