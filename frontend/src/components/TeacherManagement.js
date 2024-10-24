// src/components/TeacherManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack,
  Box,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TeacherManagement = () => {
  // State for teacher data
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({ name: '', subject: '', classTeacherOf: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingTeacherId, setEditingTeacherId] = useState(null);

  // Fetch teachers from the backend
  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/teachers'); // Adjust the URL as needed
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTeacher({ ...newTeacher, [name]: value });
  };

  // Handle adding a new teacher
  const addTeacher = async () => {
    if (newTeacher.name && newTeacher.subject) {
      try {
        const response = await axios.post('http://localhost:5000/api/teachers', newTeacher); // Adjust the URL as needed
        setTeachers([...teachers, response.data]);
        setNewTeacher({ name: '', subject: '', classTeacherOf: '' });
      } catch (error) {
        console.error('Error adding teacher:', error);
      }
    }
  };

  // Handle editing a teacher
  const editTeacher = (teacher) => {
    setNewTeacher({ name: teacher.name, subject: teacher.subject, classTeacherOf: teacher.classTeacherOf });
    setIsEditing(true);
    setEditingTeacherId(teacher._id);
  };

  // Handle updating a teacher
  const updateTeacher = async () => {
    if (newTeacher.name && newTeacher.subject && editingTeacherId) {
      try {
        const response = await axios.put(`http://localhost:5000/api/teachers/${editingTeacherId}`, newTeacher);
        const updatedTeachers = teachers.map((teacher) =>
          teacher._id === editingTeacherId ? response.data : teacher
        );
        setTeachers(updatedTeachers);
        setNewTeacher({ name: '', subject: '', classTeacherOf: '' });
        setIsEditing(false);
        setEditingTeacherId(null);
      } catch (error) {
        console.error('Error updating teacher:', error);
      }
    }
  };

  // Handle deleting a teacher
  const deleteTeacher = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/teachers/${id}`);
      setTeachers(teachers.filter((teacher) => teacher._id !== id));
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  useEffect(() => {
    fetchTeachers(); // Fetch the teachers when the component mounts
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Teacher Management
      </Typography>

      <Paper sx={{ marginTop: 2, padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          {isEditing ? 'Edit Teacher' : 'Add New Teacher'}
        </Typography>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
          <TextField
            label="Teacher Name"
            name="name"
            value={newTeacher.name}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Subject"
            name="subject"
            value={newTeacher.subject}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Class Teacher Of (optional)"
            name="classTeacherOf"
            value={newTeacher.classTeacherOf}
            onChange={handleInputChange}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={isEditing ? updateTeacher : addTeacher}>
            {isEditing ? 'Update Teacher' : 'Add Teacher'}
          </Button>
        </Stack>

        <Typography variant="h6" gutterBottom>
          Teacher List
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Class Teacher Of</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher._id}>
                <TableCell>{teacher._id}</TableCell>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.subject}</TableCell>
                <TableCell>{teacher.classTeacherOf || 'N/A'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => editTeacher(teacher)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteTeacher(teacher._id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default TeacherManagement;
