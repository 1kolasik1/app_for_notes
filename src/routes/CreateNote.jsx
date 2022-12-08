import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { useUserContext } from "../components/userContext";
import { useCallback, useState } from "react";

export const loader = async () => {
  const notes = await fetch(`http://localhost:5000/notes`).then((r) =>
    r.json()
  );
  return { notes };
};
export default function CreateNote() {
  const navigate = useNavigate();
  const { notes } = useLoaderData();
  const user = useUserContext();
  const arrUser = [user];

  const [title, setTitle] = useState("");
  const handleSetTitle = useCallback((e) => setTitle(e.target.value), []);

  const [body, setBody] = useState("");
  const handleSetBody = useCallback((e) => setBody(e.target.value), []);

  const handleAddNote = async () => {
    let max = 0;
    if (notes.length > 0) max = notes.sort((a, b) => b.id - a.id)[0].id;

    const note = {
      title: title,
      body: body,
      userId: arrUser[0].user.id,
      createdAt: new Date().toLocaleString(),
      id: max + 1,
    };

    await fetch(`http://localhost:5000/notes`, {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((r) => r.json())
      .then(() => {
        navigate(`/note/${note.id}`);
      });
  };
  return (
    <div className="flex flex-col">
      <div className="flex justify-center sm:justify-start flex-row gap-0 sm:gap-[35%]">
        <Link
          to="/notes"
          className="bg-stone-200 text-xl  text-center ml-[25px]"
        >
          <div className="hidden sm:block px-8 py-2 text-xl bg-stone-200">
            Back
          </div>
        </Link>
        <div className="text-5xl font-medium">Create Note</div>
      </div>
      <div className="flex flex-col justify-center sm:block">
        <input
          type="text"
          className="ml-[2vh] sm:ml-[22%] w-[80%] sm:w-[50%] h-[50px] px-4 mt-[20px] bg-stone-200 text-3xl"
          placeholder="Note"
          value={title}
          onChange={handleSetTitle}
        />
        <textarea
          type="text"
          className="ml-[2vh] sm:ml-[22%] w-[80%] sm:w-[50%]  h-[350px] t py-2 px-4 mt-5 bg-stone-200 text-3xl  "
          placeholder="Note text"
          value={body}
          onChange={handleSetBody}
        ></textarea>
        <div className="flex justify-center">
          <Link
            to={"/notes"}
            className="block sm:hidden text-2xl bg-stone-200 mt-[2vh] mx-[10%] py-[1vh] px-[2vh]"
          >
            Back
          </Link>
          <button
            className="text-2xl bg-stone-200 mt-[2vh] mx-[10%] py-[1vh] px-[2vh]"
            onClick={handleAddNote}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
