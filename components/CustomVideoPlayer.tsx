import { useRef, useState } from 'react';
import Image from 'next/image';

interface CustomVideoPlayerProps {
    src: string;
    title: string;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ src, title }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const currentTime = videoRef.current.currentTime;
            const duration = videoRef.current.duration;
            setProgress((currentTime / duration) * 100);
        }
    };

    return (
        <div className="videoContainer">
            <video
                ref={videoRef}
                src={src}
                className="videoPlayer"
                onTimeUpdate={handleTimeUpdate}
            />
            <div className="controls">
                <button className="playPauseButton" onClick={togglePlayPause}>
                    {isPlaying ? <Image src={"/pause.png"} width={25} height={25} alt='pause'/> : <Image src={"/play.png"} width={25} height={25} alt='play'/>}
                </button>
                <div className="progressBarContainer">
                    <div className="progressBar" style={{ width: `${progress}%` }}></div>
                </div>
                <span className="videoTitle">{title}</span>
            </div>
        </div>
    );
};

export default CustomVideoPlayer;
