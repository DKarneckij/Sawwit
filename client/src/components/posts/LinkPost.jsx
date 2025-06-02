const LinkPost = ({ post }) => (
  <div>
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline break-words"
    >
      {post.url}
    </a>
    {post.description && <p className="mt-2 text-gray-600">{post.description}</p>}
  </div>
);
export default LinkPost;
