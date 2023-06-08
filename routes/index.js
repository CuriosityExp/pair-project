const express = require('express')
const UserController = require('../controllers/user')
const router = express.Router()
const PostController = require('../controllers/post')
const multer = require('multer')
const upload = multer({ dest: './uploads/' })


router.get('/', UserController.home)

router.get('/login',UserController.loginForm)
router.post('/login',UserController.postLogin)
router.get('/register', UserController.registerForm)
router.post('/register', UserController.postRegister)



router.use((req,res,next)=>{
    if(!req.session.userId){
        const errors = 'You must login first'
        res.redirect(`/login?errors=${errors}`)
    }else{
        next()
    }
})

router.get('/feeds', PostController.renderFeeds)
router.get('/post/add', PostController.formAddPost)
router.post('/post/add',upload.single('imgUrl'), PostController.postFormAdd)


router.get('/post/:postId/detail', PostController.postDetail)
router.get('/post/:postId/delete', PostController.deletePost)
router.get('/post/:postId/edit', PostController.editPost)
router.post('/post/:postId/edit', PostController.handlerEditPost)

router.get('/profile/:userId', UserController.userProfile)
router.get('/profile/:userId/edit', UserController.formEditProfile)
router.post('/profile/:userId/edit',upload.single('avatar'), UserController.updateProfile)





module.exports = router