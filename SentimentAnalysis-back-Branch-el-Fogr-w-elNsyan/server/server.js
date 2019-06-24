require("./config/config.js");

const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");

var { mongoose } = require("./db/mongoose");
var { Place } = require("./models/places");
var { User } = require("./models/user");
var { authenticate } = require("./middleware/authenticate");

const ctrlPlace = require("./PlaceController");

var app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/addPlace", authenticate, (req, res) => {
  var placeObj = new Place({
    placeName: req.body.placeName,
    image: req.body.image,
    describtion: req.body.describtion,
    addedAt: new Date().toLocaleString(),
    _creator: req.user._id,
    lastUpdate: new Date().toLocaleString(),
    location: req.body.location
  });
  placeObj.rate = 0;

  placeObj.save().then(
    doc => {
      res.send(doc);
    },
    err => {
      res.status(400).send(err);
    }
  );
});

app.get("/places", authenticate, (req, res) => {
  Place.find({
    _creator: req.user._id
  }).then(
    todos => {
      res.send({ todos });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/place/:id", authenticate, (req, res) => {
  id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Place.findOne({
    _id: id,
    _creator: req.user._id
  })
    .then(doc => {
      if (!doc) {
        return res.status(404).send();
      }
      res.status(200).send({ doc });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.delete("/place/:id", authenticate, async (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  try {
    const doc = await Place.findOneAndRemove({
      _id: id,
      _creator: req.user._id
    });

    if (!doc) {
      return res.status(404).send();
    }

    res.status(200).send({ doc });
  } catch (e) {
    res.status(400).send();
  }
});

app.patch("/place/:id", authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, [
    "placeName",
    "describtion",
    "rate",
    "lastUpdate",
    "location"
  ]);
  body.lastUpdate = new Date().toLocaleString();
  console.log(body);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  body.rate > 5 || body.rate < 0
    ? res.status(400).send("Sorry, Rate should be between One and Five stars")
    : Place.findOneAndUpdate(
        {
          _id: id,
          _creator: req.user._id
        },
        { $set: body },
        { new: true }
      )
        .then(doc => {
          if (!doc) {
            return res.status(404).send();
          }

          res.send({ doc });
        })
        .catch(e => res.status(500).send());
});

app.post("/register", async (req, res) => {
  try {
    const body = _.pick(req.body, ["email", "password"]);
    const user = new User(body);
    await user.save();
    const token = await user.generateAuthToken();
    res.header("x-auth", token).send(user);
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).send("Duplicated email !!");
    }
    res.status(400).send(e);
  }
});

app.post("/users/login", async (req, res) => {
  try {
    var body = _.pick(req.body, ["email", "password"]);
    const result = await User.findByCredentials(body.email, body.password);
    const token = await result.user.generateAuthToken();
    res.header("x-auth", token).send(result.user.toresponseObject());
  } catch (e) {
    res.status(404).send(e);
  }
});

app.get("/users/me", authenticate, (req, res) => {
  res.send(req.user);
});

app.delete("/users/me/token", authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

app.post("/addComment", authenticate, (req, res) => {
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
            console.log(req.user._id);

            User.findOne({ _id: req.user._id }, (err, user) => {
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
                    commentator: req.user._id // Person who commented
                  });
                  // Save place post
                  place.save(err => {
                    // Check if error was found
                    if (err) {
                      res.json({
                        success: false,
                        message: err.message
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
});

router.put("/likevideo", ctrlPlace.likePlace);
router.put("/dislikevideo", ctrlPlace.DislikePlace);
router.post("/addcomment", ctrlPlace.commentPlace);

app.listen(port, () => {
  console.log(`Started up at port : ${port}`);
});

module.exports = {
  app
};
