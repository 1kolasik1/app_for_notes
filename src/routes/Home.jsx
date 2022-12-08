import { Link } from "react-router-dom";
import { useUserContext } from "../components/userContext";

function Home() {
  const { user } = useUserContext();
  return (
    <div className="flex justify-center">
      <div className="flex-col items-center text-2xl">
        <div className="text-5xl font-medium mt-20 ">About me</div>
        <div className="mt-5">Name: {user.name}</div>
        <div className="mt-5">Email: {user.email}</div>
        <div className="mt-5">Date sing up: {user.createdAt}</div>
        <div className="mt-10">
          <Link
            to="/notes"
            className="text-5xl underline underline-offset-1 hover:underline-offset-4"
          >
            Go to notes
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Home;
