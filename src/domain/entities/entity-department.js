const mongoose = require('mongoose');

module.exports = (db) => {
  const departmentSchema = new db.Schema(
    {
      name: { type: String, required: true, unique: true },
      users: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
          required: true,
        },
      ],
      incidents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'incident' }],
      notices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'notice' }],
    },
    {
      timestamps: true,
    }
  );
  return db.model('department', departmentSchema);
};
