const router = require('express').Router();
const TaskControllerr = require('../controllers/task_controller');

router.post('/addTask', (req, res) => {
    TaskControllerr.addTask(req, res)
});

router.get('/viewAllTasks', (req, res) => {
    TaskControllerr.viewAllTasks(req, res)
});

router.get('/viewSingleTask/:id', (req, res) => {
    TaskControllerr.viewSingleTask(req, res)
});
router.delete('/deleteTask/:id', (req, res) => {
    TaskControllerr.deleteTask(req, res)
});

router.all('*', (req, res) => {
    res.status(err.status).send('The rout isnt avileble..')
})
module.exports = router;