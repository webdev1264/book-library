import { useDispatch, useSelector } from "react-redux";
import {
  selectTitleFilter,
  setTitleFilter,
  resetFilter,
} from "../../redux/slices/filterSlice";
import "./Filter.css";

const Filter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };

  const handleResetFilters = () => {
    dispatch(resetFilter());
  };

  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by title..."
            value={titleFilter}
            onChange={handleTitleFilterChange}
          />
          <button type="button" onClick={handleResetFilters}>
            Reset Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
