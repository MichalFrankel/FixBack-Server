const router = require('express').Router();
const roomController = require('../controllers/room_controller');

router.post('/addRoom', (req, res) => {
    roomController.addRoom(req, res)
});

router.get('/viewAllRooms', (req, res) => {
    roomController.viewAllRooms(req, res)
});

router.get('/viewSingleRoom/:id', (req, res) => {
    roomController.viewSingleRoom(req, res)
});
router.delete('/deleteRoom/:id', (req, res) => {
    roomController.deleteRoom(req, res)
});

// router.all('*', (req, res) => {
//     res.status(err.status).send('The rout isnt avileble..')
// })
module.exports = router;