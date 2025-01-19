import express from "express";
import { logInUser, signUpUser, logoutUser } from '../controllers/user.controller.js';

import {
    addAttendance,
    getAttendanceRecords,
    updateAttendance, deleteAttendance,
    requestPasswordReset,resetPassword
} from "../controllers/attendance.controllers.js"; // Adjust the path




const router = express.Router();

router.post('/signup', signUpUser);

router.post('/login', logInUser);

router.post('/logout', logoutUser);
 
router.post("/reset-password-request", requestPasswordReset);
router.post("/changepassword", resetPassword);

// Student attendence
router.post("/attendance", addAttendance);
router.get("/attendance", getAttendanceRecords );
router.put("/attendance/:id", updateAttendance);

// Route to delete a course
router.delete("/attendance/:id", deleteAttendance);



export default router;