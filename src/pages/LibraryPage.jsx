import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Alert
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTrash, FaStar, FaGamepad } from "react-icons/fa";
import { removeBookmark } from "../redux/bookSlice";
import "./LibraryPage.css";

const LibraryPage = () => {
    const dispatch = useDispatch();
    const { bookmarkedGames } = useSelector((state) => state.bookmarks);
    const [query, setQuery] = useState("");

    const removeGame = (id) => {
        dispatch(removeBookmark(id));
    };

    const visibleGames = bookmarkedGames.filter((game) =>
        game.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <Container className="library-page py-4">
            <Row className="mb-4">
                <Col>
                    <div className="d-flex justify-content-between align-items-center">
                        <h1>
                            <FaGamepad className="me-2" />
                            My Game Library
                        </h1>
                        <Link to="/" className="btn btn-outline-primary">
                            Browse Games
                        </Link>
                    </div>
                    <p className="text-muted">
                        You’ve saved {bookmarkedGames.length} {bookmarkedGames.length === 1 ? "game" : "games"}
                    </p>
                </Col>
            </Row>

            {bookmarkedGames.length > 0 ? (
                <>
                    <Row className="mb-4">
                        <Col md={6}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Find a game..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </Col>
                    </Row>

                    {visibleGames.length === 0 ? (
                        <Alert variant="info">
                            No results found for "{query}"
                        </Alert>
                    ) : (
                        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                            {visibleGames.map((game) => (
                                <Col key={game.id}>
                                    <Card className="library-card h-100">
                                        <div className="card-img-container">
                                            {game.background_image ? (
                                                <Card.Img
                                                    variant="top"
                                                    src={game.background_image}
                                                    alt={game.name}
                                                    className="library-card-img"
                                                />
                                            ) : (
                                                <div className="library-placeholder-img">
                                                    <FaGamepad size={40} />
                                                </div>
                                            )}
                                        </div>

                                        <Card.Body>
                                            <Card.Title className="library-card-title">
                                                {game.name}
                                            </Card.Title>

                                            {game.rating && (
                                                <div className="library-card-rating">
                                                    <FaStar className="text-warning me-1" />
                                                    {game.rating.toFixed(1)}
                                                </div>
                                            )}
                                        </Card.Body>

                                        <Card.Footer className="library-card-footer">
                                            <Link
                                                to={`/game/${game.id}`}
                                                className="btn btn-sm btn-primary me-2"
                                            >
                                                Details
                                            </Link>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => removeGame(game.id)}
                                            >
                                                <FaTrash />
                                            </Button>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}
                </>
            ) : (
                <div className="empty-library">
                    <div className="empty-library-content text-center">
                        <FaGamepad size={60} className="empty-icon" />
                        <h3>Your library is empty</h3>
                        <p>Bookmark games to build your personal collection.</p>
                        <Link to="/" className="btn btn-primary">
                            Browse Games
                        </Link>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default LibraryPage;
