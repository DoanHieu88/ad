import * as React from "react";
import { usePagination } from "@material-ui/lab/Pagination";
import { styled } from "@mui/material/styles";

const List = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",

  "& li": {
    paddingInline: "10px",
  },

  "& li>button": {
    backgroundColor: "#fff",
    border: "none",
    cursor: "pointer",
    width: 25,
    height: 25,
  },

  "& li>button:disabled": {
    cursor: "default",
  },
  "& li:first-child": {
    paddingRight: "45px",
  },

  "& li:first-child>button , & li:last-child>button": {
    textTransform: "capitalize",
  },

  "& li>button.active": {
    backgroundColor: "red",
    borderRadius: "50%",
  },
});

export default function UsePagination({ count, page, setPage }) {
  const { items } = usePagination({
    count,
    page,
  });

  return (
    <nav>
      <List>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "…";
          } else if (type === "page") {
            children = (
              <button
                type="button"
                className={selected ? "active" : ""}
                style={{
                  fontWeight: selected ? "bold" : undefined,
                }}
                {...item}
                onClick={() => setPage(page)}
              >
                {page}
              </button>
            );
          } else {
            children = (
              <button type="button" {...item}>
                {type}
              </button>
            );
          }

          return (
            <li
              key={index}
              onClick={() => {
                setPage(page);
              }}
            >
              {children}
            </li>
          );
        })}
      </List>
    </nav>
  );
}
