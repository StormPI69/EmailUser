const express = require('express')
const nodemailer=require('nodemailer')
const router=express.Router()
const signUpTemplateCopy=require('../models/SignUpModels')
const { google }=require('googleapis')
const mongoose= require('mongoose')
const { Db } = require('mongodb')



const CLIENT_ID='611006681699-ig9he7brj33295ob6t099hop36ol2r51.apps.googleusercontent.com'
const CLIENT_SECRET='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'
const REDIRECT_URI='https://developers.google.com/oauthplayground'
const REFRESH_TOKEN='1//046slZvSbyoL5CgYIARAAGAQSNwF-L9IrivzG4EH9nzcuEbjtLluD_0hR-y_WSVoNz7pHbO8gLQ0ZifUrM39wOEQdYy1vsOgDukk'
                    


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})



router.post('/signup',async(request,response)=>{

    let {registered}=request.body

try{
    const accessToken=await oAuth2Client.getAccessToken()

    mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'heightsurveyssw@gmail.com',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken

        }
    });

 


   const signUpUser = new signUpTemplateCopy({
    
        fullname:request.body.fullname,
        height:request.body.height,
        email:request.body.email

    })
    
    const avg=signUpTemplateCopy.aggregate([{
        $group:
        {
            _id:null,
            avgHeight: { $avg: "$height"}
        }
        }]).exec((err, avgHeight) => {    
        if (err) throw err;
        console.log(avgHeight[0].avgHeight)  
    })

    
        
    signUpUser.save()
        .then(data =>{response.json(data)})
        .catch(error =>{response.json(error)})

  

    await mailTransporter.sendMail({
        from: 'heightsurveyssw@gmail.com',
        to: signUpUser.email,
        subject:"new user registered:"+signUpUser.fullname,
        text:"Dear "+signUpUser.fullname+",\n\nThank you for participating in our survey ! \n\nYour Height is : "+signUpUser.height+"\n\nThe Average height for this survey is : "
    })
        


    }

    catch(error) {console.log(error)}

})



module.exports=router