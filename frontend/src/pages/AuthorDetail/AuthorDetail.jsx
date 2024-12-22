import { useState, React,useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { FaRegStar } from "react-icons/fa";
import { GoComment } from "react-icons/go";
import Image from "react-bootstrap/Image";
import "./ProductInfo.css";
import "./AuthorDetail.css";
import axios from "axios";
import BookListItem from "../../components/BookListItem/BookListItem";

export default function AuthorDetail() {
  const { id } = useParams(); // Lấy giá trị id từ URL
  const [author, setAuthor] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/authordetail/${id}`) 
      .then((res) => {
        if (res.data.success) {
          setAuthor(res.data.data.author);
        } else {
          setError("Failed to fetch author data");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("An error occurred while fetching author data");
        setLoading(false);
      });
  }, [id]); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!author || Object.keys(author).length === 0) return <p>Không tìm thấy tác giả!</p>;

  return (
    <div className="product-page">
      {/* <ProductInfo selBook={book} /> */}

      <div className="product-info-container">
        <div className="product-info d-flex">
          <div className="product-image">
            <div className="book-image">
              <Image
                src={`${author.author_img}`}
                alt="Hình ảnh sách"
                className="custom-image"
                fluid
              />
            </div>
          </div>

          <div className="product-details flex-grow-1">
            <div className="book-introduction">
              <h2>{author.author_name}</h2>
            </div>
            <div className="rating-info">
              <label className="rating-comment">
                <GoComment className="icon" />
                {author.COMMENT}
              </label>
              <label className="rating-comment">
                <FaRegStar className="icon" />  
                {author.LIKE}
              </label>
            </div>
            <div className="book-info">
              <div className="info-item">
                <strong>Year of Birth:</strong> 
                {author.yob}
              </div>
              <div className="info-item">
                <strong>Nationality:</strong>
                {author.nationality}
              </div>
              <div className="info-item">
                <strong>Numbers of books:</strong>
                60
                {/* add api */}
              </div>
              <div className="info-item">
                <strong>Books sale:</strong>
                128
                {/* add api */}
              </div>

            </div>
          </div>

          <div className="book-description">
            <h3>About</h3>
            <p>{author.author_desc}</p>
          </div>
        </div>
        <ToastContainer />
      </div>

      <div className="related-products">
        <h2>YOU MAY ALSO LIKE</h2>
        <Container className="book-list-container">
          <Row className="book-list-row">
            {author.books.map((book) => (
              <Col
                key={book.id}
                xs={6} // 2 columns on extra small screens
                sm={6} // 2 columns on small screens
                md={6} // 3 columns on medium screens
                lg={6} // 4 columns on large screens
                xl={3} // 4 columns on extra large screens
                className="book-list-col"
              >
                <BookListItem book={book} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}
