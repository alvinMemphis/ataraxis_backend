const EHRSystem = require('../utils/PatientRecord')
const ehrSystem = new EHRSystem('mongodb://localhost/ehrdb');
const express = require('express');
const router = express.Router();
// Endpoint to add a patient record
router.post('/patient', (req, res) => {
  const record = req.body;
  ehrSystem.addPatientRecord(record)
    .then(savedRecord => {
      res.json(savedRecord);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to add patient record' });
    });
});

// Endpoint to retrieve a patient record by ID
router.get('/patient/:id', (req, res) => {
  const id = parseInt(req.params.id);
  ehrSystem.retrievePatientRecordById(id)
    .then(record => {
      if (record) {
        res.json(record);
      } else {
        res.status(404).json({ error: 'Patient record not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to retrieve patient record' });
    });
});

// Endpoint to update a patient record
router.put('/patient/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedInfo = req.body;
  ehrSystem.updatePatientRecord(id, updatedInfo)
    .then(updatedRecord => {
      if (updatedRecord) {
        res.json(updatedRecord);
      } else {
        res.status(404).json({ error: 'Patient record not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to update patient record' });
    });
});

module.exports =router
