const express = require('express')
const session = require('express-session')
const router = require('./routes')
const app = express()
const port = 3000


app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.static('uploads'))

app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: false,
    resave: false
}));

app.use(router)



app.listen(port, () => {
    console.log(`h.a.p listening on port ${port}`)
})