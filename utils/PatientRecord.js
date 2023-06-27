const mongoose = require('mongoose');

// Define the patient record schema
const patientRecordSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

// Define the PatientRecord model
const PatientRecord = mongoose.model('PatientRecord', patientRecordSchema);

class EHRSystem {
  constructor(databaseUrl) {
    mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('Connected to the database');
      })
      .catch(error => {
        console.error('Database connection error:', error);
      });
  }

  addPatientRecord(record) {
    const newRecord = new PatientRecord(record);
    return newRecord.save();
  }

  retrievePatientRecordById(id) {
    return PatientRecord.findOne({ id });
  }

  updatePatientRecord(id, updatedInfo) {
    return PatientRecord.findOneAndUpdate({ id }, updatedInfo, { new: true });
  }
}

