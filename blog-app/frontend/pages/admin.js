import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_POST, GET_POSTS, DELETE_POST } from '../lib/queries';
import { useRouter } from 'next/router';

export default function Admin() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [createPost, { loading, error }] = useMutation(CREATE_POST);
  const [deletePost] = useMutation(DELETE_POST);
  const { data, loading: postsLoading, error: postsError, refetch } = useQuery(GET_POSTS);
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imagePath = '';
    if (image) {
      // Upload image to /public/uploads
      const formData = new FormData();
      formData.append('file', image);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      imagePath = data.filePath;
    }
    // Store date in YYYY-MM-DD format
    const now = new Date();
    const createdAt = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    await createPost({ variables: { title, content, author, imagePath, createdAt } });
    setTitle('');
    setContent('');
    setAuthor('');
    setImage(null);
    setImagePreview(null);
    refetch();
  };

  const handleDelete = async (id) => {
    await deletePost({ variables: { id } });
    refetch();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-xl shadow-lg p-8 mb-10 border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Add New Blog Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <input
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <input
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="text"
            placeholder="Author"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            required
          />
          <textarea
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Content"
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={8}
            required
          />
          <div>
            <label className="block mb-2 text-gray-600 font-semibold">Upload Image</label>
            <input
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg mt-4 border border-gray-200" />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-3 rounded-lg font-semibold text-lg shadow hover:from-blue-700 hover:to-blue-500 transition"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Post'}
          </button>
          {error && <p className="text-red-500 text-center">Error: {error.message}</p>}
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">All Posts</h2>
        {postsLoading ? (
          <div className="text-center py-8">Loading posts...</div>
        ) : postsError ? (
          <div className="text-red-500 text-center">Error loading posts: {postsError.message}</div>
        ) : (
          <ul className="space-y-4">
            {data?.posts.map(post => (
              <li key={post.id} className="bg-gray-50 rounded-lg shadow flex justify-between items-center p-4 border border-gray-100">
                <div>
                  <div className="font-semibold text-lg text-gray-800">{post.title}</div>
                  <div className="text-sm text-gray-500">By {post.author}</div>
                  <div className="text-xs text-gray-400">{
                    post.createdAt
                      ? (() => {
                          try {
                            // Parse YYYY-MM-DD format
                            const [year, month, day] = post.createdAt.split('-');
                            const date = new Date(Number(year), Number(month) - 1, Number(day));
                            return isNaN(date.getTime())
                              ? 'Invalid Date'
                              : date.toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                });
                          } catch {
                            return 'Invalid Date';
                          }
                        })()
                      : ''
                  }</div>
                </div>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 