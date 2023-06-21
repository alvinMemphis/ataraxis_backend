const bookedAppointments = [
  { date: '2023-06-21', doctor: 'Doctor A' },
  { date: '2023-06-22', doctor: 'Doctor B' },
  { date: '2023-06-23', doctor: 'Doctor C' }
];


// Handler function to schedule an appointment
 const scheduleAppointment = (patientId, date) => {
  if (!date) {
    throw new Error('Date is required.');
  }
  // Check if the appointment date is already booked
  const isSlotAvailable = !bookedAppointments.find(appointment => appointment.date === date);

  if (isSlotAvailable) {
    // Assign the appointment to the patient
    const appointment = { date, patientId };
    bookedAppointments.push(appointment);
    return appointment;
  } else {
    throw new Error('The selected appointment slot is already booked.');
  }
};

module.exports = scheduleAppointment
