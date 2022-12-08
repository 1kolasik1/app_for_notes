import { Link } from "react-router-dom";
import { useUserContext } from "../components/userContext";
import { useState } from "react";
import { useEffect } from "react";

function Notes() {
  const { user } = useUserContext();
  const [notes, setNotes] = useState([]);
  const arrNotes = [...notes];
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/notes/${id}`, {
      method: "DELETE",
      body: JSON.stringify(notes),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    fetch(`http://localhost:5000/notes?userId=${user.id}`)
      .then((r) => r.json())
      .then((r) => setNotes(r));
  };
  useEffect(() => {
    fetch(`http://localhost:5000/notes?userId=${user.id}`)
      .then((r) => r.json())
      .then((r) => setNotes(r));
  }, [user.id]);
  return (
    <div className="flex flex-col">
      <div className="text-5xl font-medium">Notes</div>
      <Link
        to={`/createNote`}
        className="text-2xl bg-stone-200 mt-10 pt-2 pb-2 pl-5 pr-5"
      >
        Add new note
      </Link>
      {arrNotes.map((note) => (
        <div
          key={note.id}
          className="flex bg-stone-200 mt-5 mx-0 sm:mx-[1vh] max-w-full px-2"
        >
          <Link
            to={`/note/${note.id}`}
            className="text-2xl bg-stone-200 pt-2 pb-2 pl-[1vh] pr-5 underline"
          >
            {note.title}
          </Link>
          <div className="flex gap-2 ml-auto">
            <Link
              to={`/editNote/${note.id}`}
              className="w-[5vh] h-[5vh]  sm:w-[6vh] sm:h-[6vh]"
            >
              <img alt="icon" className="" src="/edit.png"></img>
            </Link>
            <button
              onClick={() => handleDelete(note.id)}
              className="w-[5vh] h-[5vh] sm:w-[6vh] sm:h-[6vh]"
            >
              <img alt="icon" className="" src="/delete.png"></img>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Notes;
