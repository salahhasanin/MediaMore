var mongoose = require("mongoose");

var placeSchema = new mongoose.Schema(
  {
    placeName: {
      type: String,
      required: true,
      minlength: 5,
      trim: true
    },
    image: {
      type: String,
      required: true
    },

    describtion: {
      type: String,
      default: false,
      minlength: 15
    },
    addedAt: {
      type: String,
      default: null
    },
    rate: {
      type: Number,
      min: 0,
      max: 5
    },
    _creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    lastUpdate: {
      type: String
    },
    location: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      default: 0
    },
    likedBy: {
      type: Array
    },
    dislikes: {
      type: Number,
      default: 0
    },
    dislikedBy: {
      type: Array
    },
    comments: [
      {
        comment: { type: String },
        commentator: { type: String }
      }
    ]
  },
  { usePushEach: true }
);

var Place = mongoose.model("Place", placeSchema);

module.exports = {
  Place
};
