// var fs = require('fs');
// var root = "/home/ubuntu/workspace/project-bk";
// //"/var/www/html/project-bk";

// function createUser(AppUsers, cb) {
//     AppUsers.find({
//         where: {
//             email: "jpbrown@softstackfactory.org"
//         }
//     }, function(error, response) {
//         if (error) throw error;
//         if (!response || response.length == 0) {
//             AppUsers.upsert({
//                 email: "jpbrown@softstackfactory.org",
//                 firstName: "John",
//                 lastName: "Brown",
//                 password: "AAAaaa1!"
//             }, function(err, res) {
//                 if (err) throw err;
//                 cb(0, res.id);
//             });
//         }
//         else {
//             cb(0, response[0].__data.id);
//         }
//     });
// }

// function copyImages(params, cb) {
//     /*
//     {
//         userId: userId,
//         model: Images,
//         testId: testId
//     }
//     */

//     // var root = "/home/ubuntu/workspace/initial-data";

//     var target = root + "/server/storage/image-container";
//     var questionIds = fs.readdirSync(root + "/initial-data/images");
//     questionIds.forEach(function(imgCase, index, tempQuestionIds) {
//         var tempArr = [];
//         fs.readdirSync(root + "/initial-data/images/" + imgCase).forEach(function(img, imageIndex, tempImageIds) {
//             if (img.match(/.jpg|.jpeg/)) {
//                 fs.readFile(root + "/initial-data/images/" + imgCase + "/" + img, function(err, res) {
//                     if (err) throw err;
//                     fs.writeFile(target + "/" + params.userId + " " + img, res, function(error, response) {
//                         if (error) throw error;
//                     });
//                 });
//                 createImageRecord({
//                     model: params.model,
//                     imgName: params.userId + " " + img,
//                     jsonPath: root + "/initial-data/json/" + imgCase + "/" + img.split(".")[0] + ".json",
//                     userId: params.userId,
//                     testId: params.testId
//                 });
//                 tempArr.push(params.userId + " " + img);
//             }
//         });
//         //create questions
//         createQuestions({
//             caseId: imgCase,
//             testId: params.testId,
//             model: params.model.app.models.Questions,
//             imageIds: tempArr
//         });
//         // console.log("ImageIdArray: ", tempArr);
//     });
// }

// function createImageRecord(params) {
//     /*
//     {
//         model: Images,
//         imgName: imgName,
//         jsonPath: path to json file,
//         userId: userId,
//         testId: testId
//     }
//     */
//     var jsonData = require(params.jsonPath);
//     return params.model.findOrCreate({
//         where: {
//             userId: params.userId,
//             name: params.imgName
//         }
//     }, {
//         url: "/ImageContainer/image-container/files/" + params.imgName,
//         name: params.imgName,
//         description: "This is an image for development testing purposes.",
//         tags: "",
//         userId: params.userId,
//         wScore: JSON.stringify(jsonData.images[0].classifiers[0].classes)
//     }, function(err, res) {
//         if (err) throw err;
//         return res.id;
//     });
// }

// function createTest(params) {
//     /*
//     {
//         model: Tests,
//         userId: userId
//     }
//     */
//     params.model.findOrCreate({
//         where: {
//             title: "Enlarged Hearts",
//             description: `The purpose of this test is to see how people score up against Watson.`,
//             purpose: "quiz",
//             style: "boolean",
//             userId: params.userId
//         }
//     }, {
//         title: "Enlarged Hearts",
//         description: `The purpose of this test is to see how people score up against Watson.`,
//         purpose: "quiz",
//         style: "boolean",
//         version: 0,
//         answerChoices: ["Enlarged", "Undetermined", "Normal"],
//         userId: params.userId
//     }, function(err, res) {
//         if (err) throw err;
//         // createQuestions({
//         //     testId: res.id,
//         //     model: params.model.app.models.Questions
//         // });

//         copyImages({
//             userId: params.userId,
//             model: params.model.app.models.Images,
//             testId: res.id
//         }, function(copyImgErr, copyImgRes) {

//         });
//     });
// }

// function createQuestions(params) {
//     /*
//     {
//         caseId: imgCase,
//         testId: testId,
//         model: Questions,
//         imageIds: imageIds
//     }
//     */
//     params.model.findOrCreate({
//         imageIds: params.imageIds,
//         answer: require(root + '/initial-data/_definitions.json')[params.caseId] == "normal" ? "Normal" : "Enlarged",
//         testId: params.testId,
//         tags: ""
//             // "wScore": [
//             // 0
//             // ]
//     });
// }


// module.exports = function(app) {
//     var AppUsers = app.models.AppUsers;
//     var Images = app.models.Images;
//     var Tests = app.models.Tests;
//     var Questions = app.models.Questions;

//     var TestTaken = app.models.TestTaken;
//     TestTaken.remove();

//     var UserAnswers = app.models.UserAnswers;
//     UserAnswers.remove();

//     console.log("Removing all records from Images and ImageContainer model");
//     fs.readdirSync(root + '/server/storage/image-container').forEach(function(path) {
//         fs.unlinkSync(root + '/server/storage/image-container' + "/" + path);
//     });
//     Images.remove();
//     Tests.remove();
//     Questions.remove();

//     createUser(AppUsers, function(err, userId) {
//         if (err) throw err;
//         createTest({
//             model: Tests,
//             userId: userId
//         });
//     });
// };
