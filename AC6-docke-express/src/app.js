import Controller from './Controller'
import { TODO_SCHEMA } from './Schema'
const express = require('express');
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema
const todoSchema = new Schema(TODO_SCHEMA)
var mongo_uri = "mongodb://@mongo:27017";
console.log("mongo_uri",mongo_uri)


export var db
export var Todo 


const initMongoose = (db) => {
  db = mongoose.createConnection(mongo_uri)

  mongoose.connect(mongo_uri, { useNewUrlParser: true }).then(
    () => {
      console.log("[success] task 2 : connected to the database ");
    },
    error => {
      console.log("[failed] task 2 " + error);
      // process.exit();
      throw new Error("ops")
    }
  ).catch((err)=>{
    console.log(err)
  })

  Todo = db.model('todo', todoSchema)
  
}


setTimeout(function(db){ 
  initMongoose(db,Todo)

 }, 10000);



console.log("yaay")

const app = express();

Controller(app,Todo)

module.exports = app;