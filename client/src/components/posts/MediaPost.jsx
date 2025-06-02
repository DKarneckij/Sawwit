const MediaPost = ({ post }) => (
  <div>
    <img src={post.imageUrl} alt={post.title} className="max-w-full rounded" />
    <p className="text-gray-600 mt-2">{post.caption}</p>
  </div>
);
export default MediaPost;