import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import "./SearchBarLayout.css";

const SearchBar = ({ className = "" }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const submitSearch = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed.length > 0) {
      navigate(`/?search=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleTyping = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);

    if (inputValue.trim().length > 0) {
      const debounce = setTimeout(() => {
        navigate(`/?search=${encodeURIComponent(inputValue.trim())}`);
      }, 500);
      return () => clearTimeout(debounce);
    }
  };

  return (
    <Form className={`search-bar ${className}`} onSubmit={submitSearch}>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Search games..."
          value={query}
          onChange={handleTyping}
        />
        <InputGroup.Text
          onClick={submitSearch}
          className="search-icon-container"
          role="button"
        >
          <FaSearch />
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;
