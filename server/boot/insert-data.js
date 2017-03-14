var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectId;
var url = require('../datasources.json').mlab.url;

var models = [
    'Tests',
    'Questions',
    'Images'
];
var targetModel, targetRequire;
// Creates an array of 10 ObjectIds for use in creating the test data
/*
var tempOutput = [];
for (var i = 0; i < 10; i++) {
    tempOutput.push(new ObjectId());
}
console.log(tempOutput);
// */
module.exports = function(app) {
    mongoConnect(url, function(err, db) {
        for (var model of models) {
            targetModel = db.collection(model);
            targetRequire = require('../db-tests/' + model + ".json") || [];

            for (var singleReq of targetRequire) {
                if (model !== 'Images')
                    singleReq._id = ObjectId(singleReq._id);
                if (model == 'Questions')
                    singleReq.testId = ObjectId(singleReq.testId);
            }
            targetModel.insertMany(targetRequire);
        }
        db.close();
    });
};
//remove when moving to prod
module.exports();


function mongoConnect(dbUrl, next) {
    MongoClient.connect(dbUrl, function(err, db) {
        if (err) throw err;
        next(err, db);
    });
}
