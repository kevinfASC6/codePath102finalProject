import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { supabase } from './client'; 

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState('newest'); 

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase.from('posts').select();
    setPosts(data);
    setFilteredPosts(data);
  }

  function getTimeDifference(postDate) {
    const currentDate = new Date();
    const postDateObj = new Date(postDate);
    const timeDiff = Math.abs(currentDate - postDateObj);
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
    return `${hoursDiff} hours ago`;
  }

  function sortPosts(order) {
    let sortedPosts = [...posts];
    if (order === 'newest') {
      sortedPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (order === 'popular') {
      sortedPosts.sort((a, b) => b.upvotes - a.upvotes);
    }
    setSortOrder(order);
    setPosts(sortedPosts);
  } 
  

  return (
    <div className='home'>
      <div className='sort'>
        <h3>Order by:</h3>
        <button onClick={() => sortPosts('newest')}>Newest</button>
        <button onClick={() => sortPosts('popular')}>Popular</button>
      </div>
      <div className='post-list'>
        {sortOrder === 'newest' ? (
          posts.map((post) => (
            <Link to={`/${post.id}`} key={post.id}>
              <div className='post-box'>
                <p>{getTimeDifference(post.created_at)}</p>
                <h2>{post.title} </h2>
                <p>Upvotes: {post.upvotes}</p>
              </div>
            </Link>
          ))
        ) : (
          posts
            .slice()
            .sort((a, b) => b.upvotes - a.upvotes)
            .map((post) => (
              <Link to={`/${post.id}`} key={post.id}>
                <div className='post-box'>
                  <p>{getTimeDifference(post.created_at)}</p>
                  <h2>{post.title} </h2>
                  <p>Upvotes: {post.upvotes}</p>
                </div>
              </Link>
            ))
        )}
      </div> 
      <div className='home-bottom'></div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;

