import { Link, useLoaderData, useNavigate } from "react-router-dom";
export const loader = async ({ params: { id } }) => {
  const note = await fetch(`http://localhost:5000/notes/${id}`).then((r) =>
    r.json()
  );
  return { note };
};
function Note() {
  const { note } = useLoaderData();
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/notes/${id}`, {
      method: "DELETE",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/notes");
      });
  };
  return (
    <div className="flex flex-col justify-center">
      <div className="hidden sm:flex flex-row gap-[25%]">
        <Link to="/notes">
          <div className="ml-[10px] px-8 py-5 text-xl bg-stone-200">Back</div>
        </Link>
        <div className="text-5xl align-center font-medium">{note.title}</div>
        <div className="hidden sm:flex gap-10">
          <Link to={`/editNote/${note.id}`} className="flex ">
            <img
              alt="icon"
              className="w-[80px] mr-[50px]"
              src="https://w7.pngwing.com/pngs/848/51/png-transparent-compose-create-edit-edit-file-office-pencil-writing-creativ-mini-icon-general-office-icon.png"
            ></img>{" "}
          </Link>
          <button onClick={() => handleDelete(note.id)}>
            <img
              alt="icon"
              className="w-[80px] mr-[50px]"
              src="https://w7.pngwing.com/pngs/894/954/png-transparent-delete-forever-ic-google-material-design-3-icon.png"
            ></img>
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <textarea
          value={note.body}
          readOnly={true}
          className="w-[90%] sm:w-[50%] h-[400px] font-[400] px-8 py-5 mt-10 bg-stone-200 text-3xl align-center rounded-sm "
        >
          {note.body}
        </textarea>
      </div>
      <div className="flex mt-[5vh] sm:hidden justify-between">
        <Link to={`/editNote/${note.id}`} className="flex ">
          <img
            alt="icon"
            className="w-[10vh]"
            src="https://w7.pngwing.com/pngs/848/51/png-transparent-compose-create-edit-edit-file-office-pencil-writing-creativ-mini-icon-general-office-icon.png"
          ></img>{" "}
        </Link>
        <button onClick={() => handleDelete(note.id)}>
          <img
            alt="icon"
            className="w-[10vh] "
            src="https://w7.pngwing.com/pngs/894/954/png-transparent-delete-forever-ic-google-material-design-3-icon.png"
          ></img>
        </button>
      </div>
      <div className="flex justify-center w-[100%] sm:hidden">
        <Link to="/notes">
          <div className="ml-[10px] px-8 py-5 text-xl mt-[3vh] bg-stone-200">
            Back
          </div>
        </Link>
      </div>
    </div>
  );
}
export default Note;
