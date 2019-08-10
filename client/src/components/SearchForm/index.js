import React from "react";

function SearchForm(props) {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="search">Search:</label>
        <input
          onChange={props.handleInputChange}
          value={props.value}
          name="search"
          type="text"
          className="form-control"
          placeholder="Search For a Stock Symbol"
          id="search"
        />
        <br />
        <button onClick={props.handleFormMulti} className="btn btn-info">
          Search
        </button><span>   </span>
        <button onClick={props.handleDBAdd} className="btn btn-info">
          Add To List
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
