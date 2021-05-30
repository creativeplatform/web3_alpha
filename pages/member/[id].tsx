import React from "react";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { getStreamStatus } from "../../utils/apiFactory";
import styles from "../../components/layout.module.css";
import videojs from "video.js";
import "videojs-contrib-hls";
import "videojs-contrib-quality-levels";
import "videojs-hls-quality-selector";
import "video.js/dist/video-js.min.css";
import Router from "next/router";
import { useAppContext } from "../../utils/context";

function App({ playbackId, title, author }) {
  const {isMember} = useAppContext();
  const [videoEl, setVideoEl] = React.useState(null);

  const onVideo = React.useCallback((el) => {
    setVideoEl(el);
  }, []);

  React.useEffect(() => {
    if(!isMember){
      Router.push('/')
    }

    if (videoEl == null) return;

    if (playbackId) {
      const player = videojs(videoEl, {
        autoplay: true,
        controls: true,
        fluid: true,
        fill: true,
        responsive: true,
        aspectRatio: "16:9",
        sources: [
          {
            src: `https://cdn.livepeer.com/hls/${playbackId}/index.m3u8`,
          },
        ],
      });

      player.hlsQualitySelector();

      player.on("error", () => {
        player.src(`https://cdn.livepeer.com/hls/${playbackId}/index.m3u8`);
      });

      return () => {
        player.dispose();
      };
    }
  }, [videoEl]);

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
        <div data-vjs-player>
          <video id="video" ref={onVideo} className="video-js" controls />
        </div>
        <Typography variant="h6">{title}</Typography>
        <Typography>By {author}</Typography>
      </Container>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await getStreamStatus(id);
  return {
    props: {
      playbackId: res.data.playbackId,
      title: res.data.name,
      author: res.data.createdByTokenName,
    },
  };
}

export default App;
