const errorHandler = (err, req, res, next) => {
  // Log full error details to console
  console.error("═══════════════════════════════════════");
  console.error("❌ ERROR CAUGHT:");
  console.error("Message:", err.message);
  console.error("Stack:", err.stack);
  console.error("Request URL:", req.method, req.originalUrl);
  console.error("Request Body:", JSON.stringify(req.body, null, 2));
  console.error("═══════════════════════════════════════");

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    console.error("Validation Errors:", messages);
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: messages,
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    console.error("Duplicate Key Error:", field, err.keyValue[field]);
    return res.status(400).json({
      success: false,
      message: `Duplicate value for ${field}: ${err.keyValue[field]}`,
    });
  }

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    console.error("Cast Error:", err.path, err.value);
    return res.status(404).json({
      success: false,
      message: "Resource not found",
    });
  }

  // Default server error
  console.error("Internal Server Error:", err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
