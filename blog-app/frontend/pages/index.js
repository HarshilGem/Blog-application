import { useQuery } from '@apollo/client';
import Link from 'next/link';
import Image from 'next/image';
import { GET_POSTS } from '../lib/queries';
import PlaceholderImage from '../components/PlaceholderImage';

export default function Home() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-red-500 text-xl">Error: {error.message}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Share Your Story</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create beautiful, personalized blog posts that fit your brand. Share your thoughts with the world.
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <div className="relative h-64 w-full">
                {post.imagePath ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL || ''}${post.imagePath}`}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    style={{ minHeight: '256px' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const placeholder = document.createElement('img');
                      placeholder.src = `data:image/svg+xml;base64,${btoa(`
                        <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                          <rect width="800" height="600" fill="#f3f4f6"/>
                          <text x="50%" y="50%" font-family="Arial" font-size="32" fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">
                            No Image Available
                          </text>
                        </svg>
                      `)}`;
                      placeholder.alt = 'Placeholder';
                      placeholder.className = 'w-full h-full object-cover';
                      placeholder.style.minHeight = '256px';
                      e.target.parentNode.appendChild(placeholder);
                    }}
                  />
                ) : (
                  <div className="w-full h-full min-h-[256px] bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">No Image Available</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-3">{post.title}</h2>
                <p className="text-gray-600 mb-4">By {post.author}</p>
                <p className="text-sm text-gray-500 mb-6">
                  {post.createdAt
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
                    : ''}
                </p>


                <Link
                  href={`/post/${post.id}`}
                  className="inline-block bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-900 text-white py-20 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Blog?</h2>
          <Link 
            href="/admin"
            className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Create New Post
          </Link>
        </div>
      </div>
    </div>
  );
}