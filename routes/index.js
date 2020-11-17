var express = require('express');
var router = express.Router();
const path =require("path");
const fs=require("fs");
const rootPath =path.resolve(".");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile("/public/index.html");
});


router.post("/upload",function(req,res,next){
  const file =req.files.file;
  const host =req.hostname;
  const ext =file.name.split(".")[1];
  const dateNow=Date.now();
  const filewithoutExt=file.name.split(".")[0].replace(" ","_")+dateNow;

  const writePath =rootPath+`/public/csv/${filewithoutExt}.${ext}`;
  const writeStream =fs.createWriteStream(writePath);
  new Promise((resolve,reject)=>{
    writeStream.write(file.data,(err)=>{
      if(err){
        reject(err)
      }
      else{
        // csv_url
        res.send({
          csv_url:`./csv/${filewithoutExt}.${ext}`
        })
      }
    })
  });



 });

router.post("/uploadStyle",function(req,res,next){
  console.log(req.body);
  const data =req.body.data;
  fs.createWriteStream(rootPath+"/public/json/styles.json")
     .write(data,(err)=>{
       if(err){
         console.log(err);
       }
       res.send({
         "status":"success"
       })
     }); 

});

module.exports = router;
