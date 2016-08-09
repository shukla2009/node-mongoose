var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/lergo-test');

var User = require('./lessonInvitation.model');
var Report = require('./report.model');


// User.find({}, function (err, docs) {
//     docs.forEach(function (d) {
//         console.log(JSON.stringify(d))
//     })
// });
console.log('++++++++++++++++++++++++++++')
// Report.find({}, function (err, docs) {
//    console.log(docs)
// });


// map function
var map = function () {
    emit(this.invitationId, {
        count: 1,
        class: this.data.invitee.class,
        duration: this.duration,
        correctPercentage: this.correctPercentage,
        finished: this.finished,
        subject:this.data.subject,
        name:this.data.name,
        inviter:this.data.inviter
        // list other fields like above to select them
    })
};

// reduce function
var reduce = function (key, values) {

    reducedVal = {
        count: values.length,
        finished: true,
        class: values[0].class,
        subject:values[0].subject,
        name:values[0].name,
        inviter:values[0].inviter,
        duration: 0,
        correctPercentage: 0
    };

    for (var i = 0; i < values.length; i++) {
        reducedVal.finished = reducedVal.finished && values[i].finished;
        reducedVal.duration += values[i].duration;
        reducedVal.correctPercentage += values[i].correctPercentage;
    }
    return reducedVal;
};

var finalizer = function (key, reducedVal) {
    reducedVal.correctPercentage = reducedVal.correctPercentage/reducedVal.count;
    reducedVal.duration = reducedVal.duration/reducedVal.count;

    return reducedVal;
};

// condition
var query = {
    'data.invitee.class': {'$exists': true}
};

// map-reduce command
var command = {
    //mapreduce: "reports", // the name of the collection we are map-reducing
    map: map , // a function for mapping
    reduce: reduce, // a function  for reducing
    finalize:finalizer,
    query: query, // filter conditions
    out:'classReports'
};




var CronJob = require('cron').CronJob;
new CronJob('* * * * * *', function() {
    Report.mapReduce(command);
    console.log('You will see this message every second');
}, null, true, 'America/Los_Angeles');


