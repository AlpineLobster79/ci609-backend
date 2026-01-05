require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

//mysql connection
require("./database/connectDB");
//sightings api
const sightingsRouter = require("./routes/sightings");

const app = express();

app.use(cors());
//app.use(cors({ origin: "https://pe139.brighton.domains" }));    //restricted to my frontend domain
app.use(express.json());    //parse JSON requests

//server uploaded imgs
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//routes
app.use("/api/sightings", sightingsRouter);

//default route
app.get("/", (req, res) => {
    res.send("Sightings API is running");
});

//serve React frontend in production
if (process.env.NODE_ENV === "production") {
    const buildPath = path.join(__dirname, "../zapp/build");
    app.use(express.static(buildPath));
    //app.use(express.static(path.join(__dirname, "../zapp/build")));
    app.get("/*", (req, res) => {
        //res.sendFile(path.resolve(__dirname, "../zapp/build", "index.html"))
        res.sendFile(path.join(buildPath, "index.html"));
    });
}

//error handling middleware
app.use((err, req, res, next) => {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ error: "Server error", details: err.message });
});

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

