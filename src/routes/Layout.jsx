import { NavLink, Outlet } from "react-router-dom";
import { useUserContext } from "../components/userContext";

export default function Layout() {
  const user = useUserContext();
  const handleLogOut = () => {
    user.setUser({ email: "" });
  };
  const arrOfUsers = [user];

  return (
    <div className="mx-4">
      <header className="flex flex-row text-lg mt-5 justify-between mb-10 flex-wrap">
        <div className="text-2xl sm:text-3xl ml-[2vh] sm:ml-10">
          Hello,{arrOfUsers[0].user.email}
        </div>
        <div className="flex gap-5 text-xl">
          <NavLink
            to="/"
            end={true}
            className={({ isActive }) =>
              isActive
                ? "font-medium text-black-1000  text-2xl "
                : "font-medium text-stone-500  text-2xl "
            }
          >
            About
          </NavLink>
          <NavLink
            to="/notes"
            className={({ isActive }) =>
              isActive
                ? "font-medium text-black-1000  text-2xl"
                : "font-medium text-stone-500  text-2xl"
            }
          >
            Notes
          </NavLink>
          <button
            onClick={handleLogOut}
            className=" font-medium text-red-700 text-2xl"
          >
            Log Out
          </button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
