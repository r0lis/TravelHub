import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Modal from 'components/Modal';
import { Container } from '@mui/system';

export const BottomAppBar : React.FC = () => {
 
  return (
    <Container sx={{paddingBottom:"15px"}}>
      <React.Fragment>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <Modal/>
        </Toolbar>
      </AppBar>
    </React.Fragment>
    </Container>
    
  );
}
export default BottomAppBar;