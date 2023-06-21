var scheduleAppointment = require( '../handlers/schedule_appt');
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Endpoint to schedule an appointment
router.post('/schedule', (req, res) => {
  const { patientId, date } = req.body;

  try {
    const appointment = scheduleAppointment(patientId, date);
    res.status(200).json({ message: 'Appointment scheduled successfully!', appointment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
