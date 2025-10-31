import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, Clock, Music, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

const tracks = [
  {
    id: 1,
    title: "The Monsoon Nights",
    subtitle: "Our breakthrough single",
    description:
      "A mystical journey through rain-soaked dimensions, where ancient tabla rhythms meet cosmic synthesizers and ethereal vocals paint pictures of interdimensional storms.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    duration: "3:47",
    status: "released",
    audioUrl: `${window.location.origin}/attached_assets/The_Monsoon_Nights.mp3`,
  },
];

const upcomingTracks = [
  {
    title: "Cosmic Dreams",
    slug: "cosmic-dreams",
    status: "Coming Soon",
    image:
      "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    icon: Play,
  },
  {
    title: "Digital Rifts",
    slug: "digital-rifts",
    status: "In Production",
    image:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    icon: Clock,
  },
  {
    title: "Tabla Fusion",
    slug: "tabla-fusion",
    status: "Demo Stage",
    image:
      "https://images.unsplash.com/photo-1504198458649-3128b932f49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    icon: Music,
  },
  {
    title: "Ethereal Voices",
    slug: "ethereal-voices",
    status: "Concept Phase",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    icon: Lightbulb,
  },
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      const newTime = (value[0] / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume / 100;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds === 0) {
      return "0:00";
    }
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => {
        if (audio.duration && !isNaN(audio.duration)) {
          setDuration(audio.duration);
        }
      };
      const handleEnded = () => setIsPlaying(false);
      const handleCanPlay = () => {
        if (audio.duration && !isNaN(audio.duration)) {
          setDuration(audio.duration);
        }
      };
      const handleError = (e: Event) => {
        console.error("Audio loading error:", e);
        setIsPlaying(false);
      };

      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", updateDuration);
      audio.addEventListener("canplay", handleCanPlay);
      audio.addEventListener("durationchange", updateDuration);
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("error", handleError);
      
      // Set initial volume
      audio.volume = volume / 100;
      
      // Prevent autoplay - ensure audio is paused on mount
      audio.pause();
      setIsPlaying(false);

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", updateDuration);
        audio.removeEventListener("canplay", handleCanPlay);
        audio.removeEventListener("durationchange", updateDuration);
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("error", handleError);
      };
    }
  }, [volume]);

  return (
    <section id="music" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Our Music
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Journey through dimensions with our original compositions
          </p>
        </div>

        {/* Featured Track */}
        <div className="bg-card rounded-2xl p-8 border border-border mb-12 music-wave">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Album Artwork */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 rounded-xl overflow-hidden border-4 border-primary/30">
                <img
                  src={tracks[0].image}
                  alt="The Monsoon Nights album artwork"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Track Info & Controls */}
            <div className="flex-1 text-center lg:text-left">
              <h3
                className="text-3xl font-bold text-foreground mb-2"
                data-testid="featured-track-title"
              >
                {tracks[0].title}
              </h3>
              <p className="text-lg text-muted-foreground mb-4">
                {tracks[0].subtitle}
              </p>
              <p
                className="text-muted-foreground mb-6 max-w-2xl"
                data-testid="featured-track-description"
              >
                {tracks[0].description}
              </p>

              {/* Music Player Controls */}
              <Card className="bg-muted/50 border border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Button
                      onClick={togglePlay}
                      className="w-12 h-12 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors p-0 flex items-center justify-center"
                      data-testid="play-pause-button"
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5 ml-0.5" />
                      )}
                    </Button>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                        <span data-testid="current-time">
                          {formatTime(currentTime)}
                        </span>
                        <span data-testid="duration">
                          {formatTime(duration)}
                        </span>
                      </div>
                      <Slider
                        value={[duration > 0 ? (currentTime / duration) * 100 : 0]}
                        onValueChange={handleSeek}
                        max={100}
                        step={0.1}
                        className="cursor-pointer"
                        data-testid="seek-slider"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleMute}
                        data-testid="volume-button"
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        ) : (
                          <Volume2 className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        )}
                      </Button>
                      <Slider
                        value={[isMuted ? 0 : volume]}
                        onValueChange={handleVolumeChange}
                        max={100}
                        step={1}
                        className="w-24"
                        data-testid="volume-slider"
                      />
                    </div>
                  </div>

                  {/* Hidden Audio Element */}
                  <audio
                    ref={audioRef}
                    src={tracks[0].audioUrl}
                    preload="auto"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Other Tracks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingTracks.map((track, index) => {
            const Icon = track.icon;
            return (
              <Link key={index} href={`/track/${track.slug}`}>
                <Card
                  className="bg-card border border-border card-hover cursor-pointer"
                  data-testid={`upcoming-track-${track.title.toLowerCase().replace(" ", "-")}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={track.image}
                          alt={`${track.title} artwork`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4
                          className="font-semibold text-foreground"
                          data-testid={`track-title-${track.title.toLowerCase().replace(" ", "-")}`}
                        >
                          {track.title}
                        </h4>
                        <p
                          className="text-sm text-muted-foreground"
                          data-testid={`track-status-${track.title.toLowerCase().replace(" ", "-")}`}
                        >
                          {track.status}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        data-testid={`track-action-${track.title.toLowerCase().replace(" ", "-")}`}
                      >
                        <Icon size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
