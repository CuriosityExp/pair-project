const { comparing } = require('../helpers')
const {User,Post} = require('../models')

class UserController{
    static home(req,res){
        res.render('home')
    }

    static loginForm(req,res){
        const { errors } = req.query
        res.render('login', { errors })
    }

    static postLogin(req,res){
        const { email, password } = req.body
        User.findOne({
            where : {email}
        })
        .then(user=>{
            // console.log(user);
            if(user){
                if(comparing(password,user.password)){
                    // console.log(req.session,'<<<<<<<<<<<<<INI');
                    req.session.userId = user.id
                    req.session.username = user.username
                    req.session.role = user.role
                    // console.log(req.session,'<<<<<<<<----------');
                    return res.redirect('/feeds')
                }else{
                    const errors = 'Password invalid'
                    return res.redirect(`/login?errors=${errors}`)
                }
            }else{
                const errors = 'Email invalid'
                return res.redirect(`/login?errors=${errors}`)
            }
        })
        .catch(err => {
            // console.log(err);
            res.send(err)
        })
    }

    static registerForm(req,res){
        const { errors } = req.query

        res.render('register',{ errors })
        
    }

    static postRegister(req, res) {
        const {email,fullname,password} = req.body
        // console.log(req.body);
        User.create({ email,fullname, password })
            .then(result=>{
                res.redirect('/login')
            })
            .catch(err => {
                console.log(err);
                if (err.name ==='SequelizeValidationError'){
                    let errors = err.errors.map(el=>el.message+'\n')
                    res.redirect(`/register?errors=${errors}`)
                }else{
                    res.send(err)
                }
            })

    }


    static userProfile(req,res){
        const {userId} = req.params
        User.findByPk(userId,{
            include: Profile
        })
        .then(user=>{
            res.render('profile',{ user , userSession: req.session.userId })
        })
        .catch(err => res.send(err))
    }

    static formEditProfile(req,res){

    }

    static updateProfile(req, res) {

    }


    static userLogout(req,res){
        req.session.destroy((err)=>{
            if(err) res.send(err)
            else{
                res.redirect('/')
            }
        })
    }
}

module.exports = UserController