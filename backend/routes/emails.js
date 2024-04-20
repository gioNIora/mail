const express = require('express');
const router = express.Router();
const EmailController = require('../controllers/emails');

router.post('/', EmailController.createEmail);
router.get('/c/:emailCategory', EmailController.getEmailsByCategory);
router.get('/:emailId', EmailController.getEmailById);
router.patch('/:emailId', EmailController.archiveEmail);

module.exports = router;
