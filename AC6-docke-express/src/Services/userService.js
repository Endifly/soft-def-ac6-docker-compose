class UserService {
  login = (app) => {
    console.log("login service")
    return ("login service")
  }
}
const userService = new UserService();

export default userService;