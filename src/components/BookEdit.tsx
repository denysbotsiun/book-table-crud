import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Book } from "../models/bookModel";
import moment from "moment";

const BookEdit = () => {
  const { id } = useParams();
  const [, setBook] = useState<Book>();
  const navigate = useNavigate();
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookISBN, setBookISBN] = useState("");
  const [bookCategory, setBookCategory] = useState("");
  const [bookCreatedAt, setBookCreatedAt] = useState("");
  const [bookIsActive, setBookIsActive] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:3000/books/${id}`)
      .then((response) => response.json())
      .then((item) => {
        setBook(item);
        setBookTitle(item.title);
        setBookAuthor(item.author);
        setBookISBN(item.ISBN);
        setBookCategory(item.category);
        setBookCreatedAt(item.createdAt);
        setBookIsActive(item.isActive);
      });
  }, [id]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (bookTitle && bookAuthor && bookISBN && bookCategory) {
      fetch(`http://localhost:3000/books/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          id: id,
          title: bookTitle,
          author: bookAuthor,
          ISBN: bookISBN,
          category: bookCategory,
          createdAt: bookCreatedAt,
          editedAt: moment().format("Do MMMM YYYY, h:mm a"),
          isActive: bookIsActive,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      navigate("/");
    }
  };
  return (
    <div className="formWrap">
      <div className="formOverlay">
        <header className="header">Edit book</header>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <div className="form_input">
            <label className="form_label">Title</label>
            <input
              className={`form_inputField ${
                isSubmitted && !bookTitle ? "error" : ""
              }`}
              type="text"
              placeholder="Enter title"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
            />
            <p
              className={`errorMsg ${
                isSubmitted && !bookTitle ? "" : "hidden"
              }`}
            >
              This field cannot be empty
            </p>
          </div>
          <div className="form_input">
            <label className="form_label">Author</label>
            <input
              className={`form_inputField ${
                isSubmitted && !bookAuthor ? "error" : ""
              }`}
              type="text"
              placeholder="Enter author"
              value={bookAuthor}
              onChange={(e) => setBookAuthor(e.target.value)}
            />
            <p
              className={`errorMsg ${
                isSubmitted && !bookAuthor ? "" : "hidden"
              }`}
            >
              This field cannot be empty
            </p>
          </div>
          <div className="form_input">
            <label className="form_label">ISBN</label>
            <input
              className={`form_inputField ${
                isSubmitted && !bookISBN ? "error" : ""
              }`}
              type="text"
              placeholder="Enter ISBN"
              value={bookISBN}
              onChange={(e) => setBookISBN(e.target.value)}
            />
            <p
              className={`errorMsg ${isSubmitted && !bookISBN ? "" : "hidden"}`}
            >
              This field cannot be empty
            </p>
          </div>
          <div className="form_input">
            <label className="form_label">Category</label>
            <input
              className={`form_inputField ${
                isSubmitted && !bookCategory ? "error" : ""
              }`}
              type="text"
              placeholder="Enter category"
              value={bookCategory}
              onChange={(e) => setBookCategory(e.target.value)}
            />
            <p
              className={`errorMsg ${
                isSubmitted && !bookCategory ? "" : "hidden"
              }`}
            >
              This field cannot be empty
            </p>
          </div>
          <button type="submit" className="submitBtn">
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookEdit;
