
var express = require("express");
// var bodyParser = require("body-parser");
// var cors = require("cors");

var app = express();
// app.use(cors());
// app.use(bodyParser.json());
app.get('/',function(req,res){
  res.send("Pass the unix timestamp or a natural language date (example: January 1, 2016) to get the detail of date");
});

var monthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];


function checkUnix(value){
 var unixTime = Number(value);
 if((Number.isInteger(unixTime)==true)&&(unixTime>=0)) {
   return true;
 } return false;
 
}


app.get('/:value',function(req,res){
  var value = req.params.value;
  if(checkUnix(value)){
    var time ;
    var naturalDate = new Date(Number(value)*1000);
    
    var month = naturalDate.getMonth();
    var year = naturalDate.getFullYear();
    var day = naturalDate.getDate();
    naturalDate = monthName[month]+" "+day+", "+year;
    time = {
        "unix": Number(value),
        "natural": naturalDate
      }
    res.send(time);
  } else {
    try {
      value = value.split(/(?:,| )+/);
      var year= value[2];
      var day = value[1];
      var month = monthName.indexOf(value[0]);
      var date = new Date(year,month,day);
      var unixTime = date.getTime()/1000;
      var naturalDate = monthName[month]+" "+day+", "+year;
      var time = {
        "unix": unixTime,
        "natural" : naturalDate
      };
     
       if(date=="Invalid Date") res.send("Wrong parameters");
       else res.send(time);
    } catch(err){
      res.send("Wrong parameters");
    }
    
  }
  
  
});

app.listen(8080,function(){
  console.log("Server is running");
});






