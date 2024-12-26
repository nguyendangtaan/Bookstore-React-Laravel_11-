import React, { memo, useState,useEffect } from "react";
import { Row, Col, Card, Form, Button, Pagination, Container,  } from "react-bootstrap";
import { FaComment, FaStar,FaAngleDown} from "react-icons/fa";
import { Link } from "react-router-dom";
import { axiosRequest } from "../../helpers/config";

import "./Catalog.scss";

const Catalog = () => {
  

  const [books, setBooks] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showAllLanguages, setShowAllLanguages] = useState(false);
  const [showAllGenres, setShowAllGenres] = useState(false);
  const languages = ["English", "Russian", "Vietnam", "Thailand", "USA", "Germany", "Brazil"];
  const genres=["Giả tưởng", "Lãng mạn", "Khoa học viễn tưởng", "Kinh dị", "Phiêu lưu", "Trinh thám", "Tâm lý","Văn học cổ điển"];


  const [filters, setFilters] = useState({
    GENRES: [],
    LANGUAGE: [],
    AUTHOR: "",
    PRICE: { min: "", max: "" },
  });
  //phân trang
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosRequest.get("/books"); // Replace with your API URL
        setBooks(response.data.data);
        setFilteredBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  //
  useEffect(() => {
    // const timer = setTimeout(() => {
    //   if (searchText.trim() === "") {
    //     setFilteredBooks(books);
    //   } else {
    //     const filtered = books.filter((book) =>
    //       book.book_name.toLowerCase().includes(searchText.toLowerCase())
    //     );
    //     setFilteredBooks(filtered);
    //   }
    // }, 300);
    applyFilters();
    // return () => clearTimeout(timer);
  }, [searchText, filters, books]);

  const applyFilters = () => {
    const { GENRES, LANGUAGE, AUTHOR, PRICE } = filters;

    const filtered = books.filter((book) => {
      const genresMatch = GENRES.length ? GENRES.includes(book.category) : true;
      const languageMatch = LANGUAGE.length ? LANGUAGE.includes(book.language) : true;
      const authorMatch = AUTHOR ? book.author_name.toLowerCase().includes(AUTHOR.toLowerCase()) : true;
      const priceMatch =
        (PRICE.min === "" || book.book_price >= Number(PRICE.min)) &&
        (PRICE.max === "" || book.book_price <= Number(PRICE.max));
        const searchMatch = searchText ? book.book_name.toLowerCase().includes(searchText.toLowerCase()) : true;

      return genresMatch && languageMatch && authorMatch && priceMatch && searchMatch;
    });

    setFilteredBooks(filtered);
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      if (type === "GENRES" || type === "LANGUAGE") {
        const isSelected = prev[type].includes(value);
        return {
          ...prev,
          [type]: isSelected
            ? prev[type].filter((item) => item !== value)
            : [...prev[type], value],
        };
      }
      if (type === "AUTHOR") {
        return { ...prev, AUTHOR: value };
      }
      if (type === "PRICE") {
        return { ...prev, PRICE: { ...prev.PRICE, ...value } };
      }
      return prev;
    });
  };

  return (
    <Container fluid className="catalog-page">
      <Row>
        {/* Sidebar */}
        <Col xs={12}  md={3} className="Sidebar bg-light ">
          <div className="logo mb-4 mt-4">
            <h2>Books</h2>
          </div>
          <div className="filter-section">
            <h2>Filter</h2>
            <p>{filteredBooks.length} results</p>

            <div className="filter-tags mb-4">
              {filters.LANGUAGE.map((lang) => (
                <span key={lang} className="badge   me-2">
                  {lang}
                </span>
              ))}
              {filters.GENRES.map((lang) => (
                <span key={lang} className="badge  me-2">
                  {lang}
                </span>
              ))}
              
            </div>
            <div className="filter-options mb-4">
              <h3>Genres</h3>
              {genres.slice(0, showAllGenres ? genres.length : 5).map((genres) => (
                <Form.Check
                  key={genres}
                  label={genres}
                  onChange={() => handleFilterChange("GENRES", genres)}
                />
              ))}
              {genres.length > 5 && (
                <Button 
                  variant="link"
                 className="showMore  p-0"
                  onClick={() => setShowAllGenres(!showAllGenres)}
                >
                  {showAllGenres ? "View Less" : "View More"} <FaAngleDown />
                </Button>
              )}
            </div>

            <div className="filter-options mb-4">
              <h3>Language</h3>
              {languages.slice(0, showAllLanguages ? languages.length : 5).map((language) => (
                <Form.Check
                  key={language}
                  label={language}
                  onChange={() => handleFilterChange("LANGUAGE", language)}
                />
              ))}
              {languages.length > 5 && (
                <Button 
                  variant="link"
                 className="showMore  p-0"
                  onClick={() => setShowAllLanguages(!showAllLanguages)}
                >
                  {showAllLanguages ? "View Less" : "View More"}<FaAngleDown />
                </Button>
              )}
            </div>

            <div className="filter-options mb-4">
              <h3>Author</h3>
              <Form.Control
                type="text"
                placeholder="Find Author"
                onChange={(e) => handleFilterChange("AUTHOR", e.target.value)}
              />
            </div>

            <div className="filter-price mb-4">
              <h3>Price</h3>
              <div className="d-flex gap-2">
                <Form.Control
                  type="number"
                  placeholder="Min"
                  onChange={(e) =>
                    handleFilterChange("PRICE", { min: e.target.value })
                  }
                />
                <Form.Control
                  type="number"
                  placeholder="Max"
                  onChange={(e) =>
                    handleFilterChange("PRICE", { max: e.target.value })
                  }
                />
              </div>
            </div>

            <Button
              variant="primary "
              className="w-100 btn-catalog"
              onClick={applyFilters}
            >
              Apply
            </Button>
          </div>
        </Col>

        {/* Main Content */}
        <Col xs={12} sm={12} md={9} className="book-content">
          <div className="catalog-search-bar mb-4 mt-4">
            <div className="d-flex boder-input">
              <Form.Control
                type="text"
                placeholder="Find Your Book Here"
                className="me-2 boder-none"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    
                  }
                }}
              />
              <Button
                className="btn-catalog"
                variant="danger"
                
              >
                Search
              </Button>
            </div>
          </div>

          <Row className="catalog-books">
            {currentBooks.map((book) => (
              <Col key={book.id} xs={12} sm={6} md={6} lg={4}  className="mb-4">              
                <Link className="linkdetail"     to={`book/${book.slug}`}>
              <Card key={book.book_id} className="book-card shadow-sm ">
                <div className="bookImg"><Card.Img variant="top" src={book.thumbnail} alt={book.book_name}/></div>
                <Card.Body className="Card-body">
                 <div className="cardTittle"> <Card.Title>{book.book_name}</Card.Title></div>
                 <div className="cardAuthor"></div> <Card.Text>{book.author_name}</Card.Text>
                  <div className="card-details d-flex">
                   <div className="comment"> <FaComment /> {book.book_qty}</div> 
                   <div className="danhgia"><FaStar className="start"/> {book.page}</div>
                  </div>
                  <p className="price" style={{fontWeight:"bold"}}>{book.book_price}</p>
                </Card.Body>
              </Card>
              </Link>
              </Col>
            ))}
          </Row>

          <Pagination className="justify-content-center mt-4">
            {Array.from(
              { length: Math.ceil(filteredBooks.length / booksPerPage) },
              (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              )
            )}
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default memo(Catalog);
