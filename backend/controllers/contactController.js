const Contact = require("../models/Contact");
const { sendContactEmail } = require("../services/emailService");

// @desc    Submit contact form and send email
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: name, email, subject, message",
      });
    }

    // Create contact message in database
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // Try to send email
    try {
      await sendContactEmail({ name, email, subject, message });

      // Update contact record to show email was sent
      contact.emailSent = true;
      contact.emailSentAt = new Date();
      await contact.save();

      console.log(`✅ Email sent for contact from ${name} (${email})`);
    } catch (emailError) {
      console.error("❌ Failed to send email:", emailError.message);
      // Still save the contact even if email fails
      // The message is saved in database, can be viewed manually
    }

    res.status(201).json({
      success: true,
      message:
        "Message sent successfully! Thank you for reaching out. I will get back to you soon.",
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    console.error("Contact form error:", error);

    // Check for validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: "Error sending message. Please try again later.",
      error: error.message,
    });
  }
};

// @desc    Get all contact messages (Admin)
// @route   GET /api/admin/contacts
// @access  Private
const getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10, read, emailSent } = req.query;

    let query = {};

    // Filter by read status
    if (read === "true") query.read = true;
    if (read === "false") query.read = false;

    // Filter by email sent status
    if (emailSent === "true") query.emailSent = true;
    if (emailSent === "false") query.emailSent = false;

    const total = await Contact.countDocuments(query);

    const contacts = await Contact.find(query)
      .sort("-createdAt")
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select("-__v");

    res.json({
      success: true,
      count: contacts.length,
      total,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalMessages: total,
      },
      data: contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching messages",
      error: error.message,
    });
  }
};

// @desc    Get single contact message (Admin)
// @route   GET /api/admin/contacts/:id
// @access  Private
const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching message",
      error: error.message,
    });
  }
};

// @desc    Mark message as read (Admin)
// @route   PATCH /api/admin/contacts/:id/read
// @access  Private
const markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true },
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.json({
      success: true,
      message: "Message marked as read",
      data: contact,
    });
  } catch (error) {
    console.error("Error marking as read:", error);
    res.status(500).json({
      success: false,
      message: "Error updating message",
      error: error.message,
    });
  }
};

// @desc    Delete contact message (Admin)
// @route   DELETE /api/admin/contacts/:id
// @access  Private
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting message",
      error: error.message,
    });
  }
};

// @desc    Resend email for a contact (Admin)
// @route   POST /api/admin/contacts/:id/resend
// @access  Private
const resendEmail = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    await sendContactEmail({
      name: contact.name,
      email: contact.email,
      subject: contact.subject,
      message: contact.message,
    });

    contact.emailSent = true;
    contact.emailSentAt = new Date();
    await contact.save();

    res.json({
      success: true,
      message: "Email resent successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Error resending email:", error);
    res.status(500).json({
      success: false,
      message: "Error resending email",
      error: error.message,
    });
  }
};

module.exports = {
  submitContact,
  getContacts,
  getContact,
  markAsRead,
  deleteContact,
  resendEmail,
};
