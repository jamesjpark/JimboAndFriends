import axios from "axios";
import { useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { AppBar, Toolbar, Typography, InputBase, Box, Button} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


function Header(props) {
  const navigate = useNavigate();
  let c = props.user;
  
  console.log(c);
    return(
      
      <AppBar position="static">
      <Toolbar className="b">
        <Typography variant="h5" className="App-header">
          Jimbo and Friends
        </Typography>
        <Box display="flex">
          <Typography variant="h6" className="App-header">
            EE461L
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
    )
}

export default Header;