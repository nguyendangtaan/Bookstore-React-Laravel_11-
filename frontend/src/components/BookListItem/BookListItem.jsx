import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaComment, FaStar } from "react-icons/fa";
import "./BookListItem.css";

export default function BookListItem({ book }) {
  return (
    <Col key={book.id} xs={12} sm={6} md={6} lg={4} className="mb-2">
      <Link className="text-decoration-none text-dark" to={`book/${book.slug}`}>
        <Card key={book.book_id} className="book-card-component">
          <div className="card-image-component">
            <Card.Img
              variant="top"
              src={book.thumbnail}
              alt={book.book_name}
              className="book-card-img-component"
            />
          </div>
          <Card.Body className="card-body-component">
            <div className="book-card-title-component">
              <Card.Title>{book.book_name}</Card.Title>
            </div>
            <div className="book-card-author-component">
              <Card.Text>{book.author_name}</Card.Text>
            </div>
            <div className="book-card-rating-component">
              <div className="comment-icon-component">
                <FaComment /> 10
              </div>
              <div className="star-icon-component">
                <FaStar className="start" /> 10
              </div>
            </div>
            <p className="book-card-price-component" style={{ fontWeight: "bold" }}>
              {book.book_price}
            </p>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}
