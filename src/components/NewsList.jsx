import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faComment, faUser } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const NewsList = ({ news }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const newsItemStyle = {
    backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#B6C4D3',
  };

  const handleCommentClick = async (storyId) => {
    try {
      const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`);
      const story = await response.json();

      if (!story) {
        console.error('Story not found');
        return;
      }
      navigate(`/comments?storyId=${storyId}`);
    } catch (error) {
      console.error('Error fetching story:', error);
    }
  };

  return (
    <div id="news-list">
      {news.map((story) => (
        <div className='news-item' style={newsItemStyle} key={story.id}>
          <div className='news-title'>
            <a href={story.url} target="_blank" rel="noopener noreferrer">
              {story.title}
            </a>
          </div>
          <div className="news-details">
            <span className="detail">
              <FontAwesomeIcon icon={faStar} data-story-id={story.id} /> {story.score}
            </span>

            <span
              className="detail comment"
              onClick={() => handleCommentClick(story.id)}
              style={{ cursor: 'pointer' }}
            >
              <FontAwesomeIcon icon={faComment} data-story-id={story.id} /> {story.descendants}
            </span>

            <span className="detail">
              <FontAwesomeIcon icon={faUser} /> {story.by}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
