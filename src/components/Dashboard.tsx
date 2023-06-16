import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Book } from "../models/bookModel";
import TableBookRow from "./TableBookRow";
import "../styles/Dashboard.scss";

const Dashboard = () => {
  const [bookList, setBookList] = useState<Array<Book>>([]);
  const [columns, setColumns] = useState<Array<string>>([]);
  const [filter, setFilter] = useState("active");
  const [filteredBookList, setFilteredBookList] = useState<Array<Book>>([]);
  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then((response) => response.json())
      .then((books) => {
        setBookList(books);
        setFilteredBookList(
          books.filter((book: Book) => book.isActive === true)
        );
        setColumns(Object.keys(books[0]));
      });
  }, []);
  return (
    <div className="wrapper">
      <div className="tableOverlay">
        <div className="tableHead">
          <div className="tableHead_filter">
            <input
              type="radio"
              name="filter"
              checked={filter === "all"}
              onChange={() => {
                setFilter("all");
                setFilteredBookList(bookList);
              }}
              id="all"
            />
            <label htmlFor="all">Show all</label>
          </div>
          <div className="tableHead_filter">
            <input
              type="radio"
              name="filter"
              checked={filter === "active"}
              onChange={() => {
                setFilter("active");
                setFilteredBookList(
                  bookList.filter((book: Book) => book.isActive === true)
                );
              }}
              id="active"
            />
            <label htmlFor="active">Show active</label>
          </div>
          <div className="tableHead_filter">
            <input
              type="radio"
              name="filter"
              checked={filter === "inactive"}
              onChange={() => {
                setFilter("inactive");
                setFilteredBookList(
                  bookList.filter((book: Book) => book.isActive === false)
                );
              }}
              id="inactive"
            />
            <label htmlFor="inactive">Show inactive</label>
          </div>
          <p>
            {filteredBookList.length} / {bookList.length}
          </p>
        </div>
        <div className="tableBody">
          <table className="bookTable">
            <thead className="bookTable_head">
              <tr>
                {columns.map((column, index) => (
                  <th className="bookTable_cell" key={index}>
                    {column}
                  </th>
                ))}
                <th className="bookTable_cell">actions</th>
              </tr>
            </thead>
            <tbody className="bootTable_body">
              {filteredBookList.map((book) => (
                <TableBookRow key={book.id} book={book} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Link className="button addBtn" to="/add">Add new book</Link>
    </div>
  );
};

export default Dashboard;
