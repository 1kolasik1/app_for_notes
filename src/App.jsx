import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./routes/Layout";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Notes from "./routes/Notes";
import Error from "./routes/Error";
import Note from "./routes/Note";
import CreateNote from "./routes/CreateNote";
import { loader as noteLoader } from "./routes/Note";
import { loader as createLoader } from "./routes/CreateNote";
import { loader as editLoader } from "./routes/EditNote";
import UserContextProvider from "./components/userContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import EditNote from "./routes/EditNote";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/notes",
        element: <Notes />,
      },
      {
        path: "/note/:id",
        loader: noteLoader,
        element: <Note />,
      },
      {
        path: "/editNote/:id",
        loader: editLoader,
        element: <EditNote />,
      },
      {
        path: "/createNote",
        loader: createLoader,
        element: <CreateNote />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}
