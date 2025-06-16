import Comment from '@components/comment/Comment'

const CommentList = ({comments}) => {
  return (
    <div className="space-y-4 px-2">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default CommentList