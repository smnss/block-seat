const Event = require("../../models/event");
const User = require("../../models/user");
const { transformEvent } = require("./merge");
const { dateToString } = require("../../helpers/date");

module.exports = {
  events: async () => {
    try {
      const events = await Event.find().populate("creator");
      return events.map(event => {
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: dateToString(args.eventInput.date),
      creator: req.userId
    });
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = transformEvent(result);
      const user = await User.findById(req.userId);
      if (!user) {
        throw new Error("User doesn't exist");
      }
      user.createdEvents.push(event);
      await user.save();
      return createdEvent;
    } catch (err) {
      throw err;
    }
  }
};
