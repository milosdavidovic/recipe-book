import React, { ChangeEvent, KeyboardEvent } from "react";
import classes from "./SearchInput.module.scss";

interface SearchInputProps {
  value: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  placeholder,
  onChange,
  onSearch,
}) => {
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch?.();
    }
  };

  return (
    <div className={classes["search-input"]}>
      <input
        type="text"
        placeholder={placeholder ?? "Search"}
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        className={classes["input"]}
      />
      <button type="submit" className={classes["button"]} onClick={onSearch}>
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default SearchInput;
