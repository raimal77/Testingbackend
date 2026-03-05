import { useState, useEffect, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { MessageSquare, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Post {
  id: string;
  created_at: string;
  title: string;
  content: string;
  user_email: string;
}

export function Forum() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err: any) {
      console.error('Error fetching posts:', err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('posts')
        .insert([
          {
            title,
            content,
            user_id: user.id,
            user_email: user.email,
          },
        ]);

      if (error) throw error;

      setTitle('');
      setContent('');
      fetchPosts(); // Refresh list
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Community Forum</h1>
        <p className="mt-4 text-lg text-gray-600">Join the discussion about sneakers, style, and culture.</p>
      </div>

      {/* New Post Form */}
      {user ? (
        <div className="mb-12 rounded-2xl bg-gray-50 p-6 sm:p-8">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Start a Discussion</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="sr-only">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Discussion Title"
                required
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-3"
              />
            </div>
            <div>
              <label htmlFor="content" className="sr-only">Content</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                placeholder="What's on your mind?"
                required
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-3"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                {submitting ? 'Posting...' : 'Post Discussion'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="mb-12 rounded-2xl bg-gray-50 p-8 text-center">
          <p className="text-gray-600">Please <Link to="/login" className="font-medium text-black hover:underline">log in</Link> to start a discussion.</p>
        </div>
      )}

      {/* Posts List */}
      <div className="space-y-6">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-xl border border-gray-100 p-6">
              <div className="h-6 w-1/3 rounded bg-gray-200 mb-4" />
              <div className="h-4 w-full rounded bg-gray-200 mb-2" />
              <div className="h-4 w-2/3 rounded bg-gray-200" />
            </div>
          ))
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                  <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                    <span className="font-medium text-gray-900">{post.user_email?.split('@')[0]}</span>
                    <span>•</span>
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <MessageSquare className="h-5 w-5 text-gray-400" />
              </div>
              <p className="mt-4 text-gray-600 whitespace-pre-wrap">{post.content}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No discussions yet</h3>
            <p className="mt-1 text-sm text-gray-500">Be the first to start a conversation!</p>
          </div>
        )}
      </div>
    </div>
  );
}
