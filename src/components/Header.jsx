import React from 'react';
import { useNavigate } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  header: {
    top: 0,
    width: '100%',
    height: '10vh',
    backgroundColor: '#19406A',
    position: 'fixed',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Sora, sans-serif',
    color: 'white',
    paddingRight: theme.spacing(2),
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(2),
  },
  title: {
    marginLeft: theme.spacing(4),
    color: 'white',
    cursor: 'pointer',
    width: '100%',
    display: 'inline',
    alignSelf: 'center',
  },
  switch: {
    position: 'absolute'
  },
}));

const Header = ({ toggleTheme, mode }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className={classes.header}>
      <h1 onClick={handleClick} style={{cursor:'pointer'}}>Hacker News</h1>
      <Switch
        checked={mode === 'dark'}
        onChange={toggleTheme}
        color="primary"
        className={classes.switch}
      />
    </div>
  );
};

export default Header;
