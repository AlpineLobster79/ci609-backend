const db = require("../database/connectDB");

exports.getAll = async () => {
    const [rows] = await db.query(
        "SELECT * FROM sightings ORDER BY time_created DESC"
    );
    return rows;
};

exports.create = async (data, file) => {
    const img_path = file ? file.filename : data.img_path || null;

    const life_status = data.lifeStatus;
    const mortality_type = life_status === "dead" ? data.mortalityType : null;
    const other_notes = data.otherNotes || null;
    const latitude = parseFloat(data.latitude);
    const longitude = parseFloat(data.longitude);

    const [result] = await db.query(
        `INSERT INTO sightings
        (img_path, life_status, mortality_type, other_notes, latitude, longitude)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            img_path,
            life_status,
            mortality_type,
            other_notes,
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
