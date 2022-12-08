import { useLoaderData, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

export const loader = async ({ params: { id } }) => {
  const note = await fetch(`http://localhost:5000/notes/${id}`).then((r) =>
    r.json()
  );
  return { note };
};
export default function EditNote() {
  const { note } = useLoaderData();
  const navigate = useNavigate();

  const [title, setTitle] = useState(note.title);
  const handleSetTitle = useCallback((e) => setTitle(e.target.value), []);

  const [body, setBody] = useState(note.body);
  const handleSetBody = useCallback((e) => setBody(e.target.value), []);

  const handleSave = async () => {
    const updateNote = {
      body: body,
      title: title,
    };
    await fetch(`http://localhost:5000/notes/${note.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateNote),
    })
      .then((response) => response.json())
      .then(() => {
        navigate(`/note/${note.id}`);
      });
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-[35%]">
        <Link
          to="/notes"
          className="bg-stone-200 text-xl  text-center ml-[25px]"
        >
          <div className="px-8 py-2 text-xl bg-stone-200">Back</div>
        </Link>
        <div className="text-5xl font-medium">Edit Note</div>
      </div>
      <div>
        <input
          type="text"
          className="ml-[22%] w-[50%] h-[50px] px-4 mt-[20px] bg-stone-200 text-3xl mx-2.5"
          placeholder="Note"
          value={title}
          onChange={handleSetTitle}
        />
        <textarea
          type="text"
          className="ml-[22%] w-[50%]  h-[350px] t py-2 px-4 mt-5 bg-stone-200 text-3xl  "
          placeholder="Note text"
          value={body}
          onChange={handleSetBody}
        ></textarea>
      </div>
      <button>Back</button>
      <button
        className="text-2xl bg-stone-200 mx-[40%] py-2 px-10 "
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
}
