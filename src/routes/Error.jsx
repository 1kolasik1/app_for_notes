import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="flex flex-col my-40 justify-center items-center">
      <h1 className="text-5xl text-stone-600">404</h1>
      <h1 className="text-6xl text-stone-700"> Page not found</h1>
      <p className="text-4xl text-stone-500 mt-4">
        Go
        <Link to="/" className="underline hover:text-blue-600 ml-1">
          Home
        </Link>
      </p>
    </div>
  );
}
