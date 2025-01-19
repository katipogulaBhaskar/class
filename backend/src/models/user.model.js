import mongoose from 'mongoose';

// Student Schema
const studentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  resetToken: { type: String }, // For password reset
});

const User = mongoose.model('Student', studentSchema);

// Attendance Schema
const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Reference to the Student model
    required: true
  },
  date: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['present', 'absent'], // Can only be 'present' or 'absent'
    required: true
  }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export { User, Attendance };
