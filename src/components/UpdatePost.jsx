import React, { useState, useEffect } from 'react';
import { supabase } from './client';
import { Outlet, Link, useParams } from 'react-router-dom';

const UpdatePost = () => {  
  const { id } = useParams();  
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    fetchPost();
  }, []);

  async function fetchPost() {
    const { data, error } = await supabase.from('posts')
      .select()
      .eq('id', id);
    if (error) {
      console.error(error);
    } else {
      setPost(data[0]);
      setTitle(data[0].title);
      setContent(data[0].content);
      setImage(data[0].image);
    }
  }

  async function updatePost() {
    if (!title) {
      alert('Title is required!');
      return;
    }

    const { data, error } = await supabase.from('posts')
      .update({ title, content, image })
      .eq('id', id);
    if (error) {
      console.error(error);
    } else {
      alert('Post updated!');
    }
  }

  if (!post) {
    return <div>Does not exist</div>;
  }

  return(
     <div className="update-container">
      <h1 className="update-heading">Update Post</h1> 
        <div className="update-form-group">
          <label className="update-form-label">Title</label>
          <input className="update-form-input" type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Title" required/> 
        </div>
        <div className="update-form-group">
          <label className="update-form-label">Content</label>
          <textarea className="update-form-input" name="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Enter Optional Content"></textarea> 
        </div>
        <div className="update-form-group">
          <label className="update-form-label">Image URL</label>
          <input type="url" name="image" value={post.image} onChange={(e) => setPost({...post, image: e.target.value})} placeholder="Enter Optional Image URL" /> 
        </div>
        <button className='update-btn' onClick={updatePost}>Update</button> 
    </div>
  )
} 

export default UpdatePost; 

