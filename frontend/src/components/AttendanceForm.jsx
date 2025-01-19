import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Styled Components
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Body = styled.div`
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(135deg, #FF7A18, #AF2D2D);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding: 20px;
`;

const Container = styled.div`
  background: rgba(0, 0, 0, 0.6);
  border-radius: 12px;
  padding: 30px;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(15px);
  animation: ${fadeIn} 1s ease-in-out;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Input = styled.input`
  width: 50%;
  padding: 10px;
  margin: 12px 0;
  border-radius: 10px;
  border: none;
  background-color: #fff;
  color: #333;
  font-size: 1rem;
  outline: none;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:focus {
    box-shadow: 0 0 8px rgba(0, 180, 255, 0.8);
    border: 2px solid #00b0ff;
  }
`;

const Button = styled.button`
  width: 50%;
  padding: 15px;
  background: linear-gradient(90deg, #00c6ff, #0072ff);
  border: none;
  border-radius: 50px;
  font-size: 1.2rem;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    background: #aaa;
    cursor: not-allowed;
  }
`;

const LogoutButton = styled.button`
  background: #ff5722;
  padding: 12px 30px;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.2rem;
  cursor: pointer;
  margin-top: 30px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
`;

const ChangePasswordButton = styled.button`
  background: #ff9800;
  padding: 12px 30px;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.2rem;
  cursor: pointer;
  margin-top: 15px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
`;

const AttendanceForm = () => {
  const [attendance, setAttendance] = useState({ studentId: "", date: "", status: "" });
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAttendance({ ...attendance, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/attendance", attendance);
      alert(response.data.message || "Attendance added successfully!");
      setAttendance({ studentId: "", date: "", status: "" });
      fetchAttendanceRecords();
    } catch (err) {
      console.error(err);
      alert("Error adding attendance.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendanceRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/attendance");
      setAttendanceRecords(response.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching attendance records.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("You have logged out successfully.");
    navigate("/");
  };

  const handleChangePassword = () => {
    alert("Password change functionality not implemented yet.");
  };

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  return (
    <Body>
      <Container>
        <Title>Add Attendance</Title>
        <form onSubmit={handleSubmit}>
          <Input
            name="studentId"
            placeholder="Student ID"
            value={attendance.studentId}
            onChange={handleChange}
            required
          />
          <Input
            name="date"
            type="date"
            value={attendance.date}
            onChange={handleChange}
            required
          />
          <select
            name="status"
            value={attendance.status}
            onChange={handleChange}
            required
            style={{ padding: "10px", width: "50%", marginBottom: "20px", borderRadius: "10px" }}
          >
            <option value="">Select Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Add Attendance"}
          </Button>
        </form>

        <h3>Attendance Records</h3>
        <div>
          {attendanceRecords.length > 0 ? (
            attendanceRecords.map((record) => (
              <div key={record._id} style={{ background: "#333", padding: "10px", marginBottom: "10px", borderRadius: "8px" }}>
                <strong>Student ID:</strong> {record.studentId} <br />
                <strong>Date:</strong> {record.date} <br />
                <strong>Status:</strong> {record.status} <br />
              </div>
            ))
          ) : (
            <p>No attendance records available.</p>
          )}
        </div>

        <ChangePasswordButton onClick={handleChangePassword}>
          Change Password
        </ChangePasswordButton>

        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Container>
    </Body>
  );
};

export default AttendanceForm;
