import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
// This snippet first checks if the User model already exists in mongoose.models. If it does, it uses the existing model. If it doesn't, it creates a new model.













// import   mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   fullname: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// }, { timestamps: true });

// const User = mongoose.model('User', userSchema);
// export default User;