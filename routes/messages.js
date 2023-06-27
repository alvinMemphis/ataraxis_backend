const express = require('express');
const router = express.Router();
const { Message } = require('../schema/db');
const crypto = require('crypto');

// Encryption and decryption functions
function encryptMessage(message, secretKey) {
  const cipher = crypto.createCipher('aes-256-cbc', secretKey);
  let encryptedMessage = cipher.update(message, 'utf8', 'hex');
  encryptedMessage += cipher.final('hex');
  return encryptedMessage;
}

function decryptMessage(encryptedMessage, secretKey) {
  const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
  let decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf8');
  decryptedMessage += decipher.final('utf8');
  return decryptedMessage;
}

router.use(express.json());

// Handle new messages
router.post('/messages', (req, res) => {
  const { sender, receiver, message, secretKey } = req.body;

  // Encrypt the message
  const encryptedMessage = encryptMessage(message, secretKey);

  // Save the encrypted message to the database
  const newMessage = new Message({
    sender,
    receiver,
    message: encryptedMessage
  });

  newMessage.save()
    .then(savedMessage => {
      // Decrypt the message
      savedMessage.message = decryptMessage(savedMessage.message, secretKey);
      res.json(savedMessage);
    })
    .catch(error => {
      console.error('Error saving message:', error);
      res.status(500).json({ error: 'Error saving message' });
    });
});

module.exports = router;

