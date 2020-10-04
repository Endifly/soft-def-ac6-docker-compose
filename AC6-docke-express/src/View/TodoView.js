class TodoView {
  home(todos,todo_ids) {
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
            xhr.open('get', 'http://localhost:80/todo/add/'+document.getElementById("taskname").value, true);
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
            xhr.open('get', 'http://localhost:80/todo/complete/'+id, true);
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
    return (html)
  }
}
const todoView = new TodoView();

export default todoView;