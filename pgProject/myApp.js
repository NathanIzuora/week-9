var express = require('express');
var myApp = express();
var promise = require('bluebird');
var ejs = require('ejs');
var bodyParser = require('body-parser');

myApp.set('view engine', 'ejs');
myApp.set('views', 'views');

myApp.use(bodyParser.urlencoded({ extended: false })); 

var options = {
    promiseLib : promise
};
 var pgp = require('pg-promise')(options);
 var connectionstring = 'postgres://localhost:5432/test';
 var database = pgp(connectionstring);

 myApp.get('/fave_artist', function(req,res){
     res.render('fave_artist');
 });

 myApp.post('/your_albums', function(req,res){

    let album_name = req.body.album_name;
    let album_year = parseInt(req.body.album_year);
    let artist_id = parseInt(req.body.artist_id);

    database.none('INSERT INTO album(album_name, album_year, artist_id) values($1,$2,$3)', [album_name, album_year, artist_id]).then(function(){
        database.any('SELECT * FROM album').then(function(data){
            res.render('your_albums', {'your_albums' : data});
        });
    
     });
 });



 myApp.get('/artist', function(req,res){
     res.render('artist');

 });
     myApp.post('/your_artist', function(req,res){
         let artist_name = req.body.artist_name;
         database.none('INSERT INTO artist (artist_name) values ($1)', [artist_name]).then(function(){
             database.any('SELECT * FROM artist').then(function(data){
                 res.render('your_artist', {'your_artist': data});
             })
         })
     })



 myApp.get('/your_albums', function(req,res){
     database.any('SELECT * FROM album').then(function(data){
         res.render('album', {'album' : data});
     })
 })

//  myApp.get('/your_albums/json', function(req,res){

//     database.any('SELECT * FROM album').then(function(data){
//         res.status(200).json({
//             status: "great",
//             'your_albums' : data
//         })
//     })
//  })

 myApp.get('/track', function(req,res){
     res.render('track');
    
 })

 myApp.post('/your_track', function(req,res){
     var track_name = req.body.track_name;
     var album_id = req.body.album_id;
     var track_duration = req.body.track_duration;
     database.none('INSERT INTO track (track_name, album_id, track_duration) values($1,$2,$3)', [track_name, album_id, track_duration]).then(function(){
         database.any('SELECT * FROM track').then(function(data){
             res.render('your_track', {'your_track' : data})
         })

     })
 })


 myApp.get('/', function(req,res){
     res.send('Hey World')
 })
 
 
 
 
 
 
 var server = myApp.listen(3000, function(){
    console.log('Example app listening on port 3000 ');

 });