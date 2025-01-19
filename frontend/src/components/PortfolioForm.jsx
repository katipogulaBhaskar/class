import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Styled Components (same as before)
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
  width: 80%;
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
  width: 80%;
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

const PortfoliosList = styled.div`
  margin-top: 20px;
  text-align: left;
`;

const PortfolioItem = styled.div`
  background: #333;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
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
  background: #4caf50;
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  margin-top: 20px;
`;

const ResponsiveContainer = styled.div`
  @media (max-width: 768px) {
    padding: 20px;
    width: 100%;
  }
`;

const AttendanceForm = () => {
  const [attendance, setAttendance] = useState({ studentId: "", date: "", status: "" });
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ newPassword: "", confirmPassword: "" });
  const [showPasswordForm, setShowPasswordForm] = useState(false); // Toggle state for change password form
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAttendance({ ...attendance, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/attendance", attendance);
      alert(response.data.message || "Attendance recorded successfully!");
      setAttendance({ studentId: "", date: "", status: "" });
      fetchAllAttendances();
    } catch (err) {
      console.error(err);
      alert("Error recording attendance.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveUpdate = async () => {
    if (!attendance.studentId || !attendance.date || !attendance.status) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/attendance/${attendance.id}`, attendance);
      alert("Attendance updated successfully!");
      setAttendance({ studentId: "", date: "", status: "" });
      fetchAllAttendances();
    } catch (err) {
      alert("Error updating attendance.");
    }
  };

  const fetchAllAttendances = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/attendance");
      setAttendances(response.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching attendance records.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (attendanceToUpdate) => {
    setAttendance({
      studentId: attendanceToUpdate.studentId,
      date: attendanceToUpdate.date,
      status: attendanceToUpdate.status,
      id: attendanceToUpdate._id,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/attendance/${id}`);
      alert("Attendance deleted successfully!");
      fetchAllAttendances();
    } catch (err) {
      alert("Error deleting attendance.");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.put("http://localhost:5000/api/changepassword", passwordForm);
      alert(response.data.msg || "Password changed successfully!");
      setPasswordForm({ newPassword: "", confirmPassword: "" });
    } catch (err) {
      alert(err.response.data.msg || "Error changing password.");
    }
  };

  useEffect(() => {
    fetchAllAttendances();
  }, []);

  return (
    <Body>
      <ResponsiveContainer>
        <Container>
          <Title>Record Attendance</Title>
          <form onSubmit={handleSubmit}>
            <Input
              name="studentId"
              type="text"
              placeholder="Enter Student ID"
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
            <Input
              name="status"
              type="text"
              placeholder="Enter Status (present/absent)"
              value={attendance.status}
              onChange={handleChange}
              required
            />
            <ButtonContainer>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Record Attendance"}
              </Button>
              {attendance.id && (
                <Button onClick={handleSaveUpdate}>
                  Save Updated Attendance
                </Button>
              )}
            </ButtonContainer>
          </form>

          <PortfoliosList>
  <h3>Attendance Records</h3>
  {attendances.length > 0 ? (
    attendances.map((attendance) => (
      <PortfolioItem key={attendance._id}>
        <strong>Student Username:</strong> {attendance.studentId?.username || 'N/A'} <br />
        <strong>Student Email:</strong> {attendance.studentId?.email || 'N/A'} <br />
        <strong>Date:</strong> {attendance.date} <br />
        <strong>Status:</strong> {attendance.status} <br />
        <ButtonContainer>
          <Button onClick={() => handleUpdate(attendance)}>
            Update Attendance
          </Button>
          <Button onClick={() => handleDelete(attendance._id)}>
            Delete Attendance
          </Button>
        </ButtonContainer>
      </PortfolioItem>
    ))
  ) : (
    <p>No attendance records available.</p>
  )}
</PortfoliosList>

          <LogoutButton onClick={() => navigate("/")}>Logout</LogoutButton>
        </Container>
      </ResponsiveContainer>
    </Body>
  );
};

export default AttendanceForm;
