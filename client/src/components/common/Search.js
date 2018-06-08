import React from "react";
import PropTypes from "prop-types";

const Search = ({ onChange, value }) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className="fas fa-search" />
        </span>
      </div>
      <input
        className="form-control form-control-lg"
        type="text"
        placeholder="Search for any product"
        name="search"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

Search.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default Search;
