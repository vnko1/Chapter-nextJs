import { FC } from "react";
import cn from "classnames";

import TextField from "../TextField/TextField";
import { SearchFieldProps } from "./SearchField.type";
import "./SearchField.scss";

const SearchField: FC<SearchFieldProps> = ({ className, ...props }) => {
  return <TextField className={cn("search-field", className)} {...props} />;
};

export default SearchField;
