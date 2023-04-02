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
    let p_id = req.body.p_id
    let obj = {
        "p_name": req.body.p_name,
        "p_cost": req.body.p_cost
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
                            db.collection('products').updateOne({ p_id }, { $set: obj }, (err) => {
                                if (err)
                                    res.json({ 'update': 'Error ' + err })
                                else {
                                    console.log("Data updated")
                                    res.json({ 'update': 'success' })
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