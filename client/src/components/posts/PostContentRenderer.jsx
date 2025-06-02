import TextPost from './TextPost';
import ImagePost from './MediaPost';
import LinkPost from './LinkPost';

const PostContentRenderer = ({ post }) => {
  switch (post.type) {
    case 'text':
      return <TextPost post={post} />;
    case 'media':
      return <ImagePost post={post} />;
    case 'link':
      return <LinkPost post={post} />;
    default:
      return <div>Unsupported post type</div>;
  }
};

export default PostContentRenderer;
