const { User, Post } = require('../models')

class PostController{
    static renderFeeds(req,res){
        Post.findAll({
            include: User
        })
        .then(posts=>{
            // console.log(posts);
            res.render('feeds',{ posts })
        })
        .catch(err=>{
            console.log(err);
            res.send(err)
        })
    }

    static formAddPost(req,res){
        const{errors} = req.query
        res.render('formAddPost',{ errors })
    }

    static postFormAdd(req,res){
        const {title, content} = req.body
        // console.log(req.file, '<<<<< ini file');
        // console.log(req.body, '<<<<< ini body');
        Post.create({ title, content,imgUrl:req.file.filename, UserId: req.session.userId })
            .then(result=>{
                // console.log(result);
                res.redirect('/feeds')
            })
            .catch(err=> {
                if (err.name === 'SequelizeValidationError'){
                    let errors = err.errors.map(el=>el.message)
                    res.redirect(`/post/add?errors=${errors}`)
                }else{
                    res.send(err)
                }
            })
    }

    static postDetail(req,res){
        const { postId } = req.params
        const userSession = req.session.userId
        Post.findByPk(postId,{
            include: User
        })
        .then(post=>{
            res.render('post',{post,userSession})
        })
        .catch(err=>res.send(err))

    }
}

module.exports = PostController