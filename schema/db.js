const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect('mongodb://localhost/hss', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(error => {
    console.error('Database connection error:', error);
  });

// Define message schema
const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Define patient record schema
const patientRecordSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  medicalHistory: { type: String, required: true }
});

// Define schedule schema
const scheduleSchema = new mongoose.Schema({
  doctor: { type: String, required: true },
  patient: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  duration: { type: Number, required: true },
});

// Define the Message model
const Message = mongoose.model('Message', messageSchema);

// Define the PatientRecord model
const PatientRecord = mongoose.model('PatientRecord', patientRecordSchema);

// Define the Schedule model
const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = {
  Message,
  PatientRecord,
  Schedule
};

