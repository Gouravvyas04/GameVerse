import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Carousel,
  Button,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";
import {
  FaStar,
  FaBookmark,
  FaCalendarAlt,
  FaMicrochip,
  FaGamepad,
} from "react-icons/fa";

import {
  fetchGameDetails,
  fetchGameScreenshots,
} from "../services/api";
import {
  addBookmark,
  removeBookmark,
} from "../redux/bookSlice";

import "./GameDetail.css";

const GameDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [gameInfo, setGameInfo] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const savedGames = useSelector((state) => state.bookmarks.bookmarkedGames);
  const isSaved = savedGames.some((item) => item.id === parseInt(id));

  useEffect(() => {
    const loadGameDetails = async () => {
      setLoading(true);
      setLoadError(null);
      try {
        const [gameData, screenData] = await Promise.all([
          fetchGameDetails(id),
          fetchGameScreenshots(id),
        ]);
        setGameInfo(gameData);
        setScreenshots(screenData);
      } catch (err) {
        console.error("Failed to fetch game data:", err);
        setLoadError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    loadGameDetails();
  }, [id]);

  const handleBookmark = () => {
    if (isSaved) {
      dispatch(removeBookmark(parseInt(id)));
    } else if (gameInfo) {
      dispatch(
        addBookmark({
          id: gameInfo.id,
          name: gameInfo.name,
          background_image: gameInfo.background_image,
          rating: gameInfo.rating,
        })
      );
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading game information...</p>
      </Container>
    );
  }

  if (loadError) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          Failed to load game: {loadError}
          <div className="mt-3">
            <Link to="/">
              <Button variant="outline-primary">Back to Home</Button>
            </Link>
          </div>
        </Alert>
      </Container>
    );
  }

  if (!gameInfo) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">
          No game data available.
          <div className="mt-3">
            <Link to="/">
              <Button variant="outline-primary">Back to Home</Button>
            </Link>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="game-detail-container py-4">
      {/* Top Title and Bookmark */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/" className="back-link">
              &larr; Return to Game List
            </Link>
            <Button
              variant={isSaved ? "warning" : "outline-warning"}
              onClick={handleBookmark}
              className="bookmark-toggle"
            >
              <FaBookmark className="me-2" />
              {isSaved ? "Saved to Library" : "Add to Library"}
            </Button>
          </div>

          <h1 className="game-heading mt-3">{gameInfo.name}</h1>

          <div className="d-flex flex-wrap gap-3 align-items-center mt-2">
            <div className="game-rating">
              <FaStar className="me-1 text-warning" />
              {gameInfo.rating ? gameInfo.rating.toFixed(1) : "N/A"}
            </div>
            {gameInfo.released && (
              <div className="release-info">
                <FaCalendarAlt className="me-1" />
                {new Date(gameInfo.released).toLocaleDateString()}
              </div>
            )}
          </div>

          <div className="genre-tags mt-3">
            {gameInfo.genres?.map((g) => (
              <Badge bg="secondary" key={g.id} className="me-2">
                {g.name}
              </Badge>
            ))}
          </div>
        </Col>
      </Row>

      {/* Carousel for Screenshots */}
      {screenshots.length > 0 && (
        <Row className="mb-4">
          <Col>
            <Carousel className="game-screenshot-carousel">
              {screenshots.map((shot) => (
                <Carousel.Item key={shot.id}>
                  <img
                    src={shot.image}
                    alt={`${gameInfo.name} screenshot`}
                    className="d-block w-100"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      )}

      {/* Content and Sidebar */}
      <Row className="mb-5">
        {/* Main Content */}
        <Col md={8}>
          {/* About Section */}
          <div className="description-card">
            <h3>About</h3>
            <div
              className="description-content"
              dangerouslySetInnerHTML={{ __html: gameInfo.description }}
            />
          </div>

          {/* Requirements */}
          {gameInfo.platforms?.some(
            (p) => p.requirements?.minimum || p.requirements?.recommended
          ) && (
              <div className="requirements-card mt-4">
                <h3>
                  <FaMicrochip className="me-2" />
                  System Requirements
                </h3>
                {gameInfo.platforms
                  .filter(
                    (p) =>
                      p.requirements?.minimum || p.requirements?.recommended
                  )
                  .map((p) => (
                    <div className="platform-block" key={p.platform.id}>
                      <h5>{p.platform.name}</h5>
                      {p.requirements?.minimum && (
                        <div className="req-item">
                          <h6>Minimum:</h6>
                          <p>{p.requirements.minimum}</p>
                        </div>
                      )}
                      {p.requirements?.recommended && (
                        <div className="req-item">
                          <h6>Recommended:</h6>
                          <p>{p.requirements.recommended}</p>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
        </Col>

        {/* Sidebar Info */}
        <Col md={4}>
          <div className="game-info-card">
            <h3>Game Details</h3>

            {gameInfo.platforms && (
              <div className="info-item">
                <h5>
                  <FaGamepad className="me-2" />
                  Platforms
                </h5>
                <p>{gameInfo.platforms.map((p) => p.platform.name).join(", ")}</p>
              </div>
            )}

            {gameInfo.developers?.length > 0 && (
              <div className="info-item">
                <h5>Developer</h5>
                <p>{gameInfo.developers.map((dev) => dev.name).join(", ")}</p>
              </div>
            )}

            {gameInfo.publishers?.length > 0 && (
              <div className="info-item">
                <h5>Publisher</h5>
                <p>{gameInfo.publishers.map((pub) => pub.name).join(", ")}</p>
              </div>
            )}

            {gameInfo.esrb_rating && (
              <div className="info-item">
                <h5>Age Rating</h5>
                <p>{gameInfo.esrb_rating.name}</p>
              </div>
            )}

            {gameInfo.website && (
              <div className="info-item">
                <h5>Website</h5>
                <a
                  href={gameInfo.website}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Visit Official Website
                </a>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default GameDetailPage;
