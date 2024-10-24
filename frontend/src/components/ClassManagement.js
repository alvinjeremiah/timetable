// src/components/ClassManagement.js
import React, { useState } from 'react';
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
  TableSortLabel,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const ClassManagement = () => {
  // State for class data
  const [classes, setClasses] = useState([
    { id: 1, name: 'Class 4A', numberOfStudents: 30 },
    { id: 2, name: 'Class 4B', numberOfStudents: 25 },
  ]);
  const [newClass, setNewClass] = useState({ name: '', numberOfStudents: '' });
  const [editMode, setEditMode] = useState(false);
  const [editClassId, setEditClassId] = useState(null);
  const [filter, setFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewClass({ ...newClass, [name]: value });
  };

  // Handle adding or updating a class
  const saveClass = () => {
    if (!newClass.name || !newClass.numberOfStudents) return;

    if (editMode) {
      // Update existing class
      setClasses(classes.map(cls => cls.id === editClassId ? { ...cls, ...newClass } : cls));
      setEditMode(false);
      setEditClassId(null);
    } else {
      // Add new class
      setClasses([
        ...classes,
        { id: classes.length + 1, name: newClass.name, numberOfStudents: parseInt(newClass.numberOfStudents, 10) },
      ]);
    }
    setNewClass({ name: '', numberOfStudents: '' });
  };

  // Handle deleting a class
  const deleteClass = (id) => {
    setClasses(classes.filter(cls => cls.id !== id));
  };

  // Handle editing a class
  const editClass = (cls) => {
    setNewClass({ name: cls.name, numberOfStudents: cls.numberOfStudents });
    setEditMode(true);
    setEditClassId(cls.id);
  };

  // Handle filtering by class name
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Handle sorting
  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  // Get filtered and sorted class list
  const getFilteredAndSortedClasses = () => {
    let filteredClasses = classes.filter(cls => cls.name.toLowerCase().includes(filter.toLowerCase()));
    if (sortConfig.key) {
      filteredClasses = filteredClasses.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredClasses;
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Class Management
      </Typography>

      <Paper sx={{ marginTop: 2, padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          {editMode ? 'Edit Class' : 'Add New Class'}
        </Typography>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
          <TextField
            label="Class Name"
            name="name"
            value={newClass.name}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Number of Students"
            name="numberOfStudents"
            type="number"
            value={newClass.numberOfStudents}
            onChange={handleInputChange}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={saveClass}>
            {editMode ? 'Update Class' : 'Add Class'}
          </Button>
        </Stack>

        <TextField
          label="Filter by Class Name"
          value={filter}
          onChange={handleFilterChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <Typography variant="h6" gutterBottom>
          Class List
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'name'}
                  direction={sortConfig.direction}
                  onClick={() => handleSort('name')}
                >
                  Class Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'numberOfStudents'}
                  direction={sortConfig.direction}
                  onClick={() => handleSort('numberOfStudents')}
                >
                  Number of Students
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getFilteredAndSortedClasses().map((cls) => (
              <TableRow key={cls.id}>
                <TableCell>{cls.id}</TableCell>
                <TableCell>{cls.name}</TableCell>
                <TableCell>{cls.numberOfStudents}</TableCell>
                <TableCell>
                  <IconButton onClick={() => editClass(cls)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => deleteClass(cls.id)} color="secondary">
                    <Delete />
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

export default ClassManagement;
