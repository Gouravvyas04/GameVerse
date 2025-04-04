import React from "react";
import { Row, Col, Alert, Spinner } from "react-bootstrap";
import GameCard from "./GameCardLayout";
import "./GameLayout.css";

const GameGrid = ({ games, isLoading, error }) => {
  // Handle loading state
  if (isLoading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Please wait, fetching games...</p>
      </div>
    );
  }

  // Handle fetch error
  if (error) {
    return (
      <Alert variant="danger" className="my-3">
        Failed to load games: {error}
      </Alert>
    );
  }

  // Handle no games found
  if (!Array.isArray(games) || games.length === 0) {
    return (
      <Alert variant="info" className="my-3">
        No results found. Try changing your search or filters.
      </Alert>
    );
  }

  // Display game cards
  return (
    <div className="game-grid">
      <Row xs={1} sm={2} md={2} lg={3} xl={3} className="g-4">
        {games.map((gameItem) => (
          <Col key={gameItem.id}>
            <GameCard game={gameItem} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default GameGrid;
