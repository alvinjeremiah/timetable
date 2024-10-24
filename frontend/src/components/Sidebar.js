// src/components/Sidebar.js
import React from 'react';
import { List, ListItem, ListItemText, Drawer, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <div>
        <List>
          <ListItem button component={Link} to="/dashboard">
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/timetable">
            <ListItemText primary="Timetable Management" />
          </ListItem>
          <ListItem button component={Link} to="/teachers">
            <ListItemText primary="Teacher Management" />
          </ListItem>
          <ListItem button component={Link} to="/substitution">
            <ListItemText primary="Substitution Management" />
          </ListItem>
          <ListItem button component={Link} to="/classes">
            <ListItemText primary="Class Management" />
          </ListItem>
        </List>
        <Divider />
      </div>
    </Drawer>
  );
};

export default Sidebar;
