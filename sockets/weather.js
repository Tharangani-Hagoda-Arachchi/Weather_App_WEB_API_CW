// socketHandler.js

const socketIo = require("socket.io");
const Weather = require("../models/Weather");

function socketHandler(server) {
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000", // Client WEB IP
      methods: ["GET", "POST"],
      credentials: true,

    },
  });

 

  console.log("Socket Loaded.");

  io.on("connection", async (socket) => {
    console.log("Client connected");

    try {
      // Fetch initial weather data
      const initialData = await Weather.find();
      socket.emit("INIT_WEATHER", initialData);
    } catch (error) {
      console.error("Error sending initial data:", error);
    }

    // Watch for weather data changes
    const changeStream = Weather.watch();

    changeStream.on("change", async (change) => {
      try {
        let newData;
        if (change.operationType === "insert") {
          newData = await Weather.find();
        } else if (change.operationType === "update") {
          // In case of an update, we fetch the updated document
          newData = await Weather.findById(change.documentKey._id);
        }
        io.emit("UPDATE_WEATHER", newData);
      } catch (error) {
        console.error("Error fetching and sending update data:", error);
      }
    });

    // Handle errors
    changeStream.on("error", (error) => {
      console.error("Change stream error:", error);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
}

module.exports = socketHandler;
