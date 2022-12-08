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
    <div className="flex flex-col items-center">
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
          className="flex justify-between bg-stone-200 mt-5 mx-0 sm:mx-[1vh]"
        >
          <Link to={`/note/${note.id}`}>
            <input
              type="text"
              value={note.title}
              readOnly={true}
              className="bg-stone-100 py-3 px-4 text-2xl"
            ></input>
          </Link>
          <Link to={`/editNote/${note.id}`} className="flex ">
            <img
              alt="icon"
              className="w-10 sm:w-[5vh]"
              src="https://w7.pngwing.com/pngs/848/51/png-transparent-compose-create-edit-edit-file-office-pencil-writing-creativ-mini-icon-general-office-icon.png"
            ></img>
          </Link>
          <button onClick={() => handleDelete(note.id)}>
            <img
              alt="icon"
              className="w-10 sm:w-[5vh]"
              src="https://thenounproject.com/api/private/icons/1234819/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0&token=gAAAAABjkb3XKmrqk9AfwxPj14VWYxSvxiGlVWWpEjgNE34cF5XrZptr5tm4syGbK96xQ7EOFWnfXVmLG13mlexQ7bZt99WufQ%3D%3D"
            ></img>
          </button>
        </div>
      ))}
    </div>
  );
}
export default Notes;
