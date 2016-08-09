/**
 * Created by synerzip on 7/8/16.
 */

/**
 * Created by synerzip on 7/8/16.
 */


// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var reportSchema = new Schema({
    invitationId : String,
    answers : String,
    stepDurations : String,
    data : {
        finished: Boolean,
        quizItems: Object,
        lesson: Object,
        invitee: {
            class:String,
            name : String
        },
        emailNotification: Boolean,
        lastUpdate: Number,
        name: String,
        age: Number,
        language:String,
        subject: String,
        //lessonId: mongoose.Types.ObjectId,
        anonymous: Boolean
      //  _id: mongoose.Types.ObjectId
    },
    duration : String,
    lastUpdate : String,
    correctPercentage : String,
    finished : String
});

// the schema is useless so far
// we need to create a model using it
var Report = mongoose.model('report', reportSchema );

// make this available to our users in our Node applications
module.exports = Report;


