import { todoService } from "../Services/"

function TodoController(app,Todo) {
  app.get('/todo/', (req, res) => {
    todoService.find(res)
    // res.status(200).send(response);
  });

  app.get('/todo/update/:taskname', (req,res) => {
    var taskname = req.params.taskname;
    let respon = todoService.getTodo(taskname,Todo)
    res.status(200).send(respon)
  })

  app.get('/todo/add/:taskname',(req,res)=>{
    var taskname = req.params.taskname;
    todoService.addTodo(taskname,res)
    // console.log(response)
    // return res.status(200).send("success")
  })

  app.get('/todo/complete/:taskid',(req,res)=>{
    var taskid = req.params.taskid;
    todoService.completeTodo(taskid,res)
    // console.log(response)
    // return res.status(200).send("success")
  })
}
export default TodoController