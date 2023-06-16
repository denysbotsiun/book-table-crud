import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";
import "../styles/AddBook.scss";

const AddBook = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookISBN, setBookISBN] = useState("");
  const [bookCategory, setBookCategory] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (bookTitle && bookAuthor && bookISBN && bookCategory) {
      fetch(`http://localhost:3000/books`, {
        method: "POST",
        body: JSON.stringify({
          id: Date.now(),
          title: bookTitle,
          author: bookAuthor,
          ISBN: bookISBN,
          category: bookCategory,
          createdAt: moment().format("Do MMMM YYYY, h:mm a"),
          editedAt: "-",
          isActive: true,
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
      <Link className="dashboardLink" to="/">Dashboard</Link>
      <div className="formOverlay">
        <header className="header">Add new book</header>
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
          <button className="submitBtn" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
