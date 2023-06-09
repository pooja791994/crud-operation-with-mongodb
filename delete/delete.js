//import modules
const express = require('express')
let mongodb = require('mongodb')
//import url
let url = require('../url')
//create mongoclient
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//create rest api
router.post("/", (req, res) => {
    let obj = {
        "p_id": req.body.p_id
    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db("nodedb")
            db.collection('products').find({ p_id}).toArray(
                (err,recodsArray)=>{
                    if(err)
                    console.log('Error:- ' +err)
                    else{
                        if(recodsArray.length >0){
                            db.collection('products').deleteOne(obj, (err) => {
                                if (err)
                                    res.json({ 'delete': 'Error ' + err })
                                else {                    
                                    res.json({ 'delete': 'success' })
                                    conn.close()
                                }
                            })
                        }
                        else{
                            res.json('Record not found')
                            conn.close()
                        }
                    }
                }
            )
            
        }
    })
})
//export router
module.exports = router