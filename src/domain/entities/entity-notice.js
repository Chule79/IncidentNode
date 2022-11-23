import mongoose from 'mongoose';

module.exports = (db) => {
  const noticeSchema = new db.Schema(
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      departments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'department',
          required: true,
        },
      ],
    },
    {
      timestamps: true,
    }
  );
  return db.model('notice', noticeSchema);
};
