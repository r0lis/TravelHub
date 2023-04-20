import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Container } from '@mui/system';
import Modal from 'components/Modal';
import * as React from 'react';

export const BottomAppBar: React.FC = () => {
  return (
    <Container sx={{ paddingBottom: '15px' }}>
      <React.Fragment>
        <AppBar
          position="fixed"
          color="primary"
          sx={{ top: 'auto', bottom: 0 }}
        >
          <Toolbar>
            <Modal />
          </Toolbar>
        </AppBar>
      </React.Fragment>
    </Container>
  );
};
// eslint-disable-next-line import/no-default-export
export default BottomAppBar;
