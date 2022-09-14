const express=require('express');
const bp=require('body-parser');
const multer=require('multer');
const app=express();

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
    cb(null, file.fieldname + '-' + uniqueSuffix+file.originalname)
  }
})

var upload = multer({ storage: storage }).single('file');



app.post("/",(req,res)=>{

  upload(req, res, function (err) {
     if (err ) {
      throw err;
    }
var inputfile=req.file.path;

   });


});




app.listen(3000,()=>{
  console.log("webserver started.");
});
