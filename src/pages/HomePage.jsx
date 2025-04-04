import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../components/SidebarLayout";
import GameGrid from "../components/GameLayout";
import Pagination from "../components/Pagination";
import { fetchGames } from "../services/api";
import "./HomePage.css";

const HomePage = () => {
    const [searchParams] = useSearchParams();
    const [gameList, setGameList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [pageDetails, setPageDetails] = useState({
        total: 0,
        current: 1,
        maxPages: 0,
    });

    const retrieveGames = async () => {
        setLoading(true);
        setFetchError(null);

        try {
            const pageNumber = parseInt(searchParams.get("page")) || 1;
            const queryParams = {
                page: pageNumber,
                page_size: 12,
            };

            const searchValue = searchParams.get("search");
            if (searchValue) queryParams.search = searchValue;

            const selectedGenres = searchParams.get("genres");
            if (selectedGenres) queryParams.genres = selectedGenres;

            const selectedTags = searchParams.get("tags");
            if (selectedTags) queryParams.tags = selectedTags;

            const selectedDates = searchParams.get("dates");
            if (selectedDates) queryParams.dates = selectedDates;

            const sortBy = searchParams.get("ordering");
            if (sortBy) queryParams.ordering = sortBy;

            const gameData = await fetchGames(queryParams);
            setGameList(gameData.results);

            const pageCount = Math.ceil(gameData.count / queryParams.page_size);
            setPageDetails({
                total: gameData.count,
                current: pageNumber,
                maxPages: pageCount,
            });
        } catch (err) {
            console.error("Failed to fetch games:", err);
            setFetchError(err.message || "Something went wrong while loading games.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        retrieveGames();
    }, [searchParams]);

    return (
        <Container fluid className="home-page">
            <Row>
                <Col lg={3} md={4} className="sidebar-col">
                    <Sidebar />
                </Col>

                <Col lg={9} md={8} className="content-col">
                    <div className="game-list-header">
                        <h2>
                            {searchParams.get("search")
                                ? `Search results for "${searchParams.get("search")}"`
                                : "Browse Games"}
                        </h2>
                        {!loading && (
                            <p className="results-count">
                                {pageDetails.total} games found
                            </p>
                        )}
                    </div>

                    <GameGrid games={gameList} isLoading={loading} error={fetchError} />

                    {!loading && !fetchError && pageDetails.maxPages > 1 && (
                        <Pagination
                            currentPage={pageDetails.current}
                            totalPages={pageDetails.maxPages}
                            onPageChange={() => { }}
                        />
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
