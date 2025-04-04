import React, { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { fetchGenres, fetchTags } from '../services/api';
import './SidebarLayout.css';

const Sidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [genresList, setGenresList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [pickedGenres, setPickedGenres] = useState([]);
  const [pickedTags, setPickedTags] = useState([]);
  const [releaseYear, setReleaseYear] = useState('');
  const [sortOption, setSortOption] = useState('-rating');

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const fetchedGenres = await fetchGenres();
        const fetchedTags = await fetchTags();
        setGenresList(fetchedGenres.slice(0, 15));
        setTagsList(fetchedTags.slice(0, 15));
      } catch (err) {
        console.error('Failed to load filter data:', err);
      }
    };
    loadOptions();
  }, []);

  useEffect(() => {
    const initGenres = searchParams.get('genres');
    const initTags = searchParams.get('tags');
    const initDates = searchParams.get('dates');
    const initOrder = searchParams.get('ordering');

    if (initGenres) setPickedGenres(initGenres.split(','));
    if (initTags) setPickedTags(initTags.split(','));
    if (initDates) {
      const yearOnly = initDates.split(',')[0]?.slice(0, 4);
      if (!isNaN(parseInt(yearOnly))) setReleaseYear(yearOnly);
    }
    if (initOrder) setSortOption(initOrder);
  }, []);

  const toggleGenre = (id) => {
    setPickedGenres(prev =>
      prev.includes(id.toString())
        ? prev.filter(g => g !== id.toString())
        : [...prev, id.toString()]
    );
  };

  const toggleTag = (id) => {
    setPickedTags(prev =>
      prev.includes(id.toString())
        ? prev.filter(t => t !== id.toString())
        : [...prev, id.toString()]
    );
  };

  const handleYearSelect = (e) => setReleaseYear(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);

  const applyAllFilters = () => {
    const params = new URLSearchParams(searchParams);
    pickedGenres.length ? params.set('genres', pickedGenres.join(',')) : params.delete('genres');
    pickedTags.length ? params.set('tags', pickedTags.join(',')) : params.delete('tags');
    releaseYear
      ? params.set('dates', `${releaseYear}-01-01,${releaseYear}-12-31`)
      : params.delete('dates');
    sortOption ? params.set('ordering', sortOption) : params.delete('ordering');
    setSearchParams(params);
  };

  const clearFilters = () => {
    setPickedGenres([]);
    setPickedTags([]);
    setReleaseYear('');
    setSortOption('-rating');
    const params = new URLSearchParams(searchParams);
    ['genres', 'tags', 'dates', 'ordering'].forEach(key => params.delete(key));
    setSearchParams(params);
  };

  return (
    <div className="sidebar">
      <Card className="sidebar-card">
        <Card.Header className="filter-header">🎮 Filter Games</Card.Header>
        <Card.Body className="filter-body">
          <div className="filter-section">
            <h5>Sort By</h5>
            <Form.Select value={sortOption} onChange={handleSortChange}>
              <option value="-rating">Popularity ↓</option>
              <option value="rating">Popularity ↑</option>
              <option value="-released">Newest</option>
              <option value="released">Oldest</option>
              <option value="name">Name A-Z</option>
              <option value="-name">Name Z-A</option>
            </Form.Select>
          </div>

          <div className="filter-section">
            <h5>Release Year</h5>
            <Form.Select value={releaseYear} onChange={handleYearSelect}>
              <option value="">All</option>
              {Array.from({ length: currentYear - 1999 }, (_, i) => currentYear - i).map((yr) => (
                <option key={yr} value={yr}>{yr}</option>
              ))}
            </Form.Select>
          </div>

          <div className="filter-section">
            <h5>Genres</h5>
            <div className="scrollable-container">
              {genresList.map((genre) => (
                <Form.Check
                  key={genre.id}
                  type="checkbox"
                  label={genre.name}
                  id={`genre-${genre.id}`}
                  checked={pickedGenres.includes(genre.id.toString())}
                  onChange={() => toggleGenre(genre.id)}
                />
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h5>Tags</h5>
            <div className="scrollable-container">
              {tagsList.map((tag) => (
                <Form.Check
                  key={tag.id}
                  type="checkbox"
                  label={tag.name}
                  id={`tag-${tag.id}`}
                  checked={pickedTags.includes(tag.id.toString())}
                  onChange={() => toggleTag(tag.id)}
                />
              ))}
            </div>
          </div>

          <div className="d-grid gap-2 mt-3">
            <Button variant="primary" onClick={applyAllFilters}>Apply Filters</Button>
            <Button variant="outline-light" onClick={clearFilters}>Reset Filters</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Sidebar;
