import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';



export default  function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  var temp ='';
  const [status, setStatus] = React.useState('Accepted');

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleAccepted(event) {
    setAnchorEl(event.currentTarget);
    temp = 'Accepted';
    setStatus(temp);
    setAnchorEl(null);
  }
  function handleInProgress(event) {
    setAnchorEl(event.currentTarget);
     temp = 'In Progress';
     setStatus(temp);
     setAnchorEl(null);
  }
  function handleDone(event) {
    setAnchorEl(event.currentTarget);
    temp = 'Done';
    setStatus(temp);
    setAnchorEl(null);
  }
  function handleCancel(event) {
    setAnchorEl(event.currentTarget);
    temp = 'Cancel';
    setStatus(temp);
    setAnchorEl(null);
  }
  function handleClose() {
    setAnchorEl(null);
  }
  return (
    <div> 
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Choose
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleAccepted}>Accepted</MenuItem>
        <MenuItem onClick={handleInProgress}>In Progress</MenuItem>
        <MenuItem onClick={handleDone}>Done</MenuItem>
        <MenuItem onClick={handleCancel}>Cancel</MenuItem>
      </Menu>
      <div className="left">{status}</div>
    </div>
  );
}
