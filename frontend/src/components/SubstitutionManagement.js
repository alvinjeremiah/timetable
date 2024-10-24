// src/components/SubstitutionManagement.js
import React, { useState } from 'react';
import {
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack,
  Box,
} from '@mui/material';

const SubstitutionManagement = () => {
  // State for absent teacher, period, and substitute teacher
  const [absentTeacher, setAbsentTeacher] = useState('');
  const [period, setPeriod] = useState('');
  const [substituteTeacher, setSubstituteTeacher] = useState('');
  const [substitutionList, setSubstitutionList] = useState([]);

  // Mock data for teachers and periods
  const teachers = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown'];
  const periods = ['Period 1', 'Period 2', 'Period 3', 'Period 4', 'Period 5', 'Period 6'];

  // Mock timetable showing which teachers are assigned to which periods
  const timetable = {
    'Period 1': ['John Doe', 'Alice Johnson'],
    'Period 2': ['Jane Smith'],
    'Period 3': ['Bob Brown', 'John Doe'],
    'Period 4': [],
    'Period 5': ['Alice Johnson'],
    'Period 6': ['Jane Smith', 'Bob Brown'],
  };

  // Handle changes to the absent teacher
  const handleAbsentTeacherChange = (event) => {
    setAbsentTeacher(event.target.value);
  };

  // Handle changes to the period
  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  // Handle changes to the substitute teacher
  const handleSubstituteTeacherChange = (event) => {
    setSubstituteTeacher(event.target.value);
  };

  // Handle adding a substitution entry
  const addSubstitution = () => {
    if (absentTeacher && period && substituteTeacher) {
      setSubstitutionList([
        ...substitutionList,
        { id: substitutionList.length + 1, absentTeacher, period, substituteTeacher },
      ]);
      setAbsentTeacher('');
      setPeriod('');
      setSubstituteTeacher('');
    }
  };

  // Get available teachers based on the selected period and timetable
  const getAvailableTeachers = () => {
    if (!period) {
      return teachers.filter((teacher) => teacher !== absentTeacher);
    }
    const assignedTeachers = timetable[period] || [];
    return teachers.filter(
      (teacher) => teacher !== absentTeacher && !assignedTeachers.includes(teacher)
    );
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Substitution Management
      </Typography>

      <Paper sx={{ marginTop: 2, padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Add Substitution
        </Typography>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Absent Teacher</InputLabel>
            <Select value={absentTeacher} onChange={handleAbsentTeacherChange}>
              {teachers.map((teacher) => (
                <MenuItem key={teacher} value={teacher}>
                  {teacher}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Period</InputLabel>
            <Select value={period} onChange={handlePeriodChange}>
              {periods.map((period) => (
                <MenuItem key={period} value={period}>
                  {period}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Substitute Teacher</InputLabel>
            <Select value={substituteTeacher} onChange={handleSubstituteTeacherChange}>
              {getAvailableTeachers().map((teacher) => (
                <MenuItem key={teacher} value={teacher}>
                  {teacher}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={addSubstitution}>
            Add Substitution
          </Button>
        </Stack>

        <Typography variant="h6" gutterBottom>
          Substitution List
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Absent Teacher</TableCell>
              <TableCell>Period</TableCell>
              <TableCell>Substitute Teacher</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {substitutionList.map((substitution) => (
              <TableRow key={substitution.id}>
                <TableCell>{substitution.id}</TableCell>
                <TableCell>{substitution.absentTeacher}</TableCell>
                <TableCell>{substitution.period}</TableCell>
                <TableCell>{substitution.substituteTeacher}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default SubstitutionManagement;
