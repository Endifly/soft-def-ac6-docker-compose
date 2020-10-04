import { workshopService } from '../Services'

function WorkshopController(app) {
  app.get('/workshop/', (req, res) => {
    res.status(200).send("workshop controller2");
  });

  app.get('/workshop/find',(req,res) => {
    let respon = workshopService.find()
    res.status(200).send(respon)
  })
}
export default WorkshopController