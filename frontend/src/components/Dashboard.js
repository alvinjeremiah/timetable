// src/components/Dashboard.js
import React from 'react';
import { Typography, Paper, Grid } from '@mui/material';

const Dashboard = () => {
  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Today's Classes</Typography>
            <Typography variant="body1">20 Classes Scheduled</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Teachers Absent</Typography>
            <Typography variant="body1">2 Teachers Absent Today</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Substitutions Needed</Typography>
            <Typography variant="body1">3 Substitutions Required</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Upcoming Events</Typography>
            <Typography variant="body1">No upcoming events</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
