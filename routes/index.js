const express=require("express")
const router=express.Router();
const userControler=require("../controllers/userControllers");
//endpoint
router.get('/users',userControler.getAllUsers);
router.get('/hello',userControler.hello);
 router.get('/users/:id',userControler.getUserByID);
// router.get('/users/ip/:ip_address', userControler.getUserByIP);
// router.get('/users/ip_email/:ip_email', userControler.getUserBytwo);
router.post('/users',userControler.createUser)
router.put('/users',userControler.updateUser)
router.delete('/users',userControler.deleteUser)

module.exports = router;