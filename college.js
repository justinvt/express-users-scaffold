var express = require('express');
var app = express();

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio'); 
var geocoder = require("geocoder");
var _ = require("lodash")

var upload = multer(); 


var config = require('./config');
var letters = ["a","b","c","d","e","f","g",'h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

var schools = [];
var sd = "";
var data, url;

console.log(letters);
var scrape_names = false;
var scrape_details =0;
var get_address =  0;
var reverse_geocode = 1;




var mongoose   = require('mongoose');
mongoose.connect(config.mongo.connection); // connect to our database
var School = require('./models/school.js')

// reverse geocode API


if(reverse_geocode){
   School.find(function(err, schools) {
        schools.forEach(function(school, index){

  

/*
            gmAPI.reverseGeocode(reverseGeocodeParams, function(err, result){
              console.log(result);
            });

   
          */
              console.log(school.name)
              if(school.coordinates === undefined){

              }
              else{
                var coords = school.coordinates.split(/[^-0-9\.]+/gi)
                  geocoder.reverseGeocode( parseFloat(coords[0]), parseFloat(coords[1]), function ( err, data ) {
                    if(err) return 
                    var add = data.results[0].address_components
  
                   school.zip =  _.filter(add, function(f) { return f.types[0] == "postal_code"})[0].long_name;
                 
                   school.save(
                    function(err) {
                     if (err) throw err;
                     console.log(school)
                   })
                    
                  }, 
                  { 
                    language: 'en',
                     key: config.google.maps_api_key
                   });

              }
          
              //console.log("Address" + school.address);
              //console.log('School successfully updated!');
          });

        })

return;

}


if(scrape_names){

  for(var i=0;i<letters.length;i++){

    url = 'http://talk.collegeconfidential.com/' + letters[i] + '/';
    console.log("Scraping - " + url);


    var r = request(url, function(error, response, html){
    var $ = cheerio.load(html);

    // Pointless conditional
    if(true){

      $('#SubTopics li a').each(function(i,ele){

        data = {};
        data.name = $(this).text();
        data.url = "http:" + $(this).attr("href");
        var d =   [data.name, data.url].join(" \ ") 
        console.log(d);
        sd = sd + d;
        schools.push(data);
        var school = new School({
          name: data.name,
          url: data.url
        });
        school.save(function(err){
          if (err){ 
            console.log("Not saved");
            throw err;
          }
          console.log(school.name + " saved")
        })


      });

    }

    return true;

   });

   console.log(schools);

  }

  console.log(sd);
  return true;
}else{console.log("not scraping names")}

if(scrape_details){
    School.find(function(err, schools) {
      schools.forEach(function(school, index){
        var url  = 'https://en.wikipedia.org/wiki/' + school.name.replace(/[^a-zA-Z0-9]/,"_")
   
        var r = request( url, function(error, response, html){
          console.log("Scraping - " + url);
          var $ = cheerio.load(html);
          //console.log(html);
          school.latitude =  $(".latitude").first().text()
          school.longitude =  $(".longitude").first().text()
          //school.logo = $(".infobox img").last().attr("src")
         
           school.save(function(err) {
             if (err) throw err;
              console.log(school.name + " - " + school.latitude);
              //console.log("Address" + school.address);
              //console.log('School successfully updated!');
          });
          
        })

      })
    })
}

if(get_address){
   School.find(function(err, schools) {
        schools.forEach(function(school, index){
          try {
          var coords = school.address.split("/")[-1].split(";")
          var url  = "http://api.geonames.org/findNearbyPostalCodesJSON?lat=" + coords[1] + "&lng=" + coords[1] + "&username=demo"
          var r = request( url, function(error, response, html){
            console.log("Scraping - " + url);
            var $ = cheerio.load(html);
            //console.log(html);
            var re = JSON.parse(html);
            console.log(re["postalCodes"])
            /* 
             school.save(function(err) {
               if (err) throw err;
                console.log("Logo" + school.logo);
                console.log("Address" + school.address);
                console.log('School successfully updated!');
            });
            */
            
          })
          }
          catch(err) {
              console.log(school.name + " DIdnt work" + school.address.split(/[ ]*\/[ ]*/ig)[1])
          }
         

        })
      })
}


