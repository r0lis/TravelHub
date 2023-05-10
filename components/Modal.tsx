import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';

import * as React from 'react';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '65vh',
  width: '65vw',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input) {
      id
      userId
      date
      title
      text
      likes
      img
    }
  }
`;

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: '',
    text: '',
    img: '',
  });

  const [createPost] = useMutation(CREATE_POST_MUTATION);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const { data } = await createPost({
        variables: {
          input: {
            title: formData.title,
            text: formData.text,
            img: formData.img,
          },
        },
      });

      console.log('Created post:', data.createPost);

      // Reset form data
      setFormData({
        title: '',
        text: '',
        img: '',
      });

      // Close the modal
      handleClose();
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <Box>
      <StyledFab color="secondary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </StyledFab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Přidat příspěvek
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ marginBottom: '1rem' }}>
              <TextField
                name="title"
                label="Title"
                value={formData.title}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
   </Box>
   <Box sx={{ marginBottom: '1rem' }}>
   <TextField
                name="text"
                label="Text"
                value={formData.text}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
              />
   </Box>
   <Box sx={{ marginBottom: '1rem' }}>
   <TextField
                name="img"
                label="Image URL"
                value={formData.img}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
   </Box>
   <Button type="submit" variant="contained" color="primary">
   Create Post
   </Button>
   </form>
   </Box>
   </Modal>
   </Box>
   );
   }