import { Link } from "react-router-dom";

export default function ModeratorLink({ username }) {
  return (
    <Link
      to={`/user/${username}`}
      className="text-sawwit-secondary hover:underline"
    >
      u/{username}
    </Link>
  );
}
