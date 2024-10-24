// src/components/TimetableManagement.js
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

const TimetableManagement = () => {
  // State for selected class and periods
  const [selectedClass, setSelectedClass] = useState('');
  const [periods, setPeriods] = useState(6); // Default to 6 periods
  const [timetable, setTimetable] = useState([]);

  // Mock data for demonstration
  const classes = ['Class 4A', 'Class 4B', 'Class 4C'];
  const subjects = ['Math', 'Science', 'History', 'English', 'Physical Education'];

  // Handle changes to the selected class
  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  // Handle changes to the number of periods
  const handlePeriodsChange = (event) => {
    setPeriods(event.target.value);
  };

  // Initialize timetable for the selected class
  const initializeTimetable = () => {
    const newTimetable = Array.from({ length: periods }, () =>
      Array.from({ length: 5 }, () => '')
    );
    setTimetable(newTimetable);
  };

  // Update timetable cell
  const updateTimetableCell = (day, period, subject) => {
    const updatedTimetable = [...timetable];
    updatedTimetable[period][day] = subject;
    setTimetable(updatedTimetable);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Timetable Management
      </Typography>

      <Stack spacing={2} direction="row">
        <FormControl fullWidth>
          <InputLabel>Select Class</InputLabel>
          <Select value={selectedClass} onChange={handleClassChange}>
            {classes.map((cls) => (
              <MenuItem key={cls} value={cls}>
                {cls}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Number of Periods</InputLabel>
          <Select value={periods} onChange={handlePeriodsChange}>
            {[4, 5, 6, 7, 8].map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={initializeTimetable}
          disabled={!selectedClass}
        >
          Initialize Timetable
        </Button>
      </Stack>

      {timetable.length > 0 && (
        <Paper sx={{ marginTop: 2, padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            {selectedClass} - Timetable
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Period</TableCell>
                <TableCell>Monday</TableCell>
                <TableCell>Tuesday</TableCell>
                <TableCell>Wednesday</TableCell>
                <TableCell>Thursday</TableCell>
                <TableCell>Friday</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {timetable.map((row, periodIndex) => (
                <TableRow key={periodIndex}>
                  <TableCell>Period {periodIndex + 1}</TableCell>
                  {row.map((subject, dayIndex) => (
                    <TableCell key={dayIndex}>
                      <FormControl fullWidth>
                        <Select
                          value={subject}
                          onChange={(e) =>
                            updateTimetableCell(dayIndex, periodIndex, e.target.value)
                          }
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {subjects.map((subj) => (
                            <MenuItem key={subj} value={subj}>
                              {subj}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default TimetableManagement;
