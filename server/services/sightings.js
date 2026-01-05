const db = require("../database/connectDB");

exports.getAll = async () => {
    const [rows] = await db.query(
        "SELECT * FROM sightings ORDER BY time_created DESC"
    );
    return rows;
};

exports.create = async (data, file) => {
    const imgPath = file ? file.filename : null;

    const lifeStatus = data.life_status;
    if (!lifeStatus) throw new Error("Life status is required");

    const mortalityType = lifeStatus === "dead" ? data.mortality_type : null;
    
    const otherNotes = data.other_notes || null;

    const latitude = parseFloat(data.latitude);
    const longitude = parseFloat(data.longitude);
    if (isNaN(latitude) || isNaN(longitude)) throw new Error("Invalid latitude or longitude");

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