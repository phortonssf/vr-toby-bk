//var questions = require("./Questions.json");
var images = require("./Images.json");
var ids = ["58c88bdec5166e9407de9c6a", "58c88bdec5166e9407de9c6b", "58c88bdec5166e9407de9c6c", "58c88bdec5166e9407de9c6d", "58c88bdec5166e9407de9c6e", "58c88bdec5166e9407de9c6f", "58c88bdec5166e9407de9c70", "58c88bdec5166e9407de9c71", "58c88bdec5166e9407de9c72", "58c88bdec5166e9407de9c73", "58c88bdec5166e9407de9c74", "58c88bdec5166e9407de9c75", "58c88bdec5166e9407de9c76", "58c88bdec5166e9407de9c77", "58c88bdec5166e9407de9c78", "58c88bdec5166e9407de9c79", "58c88bdec5166e9407de9c7a", "58c88bdec5166e9407de9c7b", "58c88bdec5166e9407de9c7c", "58c88bdec5166e9407de9c7d", "58c88bdec5166e9407de9c7e", "58c88bdec5166e9407de9c7f", "58c88bdec5166e9407de9c80", "58c88bdec5166e9407de9c81", "58c88bdec5166e9407de9c82", "58c88bdec5166e9407de9c83", "58c88bdec5166e9407de9c84", "58c88bdec5166e9407de9c85", "58c88bdec5166e9407de9c86", "58c88bdec5166e9407de9c87"];
var questions = [];
var fs = require("fs");
//Make questions for each image in images.json
var test = function() {
    images.forEach(function(image, index) {
        questions.push({
            "_id": ids[index],
            "answer": "Normal",
            "testId": "58c885f2f194456bc4620e8d",
            "imageIds": image._id
        })
    })
    fs.writeFile("./questions2.json", JSON.stringify(questions));

}
test();
