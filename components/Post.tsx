import { gql, useQuery } from '@apollo/client';
import CommentIcon from '@mui/icons-material/Comment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import { red } from '@mui/material/colors';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { ReactNode, useState } from 'react';

interface ExpandMoreProps extends IconButtonProps {
  expand?: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
interface Post {
  id: number;
  nickname: string;
  firstname: string;
  surname: string;
  avatarIcon: string;
  date: ReactNode;
  title: string;
  text: string;
  likes: number;
  img: ReactNode;
  comments: Array<Comment>;
  user: {
    id: number;
    nickname: string;
    firstname: string;
    surname: string;
    avatarIcon: string;
  };
}

interface Comment {
  id: number;
  userId: number;
  text: ReactNode;
  date: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const Post: React.FC<Post> = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [likes, setLikes] = useState(props.likes);
  const [newComment, setNewComment] = useState('');

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleExpandClick2 = () => {
    setExpanded2(!expanded2);
  };
  const handleLikeClick = () => {
    setIsClicked(!isClicked);
    setLikes(isClicked ? likes - 1 : likes + 1);
  };
  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    const newCommentObject = {
      id: props.comments.length + 1,
      text: newComment,
      date: Date.now(),
      userId: props.comments.length + 1,
    };
    props.comments.push(newCommentObject);
    setNewComment('');
  };

  return (
    <Box>
      <Card sx={{ borderRadius: '10px' }}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" sx={{ bgcolor: red[500] }}>
              {props.user.avatarIcon}
            </Avatar>
          }
          l
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon sx={{ fontSize: 20 }} />
            </IconButton>
          }
          title={`${props.user.firstname} ${props.user.surname}`}
          subheader={props.date}
        />
        <CardMedia
          component="img"
          height="auto"
          image={`./img/${props.img}`}
          
        />
        <CardContent>
          <Typography sx={{ color: '#FFFFF', fontSize: 22 }}>
            {props.title}
          </Typography>
        </CardContent>
        <hr style={{ border: '1px solid #ccc' }} />
        <CardActions sx={{ paddingBottom: 0, paddingTop: 0 }} disableSpacing>
          <IconButton aria-label="add to favorites" onClick={handleLikeClick}>
            <FavoriteIcon
              style={{ fontSize: 30, color: isClicked ? '#d50000' : 'inherit' }}
            />
          </IconButton>
          <ExpandMore
            sx={{ marginLeft: 0 }}
            onClick={handleExpandClick2}
            aria-expanded={expanded2}
            aria-label="show more"
          >
            <CommentIcon sx={{ fontSize: 30 }} />
          </ExpandMore>
          <IconButton aria-label="share">
            <ShareIcon sx={{ fontSize: 30 }} />
          </IconButton>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>

        <Typography sx={{ paddingLeft: 2, color: '#757575', fontSize: 14 }}>
          {likes} To se mi líbí
        </Typography>
        <Collapse in={expanded2} timeout="auto" unmountOnExit>
          <CardContent>
            <List>
              {props.comments.map((comments) => (
                <ListItem key={comments.id}>
                  <ListItemText primary={comments.text} />
                </ListItem>
              ))}
              
            </List>

            <Box
              display="flex"
              justifyContent="space-between"
              flexWrap="wrap"
              alignItems="center"
              py={2}
            >
              <TextField
                fullWidth
                label="Komentář"
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Napiš komentář..."
                variant="outlined"
                color="primary"
              />
              {newComment.length > 0 && (
                <Button
                  sx={{ right: 0, marginTop: '5px' }}
                  variant="contained"
                  color="primary"
                  onClick={handleCommentSubmit}
                >
                  Zveřejnit
                </Button>
              )}
            </Box>
          </CardContent>
        </Collapse>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Popis:</Typography>
            <Typography paragraph>{props.text}</Typography>
            <Typography paragraph>{props.text}</Typography>
            <Typography paragraph>{props.text}</Typography>
            <Typography>{props.text}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};
// eslint-disable-next-line import/no-default-export
export default Post;
