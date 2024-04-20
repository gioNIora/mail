const User = require('../models/User');

exports.createEmail = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { recipients, subject, body } = req.body;

    const email = new Email({
      sender: req.session.user._id,
      recipients: recipients.split(',').map(recipient => recipient.trim()),
      subject,
      body
    });

    await email.save();

    res.status(201).json(email);
  } catch (error) {
    console.error('Error creating email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getEmailsByCategory = async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
  
      const { emailCategory } = req.params;
      let query;
  
      if (emailCategory === 'Inbox') {
        query = { recipients: req.session.user.email, archived: false };
      } else {
        query = { recipients: req.session.user.email, category: emailCategory };
      }
  
      const emails = await Email.find(query).sort({ sentAt: -1 });
  
      res.json(emails);
    } catch (error) {
      console.error('Error fetching emails by category:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
exports.getEmailById = async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const { emailId } = req.params;
  
      const email = await Email.findById(emailId);

      if (!email || !email.recipients.includes(req.session.user.email)) {
        return res.status(404).json({ message: 'Email not found' });
      }
  
      res.json(email);
    } catch (error) {
      console.error('Error fetching email by id:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

exports.archiveEmail = async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
  
      const { emailId } = req.params;
      const { archived } = req.body;

      const email = await Email.findById(emailId);

      if (!email || !email.recipients.includes(req.session.user.email)) {
        return res.status(404).json({ message: 'Email not found' });
      }

      email.archived = archived;
      await email.save();
  
      res.json(email);
    } catch (error) {
      console.error('Error archiving email:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
