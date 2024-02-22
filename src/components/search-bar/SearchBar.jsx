const SearchBar = () => {
  return (
    <>
      <div className="d-flex py-4 justify-content-between">
        <input
          placeholder="Enter Search here"
          className="form-control d-block"
        />
        <select className="d-block">
          <option>Default Sorting</option>
        </select>
      </div>
    </>
  );
};

export default SearchBar;
