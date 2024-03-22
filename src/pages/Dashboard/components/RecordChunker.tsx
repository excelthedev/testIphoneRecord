import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
import soundFile from "./test.mp3";
import PauseIcon from "../../../assets/icons/PauseIcon";
import PlayIcon from "../../../assets/icons/PlayIcon";

const AudioChunker = () => {
  const audioRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const waveSurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    waveSurfer.current = WaveSurfer.create({
      container: audioRef.current!,
      waveColor: "rgb(200, 0, 200)",
      progressColor: "rgb(100, 0, 100)",
      url: soundFile,
      height: 100,
      backend: "WebAudio",
    });

    // Initialize the Regions plugin
    const wsRegions = waveSurfer.current.registerPlugin(RegionsPlugin.create());

    // Give regions a random color when they are created
    const random = (min: number, max: number) =>
      Math.random() * (max - min) + min;
    const randomColor = () =>
      `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;

    // Create some regions at specific time ranges
    waveSurfer.current.on("dragstart", (e) => {
      console.log(e);
    });

    waveSurfer.current.on("decode", () => {
      // Regions
      wsRegions.addRegion({
        start: 0,
        end: 8,
        content: "Resize me",
        color: randomColor(),
        drag: false,
        resize: true,
      });
      wsRegions.addRegion({
        start: 9,
        end: 10,
        content: "Cramped region",
        color: randomColor(),
        minLength: 1,
        maxLength: 10,
      });
      wsRegions.addRegion({
        start: 12,
        end: 17,
        content: "Drag me",
        color: randomColor(),
        resize: false,
      });

      // Markers (zero-length regions)
      // wsRegions.addRegion({
      //   start: 19,
      //   content: "Marker",
      //   color: randomColor(),
      // });
      // wsRegions.addRegion({
      //   start: 20,
      //   content: "Second marker",
      //   color: randomColor(),
      // });
    });

    wsRegions.enableDragSelection({
      color: "rgba(255, 0, 0, 0.1)",
    });

    wsRegions.on("region-updated", (region) => {
      console.log(region);
      // region.play();
    });
    wsRegions.on("region-created", (region) => {
      const startTime = region.start;
      const endTime = region.end;

      // Calculate duration of chunk
      const duration = endTime - startTime;
    });

    // Loop a region on click
    // let loop = true;
    // // Toggle looping with a checkbox
    // document?.querySelector('input[type="checkbox"]')?.onClick = (e) => {
    //   loop = e.target.checked;
    // };

    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // let activeRegion: any = null;
      // wsRegions.on("region-in", (region) => {
      //   console.log("region-in", region);
      //   activeRegion = region;
      // });
      // wsRegions.on("region-out", (region) => {
      //   console.log("region-out", region);
      //   // if (activeRegion === region) {
      //   //   if (loop) {
      //   //     region.play();
      //   //   } else {
      //   //     activeRegion = null;
      //   //   }
      //   // }
      // });
      // wsRegions.on("region-clicked", (region, e) => {
      //   e.stopPropagation(); // prevent triggering a click on the waveform
      //   activeRegion = region;
      //   region.play();
      //   region.setOptions({ color: randomColor() });
      // });
      // Reset the active region when the user clicks anywhere in the waveform
      // ws.on("interaction", () => {
      //   activeRegion = null;
      // });
    }

    // // Update the zoom level on slider change
    // ws.once("decode", () => {
    //   document.querySelector('input[type="range"]').oninput = (e) => {
    //     const minPxPerSec = Number(e.target.value);
    //     ws.zoom(minPxPerSec);
    //   };
    // });
    return () => {
      if (waveSurfer.current) {
        waveSurfer.current.destroy();
        waveSurfer.current = null;
      }
    };
  }, []);

  const togglePlayPause = () => {
    if (waveSurfer.current) {
      if (isPlaying) {
        waveSurfer.current.pause();
      } else {
        waveSurfer.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  return (
    <div className="border-4 p-4 w-full">
      <button onClick={togglePlayPause} className="">
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <div ref={audioRef} className=" w-full cursor-pointer"></div>
    </div>
  );
};

export default AudioChunker;
