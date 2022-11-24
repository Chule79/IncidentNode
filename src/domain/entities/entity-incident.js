const mongoose = require('mongoose');

module.exports = (db) => {
  const incidentSchema = new db.Schema(
    {
      title: { type: String, require: true },
      description: { type: String, require: true },
      photos: [{ type: String } ],
      state: { type: String, require: true },
      responsibles: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'user', require: true },
      ],
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true,
      },
      department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'department',
        require: true,
      },
    },
    {
      timestamps: true,
    }
  );
  return db.model('incident', incidentSchema);
};
