import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { User, Attendance } from "../models/user.model.js";

// Controller for Attendance

// Add a new attendance record
export const addAttendance = async (req, res) => {
    try {
        const { studentId, date, status } = req.body;
        const attendance = new Attendance({ studentId, date, status });
        await attendance.save();
        res.status(201).json({ message: "Attendance added successfully", attendance });
    } catch (error) {
        res.status(500).json({ message: "Error adding attendance", error });
    }
};

// Get all attendance records
export const getAttendanceRecords = async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find().populate("studentId", "username email");
        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ message: "Error fetching attendance records", error });
    }
};

// Update an attendance record
export const updateAttendance = async (req, res) => {
    const { id } = req.params;
    const { status, date } = req.body;

    try {
        // Check if the attendance record exists
        const attendance = await Attendance.findById(id);
        if (!attendance) {
            return res.status(404).json({ message: "Attendance record not found" });
        }

        // Update attendance details
        attendance.status = status || attendance.status;
        attendance.date = date || attendance.date;
        await attendance.save();
        res.status(200).json({ message: "Attendance updated successfully", attendance });
    } catch (error) {
        res.status(500).json({ message: "Error updating attendance", error });
    }
};

// Delete an attendance record
export const deleteAttendance = async (req, res) => {
    const { id } = req.params;

    try {
        // Check if the attendance record exists
        const attendance = await Attendance.findById(id);
        if (!attendance) {
            return res.status(404).json({ message: "Attendance record not found" });
        }

        // Delete the attendance record using findByIdAndDelete
        await Attendance.findByIdAndDelete(id);

        res.status(200).json({ message: "Attendance deleted successfully" });
    } catch (error) {
        console.error("Error deleting attendance record:", error); // Log the error for debugging
        res.status(500).json({ message: "Error deleting attendance", error });
    }
};


// Request Password Reset (Generate Token)
export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetToken = resetToken;
        await user.save();

        // Simulate sending email by logging the token
        console.log(`Password reset token for ${email}: ${resetToken}`);

        res.status(200).json({ message: "Password reset token generated. Check your email." });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Reset Password
export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const user = await User.findOne({ resetToken: token });
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = null; // Clear the reset token
        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
