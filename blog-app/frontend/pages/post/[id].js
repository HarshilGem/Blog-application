import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GET_POST } from '../../lib/queries';
import PlaceholderImage from '../../components/PlaceholderImage';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id },
    skip: !id,
  });

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
  
  if (!data?.post) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl">Post not found</div>
    </div>
  );

  const { post } = data;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
          >
            ← Back to Posts
          </Link>
        </div>
      </nav>

      {/* Hero Image */}
      <div className="relative h-[60vh] w-full flex items-center justify-center bg-gray-200">
        {post.imagePath ? (
          <img 
            src={`${process.env.NEXT_PUBLIC_API_URL || ''}${post.imagePath}`}
            alt={post.title} 
            className="w-auto h-full object-contain bg-gray-200 mx-auto"
            style={{ maxHeight: '400px', maxWidth: '100%' }}
            onError={(e) => {
              e.target.style.display = 'none';
              const placeholder = document.createElement('img');
              placeholder.src = `data:image/svg+xml;base64,${btoa(`
                <svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
                  <rect width="1200" height="800" fill="#f3f4f6"/>
                  <text x="50%" y="50%" font-family="Arial" font-size="48" fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">
                    No Image Available
                  </text>
                </svg>
              `)}`;
              placeholder.alt = 'Placeholder';
              placeholder.className = 'w-auto h-full object-contain bg-gray-200 mx-auto';
              placeholder.style.maxHeight = '400px';
              placeholder.style.maxWidth = '100%';
              e.target.parentNode.appendChild(placeholder);
            }}
          />
        ) : (
          <div className="w-full h-full min-h-[400px] bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-2xl">No Image Available</span>
          </div>
        )}
      </div>
      <div className="container mx-auto px-4 mt-6">
        <h1 className="text-5xl font-bold text-gray-900 text-center mb-8">
          {post.title}
        </h1>
      </div>

      {/* Content */}
      <article className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-gray-600 mb-8 flex items-center justify-between">
            <span className="text-lg">By <span className="font-semibold">{post.author}</span></span>
            <span className="text-sm">
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
            </span>
          </div>
          <div className="prose lg:prose-xl max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      {/* Call to Action */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Want to Share Your Story?</h2>
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