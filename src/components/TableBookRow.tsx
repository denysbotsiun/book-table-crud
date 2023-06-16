import { useState } from "react";
import { Link } from "react-router-dom";
import { Book } from "../models/bookModel";

interface Props {
  book: Book;
}

const TableBookRow = ({ book }: Props) => {
  const [activated, setActivated] = useState(book.isActive);
  const [isDeleted, setIsDeleted] = useState(false);
  const handleDelete = () => {
    fetch(`http://localhost:3000/books/${book.id}`, {
      method: "DELETE",
    });
    setIsDeleted(true);
  };
  const handleSetActive = () => {
    fetch(`http://localhost:3000/books/${book.id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: book.id,
        title: book.title,
        author: book.author,
        ISBN: book.ISBN,
        category: book.category,
        createdAt: book.createdAt,
        editedAt: Date.now(),
        isActive: !activated,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((item) => console.log(item));
  };
  return (
    <tr
      className={`bookTable_bodyRow ${isDeleted ? "bookTable_deletedRow" : ""}`}
    >
      <td className="bookTable_data">{book.id}</td>
      <td className="bookTable_data">{book.title}</td>
      <td className="bookTable_data">{book.author}</td>
      <td className="bookTable_data">{book.ISBN}</td>
      <td className="bookTable_data">{book.category}</td>
      <td className="bookTable_data">{book.createdAt}</td>
      <td className="bookTable_data">{book.editedAt}</td>
      <td className="bookTable_data">{activated ? "Active" : "Inactive"}</td>
      <td className="bookTable_data bookTable_btn">
        <Link
          className={`button ${isDeleted ? "hidden" : ""}`}
          to={`/edit/${book.id}`}
        >
          Edit
        </Link>
        <button
          className={`button ${activated ? "disactivateBtn" : "activateBtn"} ${
            isDeleted ? "hidden" : ""
          }`}
          onClick={() => {
            setActivated((prev) => !prev);
            handleSetActive();
          }}
        >
          {activated ? "Disactivate" : "Activate"}
        </button>
        <button
          className={`button deleteBtn ${activated ? "" : "hidden"} ${
            isDeleted ? "hidden" : ""
          }`}
          onClick={handleDelete}
        >
          Delete book
        </button>
      </td>
    </tr>
  );
};

export default TableBookRow;
