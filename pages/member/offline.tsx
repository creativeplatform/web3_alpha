import React from "react";
import Container from "@material-ui/core/Container";
import Skeleton from "@material-ui/lab/Skeleton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import styles from "../../components/layout.module.css";
import Link from "next/link";

export default function Offline() {
  return (
    <div className={styles.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={styles.title}>
            FansOnly
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className={styles.videoContainer}>
          <Skeleton variant="rect" height="640px"></Skeleton>
          <Typography variant="h6">
            Stream is still offline
          </Typography>
          <Link href={{pathname: "/member"}}>Back to videos</Link>
      </Container>
    </div>
  );
}