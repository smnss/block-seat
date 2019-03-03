const bcrypt = require("bcryptjs");

const Event = require("../../models/event");
const User = require("../../models/user");

const events = eventIds => {
    return Event.find({ _id: { $in: eventIds } })
      .then(events => {
        return events.map(event => {
          return {
          ...event._doc,
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event.creator)
          }
        })
      })
      .catch(err => {
        throw err;
      });
  };
  
  const user = userId => {
    return User.findById(userId)
      .then(user => {
        return {
          ...user._doc,
          createdEvents: events.bind(this, user._doc.createdEvents)
        };
      })
      .catch(err => {
        throw err;
      });
  };

module.exports = {
    events: () => {
      return Event.find()
        .populate("creator")
        .then(events => {
          return events.map(event => {
            return {
              ...event._doc,
              date: new Date(event._doc.date).toISOString(),
              creator: user.bind(this, event.creator)
            };
          });
        })
        .catch(err => {
          console.log(err);
          throw err;
        });
    },
    createEvent(args) {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: "5c5847b117711124bc09f1e3"
      });
      let createdEvent;
      return event
        .save()
        .then(result => {
          createdEvent = { ...result._doc, creator: user.bind(this, result._doc.creator) };
          //  { ...result._doc, _id: result._doc._id.toString() };  // this is not needed, proper id is comming automatically
          return User.findById("5c5847b117711124bc09f1e3");
        })
        .then(user => {
          if (!user) {
            throw new Error("User doesn't exist");
          }
          user.createdEvents.push(event);
          user.save();
        })
        .then(result => {
          return createdEvent;
        })
        .catch(err => {
          console.log(err);
          throw err;
        });
    },
    createUser(args) {
      return User.findOne({ username: args.userInput.username })
        .then(user => {
          if (user) {
            throw new Error("Username already Exist");
          }
          return bcrypt.hash(args.userInput.password, 12);
        })
        .then(hasedpassword => {
          const user = new User({
            username: args.userInput.username,
            password: hasedpassword
          });
          return user
            .save()
            .then(user => {
              return { ...user._doc, password: null, _id: user.id };
            })
            .catch(err => {
              console.log(err);
              throw err;
            });
        })
        .catch(err => {
          throw err;
        });
    }
  };
