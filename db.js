/**
 * Created by pablo on 22/06/14.
 */
var MongoReaction = require('mongo-reaction'),
    config = require('./config.json');

var db = MongoReaction.map("notes", "mongodb://" + config.dbhost + ":"+ config.dbport + "/notes");

module.exports.db = db;