import React, { useState, useEffect } from 'react'; 
import { supabase } from './client';

const CreatePost = () => { 
  const [postInfo, setPostInfo] = useState([]);
  const [post, setPost] = useState({ title: "", content: "", image: "", upvotes: "0"});

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase.from("posts").select();
    setPostInfo(data);
    console.log("Data ", data);
  }

  async function createPost() {
    if (post.title === "") {
      alert("Please enter a title for the post.");
      return;
    }
    await supabase.from("posts").insert([post]).single();
    setPost({ title: "", content: "", image: "", upvotes: "0"});
    fetchPosts();
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createPost();
  };

  return (
    <div className="create-post-container">
      <h1>Create Post</h1>
      <form className="create-post-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleInputChange}
            placeholder="Enter Title*"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            value={post.content}
            onChange={handleInputChange}
            placeholder="Enter Optional Content"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="url"
            name="image"
            value={post.image}
            onChange={handleInputChange}
            placeholder="Enter Optional Image URL, Will not display if Invalid."
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;


