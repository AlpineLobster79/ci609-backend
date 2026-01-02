const db = require("../database/connectDB");

exports.getAll = async () => {
    const [rows] = await db.query(
        "SELECT * FROM sightings ORDER BY time_created DESC"
    );
    return rows;
};

exports.create = async (data, file) => {
    const imgPath = file ? file.filename : null;

    const lifeStatus = data.lifeStatus;
    const mortalityType = lifeStatus === "dead" ? data.mortalityType : null;
    const otherNotes = data.otherNotes || null;
    const latitude = parseFloat(data.latitude);
    const longitude = parseFloat(data.longitude);

    const [result] = await db.query(
        `INSERT INTO sightings
        (img_path, life_status, mortality_type, other_notes, latitude, longitude)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            imgPath,
            lifeStatus,
            mortalityType,
            otherNotes,
            latitude,
            longitude
        ]
    );

    //fetch & return new row
    const [rows] = await db.query(
        "SELECT * FROM sightings WHERE id = ?",
        [result.insertId]
    );

    return rows[0];
};