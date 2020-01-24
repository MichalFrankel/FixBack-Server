const router = require('express').Router();
const UserControllerr = require('../controllers/user_controller');
console.log("jfj");
router.post('/addUser', (req, res) => {
    UserControllerr.addUser(req, res)
});

router.get('/viewAllUsers', (req, res) => {
    UserControllerr.viewAllUsers(req, res)
});

router.get('/viewSingleUser/:id', (req, res) => {
    UserControllerr.viewSingleUser(req, res)
});
router.delete('/deleteUser/:id', (req, res) => {
    UserControllerr.deleteUser(req, res)
});

router.all('*', (req, res) => {
    res.status(err.status).send("The rout isn't avilable..")
})
module.exports = router;