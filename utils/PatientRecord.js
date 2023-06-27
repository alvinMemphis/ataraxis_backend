const mongoose = require('mongoose');

const {PatientRecord} = require('../schema/db')

class EHRSystem {
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

module.exports = EHRSystem;
