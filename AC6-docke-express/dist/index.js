// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Services/userService.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class UserService {
  constructor() {
    _defineProperty(this, "login", app => {
      console.log("login service");
      return "login service";
    });
  }

}

const userService = new UserService();
var _default = userService;
exports.default = _default;
},{}],"Services/workshopService.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class WorkshopService {
  constructor() {
    _defineProperty(this, "find", () => {
      console.log("workshop find service");
      return "workshop find service";
    });
  }

}

const workshopService = new WorkshopService();
var _default = workshopService;
exports.default = _default;
},{}],"View/TodoView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class TodoView {
  home(todos, todo_ids) {
    var html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Todo list</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <script >
      function todoMap() {
        console.log("${todos}")
        var todoList = ${todos};
        var todos = document.querySelector('#todolist');
        todos.innerHTML = '<ul style="width:40%;">' + todoList.map(function (todo,index) {
          console.log(${todo_ids}[index])
          return '<li>' + todo  + '<button style="margin-left:8px;" onclick="completeTask(todo)">' + 'complete ' + todo +'</button>'+ '</li>';
        }).join('') + '</ul>';  
        window.onload = todoMap;
        }
      </script>
      <script >
      function myFunction() {
        console.log("${todos}");
      }
      </script>
      <script >
        function submit() {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    alert(xhr.response);
                }
            }
            xhr.open('get', 'http://localhost:8888/todo/add/'+document.getElementById("taskname").value, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            xhr.send();
        }
    </script>
    <script >
        function completeTask(id) {
            console.log(id)
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    alert(xhr.response);
                }
            }
            xhr.open('get', 'http://localhost:8888/todo/complete/'+id, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            xhr.send();
        }
    </script>
    </head>
    <body>
      <h1>Todo list</h1>
      <div id="todolist" style="width:500px;border:1px solid black;border-radius:8px;min-height:16px;"></div>
      <div style="margin-top:16px;">
      <button type="button"
        onclick="submit()">
        Add todo.</button>
      <input type="text" id="taskname" name="fname"><br><br>
      </div>
      <button onclick=todoMap()>reload todo list</button>
      <script >
      // alert("asd")
      var todoList = ${todos};
      console.log(todoList);
      var todos = document.querySelector('#todolist');
      todos.innerHTML = '<ul style="width:40%;">' + todoList.map(function (todo,index) {
        // var button = document.createElement('button');
        // var param = ${todo_ids}[index];
        // var button.setAttribute('onclick', 'completeTask( " '+param+' " )');
        return '<li>' + todo  + '<button style="margin-left:8px;" id='+${todo_ids}[index]+' onclick=completeTask(this.id)>' + 'complete ' + todo +'</button>'+ '</li>';
      }).join('') + '</ul>';
    </script>
    </body>
    </html>`;
    return html;
  }

}

const todoView = new TodoView();
var _default = todoView;
exports.default = _default;
},{}],"View/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  todoView: true
};
Object.defineProperty(exports, "todoView", {
  enumerable: true,
  get: function () {
    return _TodoView.default;
  }
});

var _TodoView = _interopRequireWildcard(require("./TodoView"));

Object.keys(_TodoView).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _TodoView[key];
    }
  });
});

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
},{"./TodoView":"View/TodoView.js"}],"Services/todoService.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _app = require("../app");

var _View = require("../View");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const tasknameToString = todos => {
  let res = "[";
  todos.map(todo => {
    // console.log(todo.taskname,todo.taskstatus)
    res = res + "'" + todo.taskname + "'" + ',';
  });
  return res.slice(0, -1) + "]";
};

const taskidToString = todos => {
  let res = "[";
  todos.map(todo => {
    console.log(todo._id);
    res = res + "'" + todo._id + "'" + ',';
  });
  return res.slice(0, -1) + "]";
};

class TodoService {
  constructor() {
    _defineProperty(this, "getTodo", taskname => {
      console.log("get taskname : ", taskname);
      const todo = new _app.Todo({
        taskname: 'activity7',
        taskstatus: true
      });
      todo.save(function (err, todo) {
        if (err) return console.error(err);
        console.log(todo);
        console.log(todo.taskname + " saved to todo collection.");
      });
      return taskname;
    });

    _defineProperty(this, "find", res => {
      _app.Todo.find((err, todos) => {
        if (err) return res.status(500).send(err); // console.log("todos",todos)
        // return res.status(200).send(todoView.home("['mylist']"))
        // console.log(parseToString(todos))

        return res.status(200).send(_View.todoView.home(tasknameToString(todos), taskidToString(todos)));
      });
    });

    _defineProperty(this, "addTodo", (taskname, res) => {
      const todo = new _app.Todo({
        taskname: taskname,
        taskstatus: false
      });
      todo.save(function (err, todo) {
        if (err) return console.error(err); // console.log(todo)

        let resp = {
          success: true,
          data: todo
        };
        res.status(200).send(resp); // this.find(res)
      });
    });

    _defineProperty(this, "completeTodo", (taskid, res) => {
      _app.Todo.remove({
        _id: taskid
      }, function (err) {
        if (err) return console.error(err);
        console.log("complted", taskid);
        res.status(200).send(`complted task`);
      });
    });
  }

}

const todoService = new TodoService();
var _default = todoService;
exports.default = _default;
},{"../app":"app.js","../View":"View/index.js"}],"Services/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  userService: true,
  workshopService: true,
  todoService: true
};
Object.defineProperty(exports, "userService", {
  enumerable: true,
  get: function () {
    return _userService.default;
  }
});
Object.defineProperty(exports, "workshopService", {
  enumerable: true,
  get: function () {
    return _workshopService.default;
  }
});
Object.defineProperty(exports, "todoService", {
  enumerable: true,
  get: function () {
    return _todoService.default;
  }
});

var _userService = _interopRequireWildcard(require("./userService"));

Object.keys(_userService).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _userService[key];
    }
  });
});

var _workshopService = _interopRequireWildcard(require("./workshopService"));

Object.keys(_workshopService).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _workshopService[key];
    }
  });
});

var _todoService = _interopRequireWildcard(require("./todoService"));

Object.keys(_todoService).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _todoService[key];
    }
  });
});

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
},{"./userService":"Services/userService.js","./workshopService":"Services/workshopService.js","./todoService":"Services/todoService.js"}],"Controller/UserController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Services = require("../Services/");

function UserController(app) {
  app.get('/user/', (req, res) => {
    res.status(200).send("user controller");
  });
  app.get('/user/login', (req, res) => {
    let respon = _Services.userService.login();

    res.status(200).send(respon);
  });
}

var _default = UserController;
exports.default = _default;
},{"../Services/":"Services/index.js"}],"Controller/WorkshopController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Services = require("../Services");

function WorkshopController(app) {
  app.get('/workshop/', (req, res) => {
    res.status(200).send("workshop controller2");
  });
  app.get('/workshop/find', (req, res) => {
    let respon = _Services.workshopService.find();

    res.status(200).send(respon);
  });
}

var _default = WorkshopController;
exports.default = _default;
},{"../Services":"Services/index.js"}],"Controller/TodoController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Services = require("../Services/");

function TodoController(app, Todo) {
  app.get('/todo/', (req, res) => {
    _Services.todoService.find(res); // res.status(200).send(response);

  });
  app.get('/todo/update/:taskname', (req, res) => {
    var taskname = req.params.taskname;

    let respon = _Services.todoService.getTodo(taskname, Todo);

    res.status(200).send(respon);
  });
  app.get('/todo/add/:taskname', (req, res) => {
    var taskname = req.params.taskname;

    _Services.todoService.addTodo(taskname, res); // console.log(response)
    // return res.status(200).send("success")

  });
  app.get('/todo/complete/:taskid', (req, res) => {
    var taskid = req.params.taskid;

    _Services.todoService.completeTodo(taskid, res); // console.log(response)
    // return res.status(200).send("success")

  });
}

var _default = TodoController;
exports.default = _default;
},{"../Services/":"Services/index.js"}],"Controller/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserController = _interopRequireDefault(require("./UserController"));

var _WorkshopController = _interopRequireDefault(require("./WorkshopController"));

var _TodoController = _interopRequireDefault(require("./TodoController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <title>A JavaScript project</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <h1>A JavaScript project</h1>
</body>
</html>`;

