import PropTypes from "prop-types";
const Search = ({ searchTag, setSearchTag }) => {
  const handleSearchChange = (e) => {
    setSearchTag(e.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by Tag eg. 'Sports', 'Nature', 'Food'"
        value={searchTag}
        onChange={handleSearchChange}
      />
    </div>
  );
};

Search.propTypes = {
  searchTag: PropTypes.string.isRequired,
  setSearchTag: PropTypes.func.isRequired,
};

export default Search;
