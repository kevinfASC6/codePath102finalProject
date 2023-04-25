import React, { useState, useEffect } from 'react';
import { supabase } from './client';
import { Outlet, Link, useParams } from 'react-router-dom'; 

const ReadPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [upvotes, setUpvotes] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchPost();
    fetchComments(); // added fetchComments call
  }, []);

  async function fetchPost() {
    const { data, error } = await supabase.from('posts')
      .select()
      .eq('id', id);
    if (error) {
      console.error(error);
    } else {
      setPost(data[0]);
      setUpvotes(data[0].upvotes); // initialize upvotes count from post data
    }
  }

  async function updatePost() {
    const { error } = await supabase.from('posts')
      .update({ upvotes: upvotes + 1 }) // increment upvotes count by 1
      .eq('id', id);
    if (error) {
      console.error(error);
    } else {
      setUpvotes(upvotes + 1); // update upvotes count state
    }
  }

  async function deletePost() {
    const { error } = await supabase.from('posts')
      .delete()
      .eq('id', id);
    if (error) {
      console.error(error);
    } else {
      window.location.href = '/'; 
      alert("Post deleted successfully!")
    }
  } 


  function getTimeDifference(postDate) {
    const currentDate = new Date();
    const postDateObj = new Date(postDate);
    const timeDiff = Math.abs(currentDate - postDateObj);
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
    return `${hoursDiff} hours ago`;
  } 

  async function fetchComments() {
    const { data, error } = await supabase.from('comments')
      .select()
      .eq('post_id', id);
    if (error) {
      console.error(error);
    } else {
      setComments(data);
    }
  }

  async function addComment(e) {
    e.preventDefault();
    const { data, error } = await supabase.from('comments')
      .insert({ comment: newComment, post_id: id });
    if (error) {
      console.error(error);
    } else {
      if (data && data.length > 0) { // Check if data is not null or undefined
        setComments([...comments, data[0]]);
        setNewComment('');
      }
    }
  }
  

  if (!post) {
    return <div>Does not exist</div>;
  }

return (
  <div className='read'>
    <p>{getTimeDifference(post.created_at)}</p>
    <h2>{post.title}</h2>
    <p>{post.content}</p> 
    <img src={post.image} alt="" height="auto" width="auto"onError={(e) => { e.target.src = ''; }} /> 
    <div>
    <button onClick={updatePost}>Upvote ({upvotes})</button>  
    <Link to={`/update/${post.id}`} key={post.id}>Update</Link>
    <button onClick={deletePost}>Delete</button>
    </div>
    <h3>Comments</h3>
    <form onSubmit={addComment}>
      <input type='text' value={newComment} onChange={(e) => setNewComment(e.target.value)} />
      <button type='submit'>Add Comment</button>
    </form>
    <ul>
      {comments.map(comment => ( 
        <li key={comment.id}>
          {comment.comment}
        </li>
      ))}
    </ul>
  </div>
);

};

export default ReadPost;

