const mongoose = require("mongoose");
const User = require("./models/user");
const Place = require("./models/places");
/* ===============================================================
     LIKE place
  =============================================================== */
module.exports.likePlace = (req, res) => {
  // Check if id was passed provided in request body
  if (!req.body.id) {
    res.json({ success: false, message: "No id was provided." }); // Return error message
  } else {
    // Search the database with id
    Place.findOne({ _id: req.body.id }, (err, place) => {
      // Check if error was encountered
      if (err) {
        res.json({ success: false, message: "Invalid place id" }); // Return error message
      } else {
        // Check if id matched the id of a place post in the database
        if (!place) {
          res.json({ success: false, message: "That place was not found." }); // Return error message
        } else {
          // Get data from user that is signed in
          User.findOne({ _id: req.body.userId }, (err, user) => {
            // Check if error was found
            if (err) {
              res.json({ success: false, message: "Something went wrong." }); // Return error message
            } else {
              // Check if id of user in session was found in the database
              if (!user) {
                res.json({
                  success: false,
                  message: "Could not authenticate user."
                }); // Return error message
              } else {
                // Check if user who liked post is the same user that originally created the video post
                /* if (user.fullName === video.createdBy) {
                  res.json({
                    success: false,
                    messagse: "Cannot like your own video."
                  }); // Return error message
                }*/ //else {
                // Check if the user who liked the post has already liked the place post before
                if (place.likedBy.includes(user.fullName)) {
                  res.json({
                    success: false,
                    message: "You already liked this place."
                  }); // Return error message
                } else {
                  // Check if user who liked post has previously disliked a post
                  if (place.dislikedBy.includes(user.fullName)) {
                    place.dislikes--; // Reduce the total number of dislikes
                    const arrayIndex = place.dislikedBy.indexOf(user.fullName); // Get the index of the username in the array for removal
                    place.dislikedBy.splice(arrayIndex, 1); // Remove user from array
                    place.likes++; // Increment likes
                    place.likedBy.push(user.fullName); // Add fullName to the array of likedBy array
                    // Save place post data
                    place.save(err => {
                      // Check if error was found
                      if (err) {
                        res.json({
                          success: false,
                          message: "Something went wrong."
                        }); // Return error message
                      } else {
                        res.json({ success: true, message: "place liked!" }); // Return success message
                      }
                    });
                  } else {
                    place.likes++; // Incriment likes
                    place.likedBy.push(user.fullName); // Add liker's fullName into array of likedBy
                    // Save place post
                    place.save(err => {
                      if (err) {
                        res.json({
                          success: false,
                          message: "Something went wrong."
                        }); // Return error message
                      } else {
                        res.json({ success: true, message: "place liked!" }); // Return success message
                      }
                    });
                  }
                }
                //  }
              }
            }
          });
        }
      }
    });
  }
};

/* ===============================================================
     DISLIKE place 
  =============================================================== */
module.exports.DislikePlace = (req, res) => {
  // Check if id was provided inside the request body
  if (!req.body.id) {
    res.json({ success: false, message: "No id was provided." }); // Return error message
  } else {
    // Search database for blog post using the id
    Place.findOne({ _id: req.body.id }, (err, place) => {
      // Check if error was found
      if (err) {
        res.json({ success: false, message: "Invalid place id" }); // Return error message
      } else {
        // Check if video post with the id was found in the database
        if (!place) {
          res.json({ success: false, message: "That video was not found." }); // Return error message
        } else {
          // Get data of user who is logged in
          User.findOne({ _id: req.body.userId }, (err, user) => {
            // Check if error was found
            if (err) {
              res.json({ success: false, message: "Something went wrong." }); // Return error message
            } else {
              // Check if user was found in the database
              if (!user) {
                res.json({
                  success: false,
                  message: "Could not authenticate user."
                }); // Return error message
              } else {
                // Check if user who disliekd video is the same person who originated the video
                /* if (user.fullName === video.createdBy) {
                  res.json({
                    success: false,
                    messagse: "Cannot dislike your own video."
                  }); // Return error message
                } */ // else {
                // Check if user who disliked video has already disliked it before
                if (place.dislikedBy.includes(user.fullName)) {
                  res.json({
                    success: false,
                    message: "You already disliked this video."
                  }); // Return error message
                } else {
                  // Check if user has previous disliked this place
                  if (place.likedBy.includes(user.fullName)) {
                    place.likes--; // Decrease likes by one
                    const arrayIndex = place.likedBy.indexOf(user.fullName); // Check where fullName is inside of the array
                    place.likedBy.splice(arrayIndex, 1); // Remove fullName from index
                    place.dislikes++; // Increase dislikeds by one
                    place.dislikedBy.push(user.fullName); // Add fullName to list of dislikers
                    // Save place data
                    place.save(err => {
                      // Check if error was found
                      if (err) {
                        res.json({
                          success: false,
                          message: "Something went wrong."
                        }); // Return error message
                      } else {
                        res.json({
                          success: true,
                          message: "place disliked!"
                        }); // Return success message
                      }
                    });
                  } else {
                    place.dislikes++; // Increase likes by one
                    place.dislikedBy.push(user.fullName); // Add fullName to list of likers
                    // Save place data
                    place.save(err => {
                      // Check if error was found
                      if (err) {
                        res.json({
                          success: false,
                          message: "Something went wrong."
                        }); // Return error message
                      } else {
                        res.json({
                          success: true,
                          message: "video disliked!"
                        }); // Return success message
                      }
                    });
                  }
                }
                // }
              }
            }
          });
        }
      }
    });
  }
};

/* ===============================================================
     COMMENT ON Place POST
  =============================================================== */
