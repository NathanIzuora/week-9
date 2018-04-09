var Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://localhost:5432/SeqClass');

const models = {
    post : sequelize.import('./post'),
    comment: sequelize.import('./comment')
};

var article = connection.define('article',
{
    title: Sequelize.STRING,
    body: Sequelize.TEXT
});

connection.sync().then(function(){
    article.create({
        title: "hello world",
        body: "random sentence in latin"

    })
})
var server = article.listen(1000, function(){
        console.log("hello world");
})