import { Todo } from '../app'
import { todoView } from '../View'

const tasknameToString = (todos) => {
  let res = "["
  todos.map((todo)=>{
    // console.log(todo.taskname,todo.taskstatus)
    res = res+"'"+todo.taskname+"'"+','
  })
  return res.slice(0, -1)+"]"
}
const taskidToString = (todos) => {
  let res = "["
  todos.map((todo)=>{
    // console.log(todo._id)
    res = res+"'"+todo._id+"'"+','
  })
  return res.slice(0, -1)+"]"
}

class TodoService {
  getTodo = (taskname) => {
    console.log("get taskname : ",taskname)
    const todo = new Todo({ taskname: 'activity7', taskstatus: true })
    todo.save(function (err, todo) {
      if (err) return console.error(err);
      console.log(todo)
      console.log(todo.taskname + " saved to todo collection.");
    });
    return (taskname)
  }
  find = (res) => {
    Todo.find((err,todos)=>{
      if (err) return res.status(500).send(err)
      // console.log("todos",todos)
      // return res.status(200).send(todoView.home("['mylist']"))
      // console.log(parseToString(todos))
      return res.status(200).send(todoView.home(tasknameToString(todos),taskidToString(todos)))
    })
  }
  addTodo = (taskname,res) => {
    const todo = new Todo({ taskname: taskname, taskstatus: false })
    todo.save(function (err, todo) {
      if (err) return console.error(err);
      // console.log(todo)
      let resp = {
        success : true,
        data : todo,
      }
      res.status(200).send(resp)
      // this.find(res)
    })
  }

  completeTodo = (taskid,res) => {
    Todo.remove({_id:taskid},function (err) {
      if (err) return console.error(err);
      console.log("complted",taskid)
      res.status(200).send(`completed task`)
    })
  }
}
const todoService = new TodoService();

export default todoService;