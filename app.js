const express=require('express');
const bp=require('body-parser');
const multer=require('multer');
const app=express();
const jimp= require('jimp');
const fs = require('fs');
app.use(bp.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/",(req,res)=>{
  res.render('index');
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'data/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,"input-"+uniqueSuffix+file.originalname)
  }
})

var upload = multer({ storage: storage }).single('file');



app.post("/",(req,res)=>{

  upload(req, res, function (err) {
     if (err ) {
      throw err;
    }
var inputfile=req.file.path;
console.log(inputfile);
jimp.read(inputfile, function (err, image) {
  if (err) {
    console.log(err)
  }
  else {
    var temp=req.file.path;
    var crux=temp.substring(0,temp.lastIndexOf('.'))+"-output.png"
    image.write("output.png")
  }
  res.download("output.png");
});
   });



});




app.listen(3000,()=>{
  console.log("webserver started.");
});
