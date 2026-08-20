import Message from "../models/messageModel.js";

// ── Send a message ────────────────────────────────────────────────────────────
export const SendMessage = async (req, res, next) => {
  try {
    const { receiverID, message } = req.body;
    const currentUser = req.user;

    if (!receiverID || !message) {
      const error = new Error("Receiver ID and message are required");
      error.statusCode = 400;
      return next(error);
    }

    const newMessage = await Message.create({
      senderId: currentUser._id,
      receiverId: receiverID,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    next(error);
  }
};

// ── Get messages between two users ────────────────────────────────────────────
export const GetMessages = async (req, res, next) => {
  try {
    const { friendId } = req.params;
    const currentUser = req.user;

    const messages = await Message.find({
      $or: [
        { senderId: currentUser._id, receiverId: friendId },
        { senderId: friendId, receiverId: currentUser._id },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    next(error);
  }
};
