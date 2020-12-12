const express=require("express");
const app=express();
const uploadFile=require("./uploadfile");
const path =require('path')

// 设置跨域访问
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin",'*');
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With,token");
  // //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // 可以带cookies
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
})

app.use(express.static(path.resolve(__dirname,"./attachment")))
//使用uploadFile中间件
app.post("/upload",uploadFile,(req,res)=>{
  //将req.body里的数据存储到数据库
  let imageUrl=req.file.filename
  let img={
    imageUrl:`http://localhost:3000/${imageUrl}`,
    imageName:imageUrl
  }
  res.send(img);
})
app.listen(3000);