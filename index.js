const express = require('express')
const https = require('https')
const app = express()
const corse = require('random-curse-words')
const bp = require('body-parser')
const ejs = require('ejs')
const url = 'https://api.adviceslip.com/advice'
app.use(bp.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('view engine','ejs')
app.listen(process.env.PORT||3000,function(){
    console.log('On it...')
})
app.get('/', function(req,res){
    https.get(url,function(response){
        response.on('data',function(data){
            const advice = JSON.parse(data)
            console.log(advice)
            var adv = advice.slip.advice
            var id = advice.slip.id
            res.render('index',{
                number_id:'ADVICE #' + id,
                advice:adv
            });
        })
    })
})
app.post('/',function(req,res){
    res.redirect('/')
})