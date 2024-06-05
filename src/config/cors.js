var whitelist = ["https://bar-khnqklwy9-vuduyviet1110s-projects.vercel.app"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

module.exports = { corsOptions };
