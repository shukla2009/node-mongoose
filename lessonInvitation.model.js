/**
 * Created by synerzip on 7/8/16.
 */


// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var lessonsInvitationSchema = new Schema({
    anonymous: String,
    lessonId: String,
    subject: String,
    language: String,
    age: String,
    name: String,
    lastUpdate: String,
    emailNotification: String,
    invitee: String,
    lesson: String,
    quizItems: String,
    finished: String
});

// the schema is useless so far
// we need to create a model using it
var LessonsInvitation = mongoose.model('lessonsInvitation', lessonsInvitationSchema ,'lessonsInvitations');

// make this available to our users in our Node applications
module.exports = LessonsInvitation;