function Controller(app, Todo) {
  console.log("app");
  app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.status(200).send(html);
  });
  (0, _UserController.default)(app);
  (0, _WorkshopController.default)(app);
  (0, _TodoController.default)(app, Todo);
}

var _default = Controller;
exports.default = _default;
},{"./UserController":"Controller/UserController.js","./WorkshopController":"Controller/WorkshopController.js","./TodoController":"Controller/TodoController.js"}],"Schema/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TODO_SCHEMA = void 0;
const TODO_SCHEMA = {
  taskname: String,
  taskstatus: Boolean
};
exports.TODO_SCHEMA = TODO_SCHEMA;
},{}],"app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Todo = exports.db = void 0;

var _Controller = _interopRequireDefault(require("./Controller"));

var _Schema = require("./Schema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const express = require('express');

var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const todoSchema = new Schema(_Schema.TODO_SCHEMA);
var mongo_uri = "mongodb://admin:secure@mongo:27017";
console.log("mongo_uri", mongo_uri);
var db;
exports.db = db;
var Todo;
exports.Todo = Todo;

const initMongoose = db => {
  db = mongoose.createConnection(mongo_uri);
  mongoose.connect(mongo_uri, {
    useNewUrlParser: true
  }).then(() => {
    console.log("[success] task 2 : connected to the database ");
  }, error => {
    console.log("[failed] task 2 " + error); // process.exit();

    throw new Error("ops");
  }).catch(err => {
    console.log(err);
  });
  exports.Todo = Todo = db.model('todo', todoSchema);
};

setTimeout(function (db) {
  initMongoose(db, Todo);
}, 10000);
console.log("yaay");
const app = express();
(0, _Controller.default)(app, Todo);
module.exports = app;
},{"./Controller":"Controller/index.js","./Schema":"Schema/index.js"}],"index.js":[function(require,module,exports) {
const app = require('./app');

const port = '8888';
app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
},{"./app":"app.js"}]},{},["index.js"], null)
//# sourceMappingURL=/index.js.map