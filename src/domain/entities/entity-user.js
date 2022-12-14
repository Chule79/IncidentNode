const mongoose = require('mongoose');

module.exports = (db) => {
  const userSchema = new db.Schema(
    {
      username: { type: String, required: true },
      nickname: { type: String, required: true, unique: true },
      gmail: { type: String, required: true, unique: true },
      password: { type: String, required: true },

      role: { type: String, enum: ['user', 'admin'], required: true },

      image: { type: String },
      department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'department',
        required: true,
      },
      incidents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'incident' }],
    },
    {
      timestamps: true,
    }
  );
  return db.model('user', userSchema);
};
