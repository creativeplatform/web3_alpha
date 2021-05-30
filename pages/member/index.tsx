import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { getStreams } from "../../utils/apiFactory";
import Link from "next/link";
import styles from "../../components/layout.module.css";
import Router from "next/router";
import { useAppContext } from "../../utils/context";

function Member({ streams, isLoading }) {
  const {isMember, setMember} = useAppContext();

  useEffect(() => {
    if (!isMember) {
      Router.push("/");
    }
  });

  //   const openVideo = (videoId: string) => {
  //       console.log(videoId);
  //       onClick={(e)=> {openVideo(stream.id);}}
  //   }
  const onImgErr = (e) => {
    e.target.onerror = null;
    e.target.src = "/images/logo.png";
  };

  const logout = () => {
    localStorage.clear();
    setMember(false);
    Router.push("/");
  };

  return (
    <div className={styles.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={styles.title}>
            FansOnly
          </Typography>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container className={styles.gridContainer}>
        <GridList cellHeight="auto" spacing={24} cols={3}>
          <GridListTile key="Subheader" cols={3} style={{ height: "auto" }}>
            <Typography variant="h6" className={styles.title}>
              Trending
            </Typography>
          </GridListTile>
          {!isLoading ? (
            streams.map((stream) => (
              <GridListTile key={stream.playbackId}>
                <Link
                  href={
                    stream.isActive
                      ? {
                          pathname: "/member/[id]",
                          query: {
                            id: stream.id,
                          },
                        }
                      : { pathname: "/member/offline" }
                  }
                >
                  <div>
                    <img
                      src={"https://picsum.photos/400/200?" + stream.playbackId}
                      onError={onImgErr}
                      alt={stream.playbackId}
                    />
                    {stream.isActive ? (
                      <span className={styles.streamActive}>Live</span>
                    ) : (
                      <span className={styles.streamInactive}>Offline</span>
                    )}
                    <GridListTileBar
                      title={stream.name}
                      subtitle={<span>by: {stream.createdByTokenName}</span>}
                    />
                  </div>
                </Link>
              </GridListTile>
            ))
          ) : (
            <p>Loading ...</p>
          )}
        </GridList>
      </Container>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await getStreams();
  return { props: { streams: res.data, isLoading: false } };
}

export default Member;
