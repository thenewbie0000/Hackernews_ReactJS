import React, { useState, useEffect } from 'react';
import {  } from "./styles.css";

function HackerNews() {
  const [stories, setStories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [clickedStoryId, setClickedStoryId] = useState(null);
  const apiUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';
  const itemUrl = 'https://hacker-news.firebaseio.com/v0/item/';
  const itemsPerPage = 20;

  useEffect(() => {
    async function fetchStories() {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const pageStoryIds = data.slice(startIndex, endIndex);

        const responses = await Promise.all(
          pageStoryIds.map((storyId) =>
            fetch(`${itemUrl}${storyId}.json?print=pretty`)
          )
        );
        const stories = await Promise.all(
          responses.map((response) => response.json())
        );

        setStories(stories);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    }

    fetchStories();
  }, [apiUrl, itemUrl, currentPage]);

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
    setClickedStoryId(null);
  }

  function handleCommentClick(storyId) {
    setClickedStoryId(storyId);
  }

  if (clickedStoryId) {
    window.location.href = `comments.html?storyId=${clickedStoryId}`;
    return null;
  }

  const totalPages = Math.ceil(stories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageStories = stories.slice(startIndex, endIndex);

  return (
    <div>
      <div className="header">
        <h1>Hacker News</h1>
      </div>
      <div id="news-list">
        {pageStories.map((story) => (
          <div key={story.id} className="news-item">
            <div className="news-title" data-story-id={story.id}>
              <a className="news-url" href={story.url} target="_blank">
                {story.title}
              </a>
            </div>
            <div className="news-details">
              <span className="detail">
                <i
                  className="far fa-star"
                  data-story-id={story.id}
                ></i>{' '}
                {story.score}
              </span>
              <span className="detail comment">
                {story.descendants > 0 ? (
                  <i
                    className="far fa-comments"
                    data-story-id={story.id}
                    onClick={() => handleCommentClick(story.id)}
                  >
                    {story.descendants}
                  </i>
                ) : (
                  ''
                )}
              </span>
              <span className="detail">
                <i className="far fa-user"></i> {story.by}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-container">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Back
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default HackerNews;