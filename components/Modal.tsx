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
    userId: '',
    date: '',
    title: '',
    text: '',
    likes: '',
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
            userId: parseInt(formData.userId),
            date: formData.date,
            title: formData.title,
            text: formData.text,
            likes: parseInt(formData.likes),
            img: formData.img,
          },
        },
      });

      console.log('Created post:', data.createPost);

      // Reset form data
      setFormData({
        userId: '',
        date: '',
        title: '',
        text: '',
        likes: '',
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
            <TextField
              name="userId"
              label="User ID"
              value={formData.userId}
              onChange={handleInputChange}
            />
            <TextField
              name="date"
              label="Date"
              value={formData.date}
              onChange={handleInputChange}
            />
            <TextField
              name="title"
              label="Title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <TextField
              name="text"
              label="Text"
              value={formData.text}
              onChange={handleInputChange}
            />
            <TextField
              name="likes"
              label="Likes"
              value={formData.likes}
              onChange={handleInputChange}
            />
            <TextField
              name="img"
              label="Image URL"
              value={formData.img}
              onChange={handleInputChange}
            />
            <Button type="submit" variant="contained" color="primary">
              Create Post
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}