import mongoose from "mongoose";

const dbConnect = () => {
  if (mongoose.connection.readyState > 1) return;

  mongoose
    .connect(process.env.DB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .catch(function (reason) {
      console.log("Unable to connect to the mongodb instance. Error: ", reason);
    });
};

export default dbConnect;
