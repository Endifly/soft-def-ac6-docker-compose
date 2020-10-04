import { userService } from "../Services/"

function UserController(app) {
  app.get('/user/', (req, res) => {
    res.status(200).send("user controller");
  });

  app.get('/user/login', (req,res) => {
    let respon = userService.login()
    res.status(200).send(respon)
  })
}
export default UserController