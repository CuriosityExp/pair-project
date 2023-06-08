const { User, Post } = require('../models')
const { Op } = require('sequelize')
class PostController{
    static renderFeeds(req,res){
        Post.showAllFeeds()
            .then(posts => {
                // console.log(posts);
                res.render('feeds', { posts })
            })
            .catch(err => {
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

    static deletePost(req,res){
        const {postId} = req.params
        Post.destroy({
            where: {
                id: {
                    [Op.eq]: postId
                }
            }
        })
            .then(result=> res.redirect('/feeds'))
            .catch(err=> res.send(err))
    }

    static editPost(req,res){
        const {postId} = req.params
        const { errors } = req.query
        Post.findByPk(postId)
            .then(post=>{
                res.render('formEditPost',{post, errors})
            })
            .catch(err=>res.seng(err))
    }

    static handlerEditPost(req,res){
        const { postId } = req.params
        const { title, content } = req.body
        Post.update({ title, content },{
            where:{
                id:{
                    [Op.eq] : postId
                }
            }
        })
        .then(result=> res.redirect(`/post/${postId}/detail`))
        .catch(err => {
            if (err.name === 'SequelizeValidationError') {
                let errors = err.errors.map(el => el.message)
                res.redirect(`/post/${postId}/edit?errors=${errors}`)
            } else {
                res.send(err)
            }
        })
    }
}

module.exports = PostController