import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Badge, Modal } from "react-bootstrap";
import { FaStar, FaBookmark, FaExpand } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { addBookmark, removeBookmark } from "../redux/bookSlice";
import "./GameCardLayout.css";

const GameCard = ({ game }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);

  const bookmarks = useSelector(state => state.bookmarks.bookmarkedGames);
  const alreadySaved = bookmarks.find(g => g?.id === game?.id);

  const handleBookmark = () => {
    const gameData = {
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      rating: game.rating,
    };

    if (alreadySaved) {
      dispatch(removeBookmark(game.id));
    } else {
      dispatch(addBookmark(gameData));
    }
  };

  const openPopup = () => setModalVisible(true);
  const closePopup = () => setModalVisible(false);
  const openDetailPage = () => navigate(`/game/${game.id}`);

  if (!game) return null;

  return (
    <>
      <Card className="game-card h-100" onClick={openPopup}>
        <div className="game-image-container">
          {game.background_image ? (
            <Card.Img
              src={game.background_image}
              alt={game.name}
              className="game-image"
              variant="top"
            />
          ) : (
            <div className="placeholder-image">No Image Available</div>
          )}
        </div>

        <Card.Body>
          <Card.Title className="game-title">{game.name}</Card.Title>
          <div className="game-meta">
            <div className="rating">
              <FaStar className="star-icon" />
              <span>{game.rating ? game.rating.toFixed(1) : "N/A"}</span>
            </div>
            <div className="release-date">
              {game.released ? new Date(game.released).getFullYear() : "TBA"}
            </div>
          </div>

          <div className="game-genres">
            {Array.isArray(game.genres) && game.genres.length > 0 ? (
              game.genres.map(genre => (
                <Badge key={genre.id} bg="dark" className="me-1">
                  {genre.name}
                </Badge>
              ))
            ) : (
              <span>N/A</span>
            )}
          </div>

          <div className="game-tags mt-2">
            {Array.isArray(game.tags) && game.tags.length > 0 ? (
              game.tags.slice(0, 3).map(tag => (
                <Badge key={tag.id} bg="secondary" className="me-1">
                  {tag.name}
                </Badge>
              ))
            ) : (
              <span>N/A</span>
            )}
          </div>
        </Card.Body>
      </Card>

      <Modal show={modalVisible} onHide={closePopup} centered size="md">
        <Modal.Header className="d-flex align-items-center">
          <Modal.Title className="me-auto">{game.name}</Modal.Title>
          <div className="d-flex align-items-center">
            <Button
              variant="link"
              onClick={openDetailPage}
              title="View Full Details"
              style={{ border: "none", background: "transparent", padding: "0 5px" }}
            >
              <FaExpand size={18} />
            </Button>
            <Button variant="close" onClick={closePopup} />
          </div>
        </Modal.Header>

        <Modal.Body>
          <img
            src={game.background_image}
            alt={game.name}
            style={{ width: "100%", borderRadius: "8px", marginBottom: "1rem" }}
          />
          <p><strong>Rating:</strong> {game.rating ? game.rating.toFixed(1) : "N/A"}</p>
          <p><strong>Release Year:</strong> {game.released ? new Date(game.released).getFullYear() : "TBA"}</p>
          <p><strong>Genres:</strong> {game.genres?.map(g => g.name).join(", ") || "N/A"}</p>
          <p><strong>Tags:</strong> {game.tags?.slice(0, 3).map(tag => tag.name).join(", ") || "N/A"}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant={alreadySaved ? "warning" : "outline-warning"}
            onClick={handleBookmark}
          >
            <FaBookmark className="me-2" />
            {alreadySaved ? "Remove from Library" : "Add to Library"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GameCard;