module.exports.commentPlace = (req, res) => {
  // Check if comment was provided in request body
  console.log("***************************");
  if (!req.body.comment) {
    res.json({ success: false, message: "No comment provided" }); // Return error message
  } else {
    // Check if id was provided in request body
    if (!req.body.id) {
      res.json({ success: false, message: "No id was provided" }); // Return error message
    } else {
      // Use id to search for blog post in database
      Place.findOne({ _id: req.body.id }, (err, place) => {
        // Check if error was found
        if (err) {
          res.json({ success: false, message: "Invalid place id" }); // Return error message
        } else {
          // Check if id matched the id of any video post in the database
          if (!place) {
            res.json({ success: false, message: "place not found." }); // Return error message
          } else {
            // Grab data of user that is logged in
            User.findOne({ _id: req.body.userId }, (err, user) => {
              // Check if error was found
              if (err) {
                res.json({ success: false, message: "Something went wrong" }); // Return error message
              } else {
                // Check if user was found in the database
                if (!user) {
                  res.json({ success: false, message: "User not found." }); // Return error message
                } else {
                  // Add the new comment to the place post's array
                  place.comments.push({
                    comment: req.body.comment, // Comment field
                    commentator: user.email // Person who commented
                  });
                  // Save place post
                  place.save(err => {
                    // Check if error was found
                    if (err) {
                      res.json({
                        success: false,
                        message: "Something went wrong."
                      }); // Return error message
                    } else {
                      res.json({ success: true, message: "Comment saved" }); // Return success message
                    }
                  });
                }
              }
            });
          }
        }
      });
    }
  }
};

/* ===============================================================
     LIKE place
  =============================================================== */
module.exports.favouritPlace = (req, res) => {
  // Check if id was passed provided in request body
  /* if (!req.body.id) {
      res.json({ success: false, message: "No id was provided." }); // Return error message
    } else {*/
  // Search the database with id
  Place.findOne({ _id: req.body.id }, (err, place) => {
    // Check if error was encountered
    if (err) {
      res.json({ success: false, message: "Invalid place id" }); // Return error message
    } else {
      // Check if id matched the id of a place post in the database
      if (!place) {
        res.json({ success: false, message: "That place was not found." }); // Return error message
      } else {
        // Get data from user that is signed in
        User.findOne({ _id: req.body.userId }, (err, user) => {
          // Check if error was found
          if (err) {
            res.json({ success: false, message: "Something went wrong." }); // Return error message
          } else {
            // Check if id of user in session was found in the database
            if (!user) {
              res.json({
                success: false,
                message: "Could not authenticate user."
              }); // Return error message
            } else {
              // Check if user who liked post is the same user that originally created the video post
              /* if (user.fullName === video.createdBy) {
                    res.json({
                      success: false,
                      messagse: "Cannot like your own video."
                    }); // Return error message
                  }*/ //else {
              // Check if the user who liked the post has already liked the place post before
              if (place.likedBy.includes(user.fullName)) {
                res.json({
                  success: false,
                  message: "You already liked this place."
                }); // Return error message
              } else {
                // Check if user who liked post has previously disliked a post
                if (place.dislikedBy.includes(user.fullName)) {
                  place.dislikes--; // Reduce the total number of dislikes
                  const arrayIndex = place.dislikedBy.indexOf(user.fullName); // Get the index of the username in the array for removal
                  place.dislikedBy.splice(arrayIndex, 1); // Remove user from array
                  place.likes++; // Increment likes
                  place.likedBy.push(user.fullName); // Add fullName to the array of likedBy array
                  // Save place post data
                  place.save(err => {
                    // Check if error was found
                    if (err) {
                      res.json({
                        success: false,
                        message: "Something went wrong."
                      }); // Return error message
                    } else {
                      res.json({ success: true, message: "place liked!" }); // Return success message
                    }
                  });
                } else {
                  place.likes++; // Incriment likes
                  place.likedBy.push(user.fullName); // Add liker's fullName into array of likedBy
                  // Save place post
                  place.save(err => {
                    if (err) {
                      res.json({
                        success: false,
                        message: "Something went wrong."
                      }); // Return error message
                    } else {
                      res.json({ success: true, message: "place liked!" }); // Return success message
                    }
                  });
                }
              }
              //  }
            }
          }
        });
      }
    }
  });
  //  }
};
//
//
//
//
//
//
//
//
//
//
//

/////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

/* ===============================================================
     favourit Place
  =============================================================== */
module.exports.favouritPlace = (req, res) => {
  // Search the database with id
  Place.findOne({ _id: req.body.id }, (err, place) => {
    // Check if error was encountered
    if (err) {
      res.json({ success: false, message: "Invalid place id" }); // Return error message
    } else {
      // Check if id matched the id of a place post in the database
      if (!place) {
        res.json({ success: false, message: "That place was not found." }); // Return error message
      } else {
        // Get data from user that is signed in
        User.findOne({ _id: req.body.userId }, (err, user) => {
          // Check if error was found
          if (err) {
            res.json({ success: false, message: "Something went wrong." }); // Return error message
          } else {
            // Check if id of user in session was found in the database
            if (!user) {
              res.json({
                success: false,
                message: "Could not authenticate user."
              }); // Return error message
            } else {
              if (user.favourit.includes(place._id)) {
                res.json({
                  success: false,
                  message: "You already favourit this place."
                }); // Return error message
              } else {
                user.favourit.push(place._id);
              }
              //  }
            }
          }
        });
      }
    }
  });
};

/////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

/* ===============================================================
    get favourit Place
  =============================================================== */

module.exports.getFavouritPlace = (req, res, next) => {
  User.findById(req.body.userId)
    .select("favourit")
    .exec(function(err, doc) {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "Error in get access :" + JSON.stringify(err, undefined, 2)
        );
        next(err);
      }
    });
};
