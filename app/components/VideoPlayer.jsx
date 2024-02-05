"use client";

import React, { useRef, useState, useEffect } from "react";
import { getInitialProgress } from "../server-actions/getInitialProgress";
import { createInitialProgress } from "../server-actions/createInitialProgress";
import { updateProgressOnServer } from "../server-actions/updateProgressOnServer";

const VideoPlayer = ({ video }) => {
  const videoUrl = video[0].url;
  const duration = video[0].duration;
  const videoId = video[0].id;
  const [progressTime, setProgressTime] = useState(0);
  const hasMounted = useRef(false);
  const playerRef = useRef(null);

  const fetchVideoProgress = async () => {
    try {
      const { progressData } = await getInitialProgress(videoId);

      if (progressData.length !== 0) {
        setProgressTime(progressData[0].progress_time);
        console.log(progressTime, " is progs time");
      } else {
        await createInitialProgress(videoId, duration);
        return;
      }
    } catch (error) {
      console.error("Error fetching initial progress:", error);
    }
  };

  useEffect(() => {
    if (hasMounted.current) {
      // Skip fetchVideoProgress on initial mount
      fetchVideoProgress();
    } else {
      hasMounted.current = true;
    }
  }, [videoId, duration]); // Depend on videoId and duration

  const onPlayerReady = (event) => {
    event.target.seekTo(progressTime);
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      const currentTime = playerRef.current.getCurrentTime();
      updateProgressOnServer(videoId, currentTime);
    }
  };

  return (
    <div className="mx-auto w-full">
      <h2>{progressTime}</h2>
      <div className="items-center justify-center mt-2">
        <iframe
          title="YouTube Video Player"
          type="text/html"
          width="70%"
          height="420px"
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}`}
          frameBorder="0"
          allowFullScreen
          ref={playerRef}
          onLoad={onPlayerReady}
          onStateChange={onPlayerStateChange}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
