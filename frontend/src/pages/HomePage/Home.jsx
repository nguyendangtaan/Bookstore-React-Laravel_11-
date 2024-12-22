import {  useRef, useState, useEffect } from "react";
import {
  Carousel,
  Image,
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import {
  FaComment,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import images from "../../assets/users/img.js"
import "./homepage.scss";
import axios from "axios";

import { axiosRequest } from "../../helpers/config";

export default function Home() {
  const arrivalsRef = useRef(null);
  const bestsellersRef = useRef(null);
  const authorsRef = useRef(null);

  const [arrivalsbooks, setArrivalsbooks] = useState([]);
  const [arrivalsScroll, setArrivalsScroll] = useState({
    showLeft: false,
    showRight: true,
  });
  const [bestsellers, setbestsellers] = useState([]);
  const [bestsellersScroll, setBestsellersScroll] = useState({
    showLeft: false,
    showRight: true,
  });


  const [authorsScroll, setAuthorsScroll] = useState({
    showLeft: false,
    showRight: true,
  });

  // hàm xử lý cuộn
  const scroll = (ref, direction) => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollAmount = clientWidth / 2; // Cuộn nửa chiều rộng
      if (direction === "left") {
        ref.current.scrollTo({
          left: scrollLeft - scrollAmount,
          behavior: "smooth",
        });
      } else {
        ref.current.scrollTo({
          left: scrollLeft + scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  //kiểm  tra trạng thái nút cuộn
  const checkScrollPosition = (ref, setScrollState) => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      setScrollState({
        showLeft: scrollLeft > 0,
        showRight: scrollLeft < scrollWidth - clientWidth,
      });
    }
  };

  // gắn sự kiện
  useEffect(() => {
    const attachScroll = (ref, setScrollState) => {
      const element = ref.current;
      const handleScroll = () => checkScrollPosition(ref, setScrollState);

      if (element) {
        element.addEventListener("scroll", handleScroll);
      }

      return () => {
        if (element) {
          element.removeEventListener("scroll", handleScroll);
        }
      };
    };

    const detachArrivals = attachScroll(arrivalsRef, setArrivalsScroll);
    const detachBestsellers = attachScroll(
      bestsellersRef,
      setBestsellersScroll
    );
    const detachAuthors = attachScroll(authorsRef, setAuthorsScroll);

    return () => {
      detachArrivals();
      detachBestsellers();
      detachAuthors();
    };
  }, []);
  
  // gọi API ArrivalsBooks
  const fetchArrivalsBooks = async () => {
    try {
      const response = await axiosRequest.get("/books");
      setArrivalsbooks(response.data.data); 
    } catch (error) {
      console.error("Error fetching arrivals books:", error);
    }
  };

  useEffect(() => {
    fetchArrivalsBooks(); 
  }, []);
  
  // gọi API bestsellers
  const fetchbestsellers = async () => {
    try {
      const response = await axiosRequest.get("/books");
      setbestsellers(response.data.data); 
    } catch (error) {
      console.error("Error fetching bestsellers books:", error);
    }
  };
  useEffect(() => {
    fetchbestsellers(); 
  }, []);

  //gọi API author 
  const [author, setAuthor] = useState([]); 
  
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/authors`) 
      .then((res) => {
        setAuthor(res.data.data);
      })
  }, []); 
  if (!author || Object.keys(author).length === 0) return <p>Không tìm thấy tác giả!</p>;

  return (
    <Container fluid className="home-page">
      {/* Banner Section */}
      <Row className="carousel-row">
        <Carousel className="carousel-wrapper">
          <Carousel.Item className="carousel-item img-fluid" interval={2000}>
            <Image src={images.image1} className="baner img" />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <Image src={images.image2} className="baner img img-fluid" />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <Image src={images.image3} className="baner img img-fluid" />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Row>

      {/* Body Section */}
      <Container className="body mt-5">
        {/* New Arrivals */}
        <section className="new-arrivals">
          <div className="section-header">
            <h3>NEW ARRIVALS</h3>
            <Button variant="outline-dark see-all" size="sm">
              <Link to="/catalog">SEE ALL</Link>
            </Button>
          </div>
          <div className="scroll-container">
            {arrivalsScroll.showLeft && (
              <button
                className="scroll-button left"
                onClick={() => scroll(arrivalsRef, "left")}
              >
                <FaChevronLeft />
              </button>
            )}
            <div
              className="horizontal-scroll"
              ref={arrivalsRef}
              onScroll={() =>
                checkScrollPosition(arrivalsRef, setArrivalsScroll)
              }
            >
              {arrivalsbooks.map((book) => (
                <Link className="linkdetail" to={`book/${book.slug}`}>
                  <Card key={book.book_id} className="book-card  ">
                    <div className="bookImg"><Card.Img variant="top" src={book.thumbnail} alt={book.book_name} /></div>
                    <Card.Body className="Card-body ">
                      <div className="cardTittle"> <Card.Title>{book.book_name}</Card.Title></div>
                      <div className="cardAuthor"></div> <Card.Text>{book.author_name}</Card.Text>
                      <div className="card-details d-flex">
                        <div className="comment"> <FaComment /> {book.book_qty}</div>
                        <div className="danhgia"><FaStar className="start" /> {book.page}</div>
                      </div>
                      <p className="price" style={{ fontWeight: "bold" }}>{book.book_price}</p>
                    </Card.Body>
                  </Card>
                </Link>
              ))}
            </div>
            {arrivalsScroll.showRight && (
              <button
                className="scroll-button right"
                onClick={() => scroll(arrivalsRef, "right")}
              >
                <FaChevronRight />
              </button>
            )}
          </div>
        </section>

        {/* Bestsellers */}
        <section className="bestsellers mt-5">
          <div className="section-header">
            <h3>BEST SELLERS</h3>
            <Button variant="outline-dark see-all" size=" seeallsm">
              <Link to="/catalog">SEE ALL</Link>
            </Button>
          </div>
          <div className="scroll-container">
            {bestsellersScroll.showLeft && (
              <button
                className="scroll-button left"
                onClick={() => scroll(bestsellersRef, "left")}
              >
                <FaChevronLeft />
              </button>
            )}
            <div
              className="horizontal-scroll"
              ref={bestsellersRef}
              onScroll={() =>
                checkScrollPosition(bestsellersRef, setBestsellersScroll)
              }
            >
              {bestsellers.map((book) => (
                <Link className="linkdetail" to={`/detail/${book.book_id}`}>
                  <Card key={book.book_id} className="book-card  ">
                    <div className="bookImg"><Card.Img variant="top" src={book.thumbnail} alt={book.book_name} /></div>
                    <Card.Body className="Card-body ">
                      <div className="cardTittle"> <Card.Title>{book.book_name}</Card.Title></div>
                      <div className="cardAuthor"></div> <Card.Text>{book.author_name}</Card.Text>
                      <div className="card-details d-flex">
                        <div className="comment"> <FaComment /> {book.book_qty}</div>
                        <div className="danhgia"><FaStar className="start" /> {book.page}</div>
                      </div>
                      <p className="price" style={{ fontWeight: "bold" }}>{book.book_price}</p>
                    </Card.Body>
                  </Card>
                </Link>
              ))}
            </div>
            {bestsellersScroll.showRight && (
              <button
                className="scroll-button right"
                onClick={() => scroll(bestsellersRef, "right")}
              >
                <FaChevronRight />
              </button>
            )}
          </div>
        </section>

        {/* Popular Authors */}
        <section className="popular-authors mt-5">
          <div className="section-header">
            <h3>POPULAR AUTHORS</h3>
            <Button variant="outline-dark seeall" size="sm">
              <Link to="/catalog">SEE ALL</Link>
            </Button>
          </div>
          <div className="scroll-container">
            {authorsScroll.showLeft && (
              <button
                className="scroll-button left"
                onClick={() => scroll(authorsRef, "left")}
              >
                <FaChevronLeft />
              </button>
            )}
            <div
              className="horizontal-scroll"
              ref={authorsRef}
              onScroll={() => checkScrollPosition(authorsRef, setAuthorsScroll)}
            >
              {author.map((author) => (
               <Link className="linkdetail" to={`/authordetail/${author.author_id}`}>
                 <Card key={author.author_id} className="book-card  ">
                   <div className="bookImg"><Card.Img variant="top" src={`${author.author_img}`} alt={author.author_name} /></div>
                   <Card.Body className="Card-body ">
                     <div className="cardTittle"> <Card.Title>{author.author_name}</Card.Title></div>
                     <div className="cardAuthor"></div> <Card.Text>{author.nationality}</Card.Text>
                     <div className="card-details d-flex">
                       <div className="comment"> <FaComment /> {author.COMMENT}128</div>
                       <div className="danhgia"><FaStar className="start" /> {author.LIKE}248</div>
                     </div>
                   </Card.Body>
                 </Card>
               </Link>
                // <Link className="linkdetail" to={`/authordetail/${author.author_id}`}>
                //    <Card key={author.author_id} className="book-card  ">
                //     <div key={author.author_id} className="author-card">
                //       <img
                //         src={`${author.author_img}`}
                //         alt={author.author_name}
                //         className="author-img"
                //       />
                //       <p className="autthorName">{author.author_name}</p>
                //       <small className="countBook">{author.nationality}</small>
                //     </div>
                //    </Card>
                // </Link>
              ))}
            </div>
            {authorsScroll.showRight && (
              <button
                className="scroll-button right"
                onClick={() => scroll(authorsRef, "right")}
              >
                <FaChevronRight />
              </button>
            )}
          </div>
        </section>

        <section className="Newsletter ">
          <Row>
            <Col xs={12} lg={6} className="noidung">
              <h3>STAY UPDATED WITH OUR NEWSLETTER</h3>
              <p>Get The Lastest Updates And Special Offers</p>
            </Col>
            <Col xs={12} lg={6} className="form-email">
              <div className="input-container">
                <Form.Control
                  type="text"
                  placeholder="Enter your Email"
                  className="form-input"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                />
                <Button className="btn-signup">SIGN UP</Button>
              </div>
              <p>By subscribing, you agree to our terms and conditions</p>
            </Col>
          </Row>
        </section>
      </Container>
    </Container>
  );
}
