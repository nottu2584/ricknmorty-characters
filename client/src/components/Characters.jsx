import { default as React, useEffect, useState } from "react";
import { Grid, Loader, Pagination } from "./";
import { createUseStyles } from "react-jss";
import UserService from "../services/user.service";

const useStyles = createUseStyles({
  characters: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100%",
  },
});

const Characters = () => {
  const [content, setContent] = useState("");
  const [characters, setCharacters] = useState();
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const classes = useStyles();

  useEffect(() => {
    setLoading(true);
    UserService.getCharacters()
      .then(
        (res) => {
          setCharacters(res.data.results);
          setPages(res.data.info.pages);
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setContent(_content);
        }
      )
      .then(setLoading(false));
  }, [page]);

  return (
    <div className={classes.characters}>
      {!content ? (
        !loading ? (
          <>
            <Grid characters={characters}></Grid>
            <Pagination
              page={page}
              pages={pages}
              setPage={setPage}
            ></Pagination>
          </>
        ) : (
          <Loader></Loader>
        )
      ) : (
        { content }
      )}
    </div>
  );
};

export default Characters;
