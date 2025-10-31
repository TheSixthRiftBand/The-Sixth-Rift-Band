import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Play, Pause, Clock, Music, SkipForward, Repeat, Shuffle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const tracks = [
  {
    id: 1,
    title: "The Monsoon Nights",
    subtitle: "Our breakthrough single",
    description:
      "A mystical journey through rain-soaked dimensions, where ancient tabla rhythms meet cosmic synthesizers and ethereal vocals paint pictures of interdimensional storms.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    duration: "3:13",
    status: "released",
    audioUrl: "/The_Monsoon_Nights.mp3",
  },
];

const upcomingTracks = [
  {
    id: "cosmic-dreams",
    title: "Cosmic Dreams",
    artist: "The Sixth Rift",
    status: "Coming Soon",
    releaseDate: "December 2025",
    image:
      "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    duration: "4:12",
    badge: "New",
    badgeColor: "bg-green-500",
  },
  {
    id: "digital-rifts",
    title: "Digital Rifts",
    artist: "The Sixth Rift",
    status: "In Production",
    releaseDate: "January 2026",
    image:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    duration: "5:30",
    badge: "Production",
    badgeColor: "bg-blue-500",
  },
  {
    id: "tabla-fusion",
    title: "Tabla Fusion",
    artist: "The Sixth Rift",
    status: "Demo Stage",
    releaseDate: "February 2026",
    image:
      "https://images.unsplash.com/photo-1504198458649-3128b932f49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    duration: "3:55",
    badge: "Demo",
    badgeColor: "bg-yellow-500",
  },
  {
    id: "ethereal-voices",
    title: "Ethereal Voices",
    artist: "The Sixth Rift",
    status: "Concept Phase",
    releaseDate: "March 2026",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    duration: "4:45",
    badge: "Concept",
    badgeColor: "bg-purple-500",
  },
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(227);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const handlePrevious = () => {
    if (audioRef.current) {
      if (currentTime > 3) {
        // If more than 3 seconds in, restart current track
        audioRef.current.currentTime = 0;
      } else {
        // Otherwise go to previous track (for now just restart)
        audioRef.current.currentTime = 0;
      }
    }
  };

  const handleNext = () => {
    if (audioRef.current) {
      // For now, restart the track (will be extended when multiple tracks exist)
      audioRef.current.currentTime = 0;
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleRepeat = () => {
    const modes: Array<'off' | 'all' | 'one'> = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setRepeatMode(nextMode);
    
    if (audioRef.current) {
      audioRef.current.loop = nextMode === 'one';
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);
      const handlePause = () => setIsPlaying(false);
      const handlePlay = () => setIsPlaying(true);
      const handleEnded = () => {
        if (repeatMode === 'off') {
          setIsPlaying(false);
        } else if (repeatMode === 'all') {
          // When multiple tracks exist, this will play the next track
          audio.currentTime = 0;
          audio.play();
        }
        // 'one' mode is handled by audio.loop
      };

      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", updateDuration);
      audio.addEventListener("pause", handlePause);
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", updateDuration);
        audio.removeEventListener("pause", handlePause);
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [repeatMode]);

  return (
    <section id="music" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Our Music
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Journey through dimensions with our original compositions
          </p>
        </div>

        {/* Featured Track - Now Playing */}
        <div className="bg-gradient-to-br from-card via-card to-primary/5 rounded-3xl p-8 md:p-12 border border-border mb-16 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Album Artwork with Glow Effect */}
            <div className="flex-shrink-0 relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-2xl group-hover:bg-primary/30 transition-all duration-500"></div>
              <div className="relative w-64 h-64 rounded-2xl overflow-hidden border-4 border-primary/40 shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                <img
                  src={tracks[0].image}
                  alt="The Monsoon Nights album artwork"
                  className="w-full h-full object-cover"
                />
                {isPlaying && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary animate-pulse"></div>
                  </>
                )}
              </div>
            </div>

            {/* Track Info & Controls */}
            <div className="flex-1 w-full text-center lg:text-left">
              <Badge className="mb-4 bg-primary text-primary-foreground">
                {isPlaying ? "Now Playing" : "Play This Masterpiece"}
              </Badge>
              <h3
                className="text-4xl md:text-5xl font-bold text-foreground mb-3"
                data-testid="featured-track-title"
              >
                {tracks[0].title}
              </h3>
              <p className="text-xl text-primary mb-4">
                {tracks[0].subtitle}
              </p>
              <p
                className="text-muted-foreground mb-8 max-w-2xl text-lg leading-relaxed"
                data-testid="featured-track-description"
              >
                {tracks[0].description}
              </p>

              {/* Music Player Controls */}
              <Card className="bg-muted/30 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <audio ref={audioRef} src={tracks[0].audioUrl} />
                  
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <span data-testid="current-time" className="font-medium">
                        {formatTime(currentTime)}
                      </span>
                      <span data-testid="duration" className="font-medium">
                        {formatTime(duration)}
                      </span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2 overflow-hidden cursor-pointer group">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-100 relative group-hover:h-3"
                        style={{
                          width: `${(currentTime / duration) * 100}%`,
                        }}
                        data-testid="progress-bar"
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    </div>
                  </div>

                  {/* Control Buttons */}
                  <TooltipProvider>
                    <div className="flex items-center justify-center gap-4">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleShuffle}
                            className={`text-muted-foreground hover:text-foreground transition-colors ${isShuffled ? 'text-primary' : ''}`}
                            data-testid="shuffle-button"
                          >
                            <Shuffle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{isShuffled ? 'Shuffle is ON - Click to turn off' : 'Shuffle is OFF - Click to shuffle tracks'}</p>
                        </TooltipContent>
                      </Tooltip>
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handlePrevious}
                            className="text-muted-foreground hover:text-foreground"
                            data-testid="previous-button"
                          >
                            <SkipForward className="h-5 w-5 rotate-180" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Previous Track - Restart if over 3 seconds</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={togglePlay}
                            className="w-16 h-16 bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-full hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-primary/50 p-0"
                            data-testid="play-pause-button"
                          >
                            {isPlaying ? (
                              <Pause className="h-6 w-6" />
                            ) : (
                              <Play className="h-6 w-6" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{isPlaying ? 'Pause the track' : 'Play the track'}</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleNext}
                            className="text-muted-foreground hover:text-foreground"
                            data-testid="next-button"
                          >
                            <SkipForward className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Next Track - Skip to next song</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleRepeat}
                            className={`text-muted-foreground hover:text-foreground transition-colors ${repeatMode !== 'off' ? 'text-primary' : ''}`}
                            data-testid="repeat-button"
                          >
                            <Repeat className="h-4 w-4" />
                            {repeatMode === 'one' && (
                              <span className="absolute top-1 right-1 text-[10px] font-bold">1</span>
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {repeatMode === 'off' && 'Repeat: OFF - Click to repeat all tracks'}
                            {repeatMode === 'all' && 'Repeat: ALL - Click to repeat current track'}
                            {repeatMode === 'one' && 'Repeat: ONE - Click to turn off repeat'}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Upcoming Tracks Section */}
        <div className="mb-8">
          <h3 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Music className="h-8 w-8 text-primary" />
            Upcoming Releases
          </h3>
          <p className="text-muted-foreground text-lg mb-8">
            Get ready for these upcoming tracks from our creative journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingTracks.map((track, index) => (
            <Link key={index} href={`/track/${track.id}`}>
              <Card
                className="group bg-gradient-to-br from-card to-card/50 border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden card-hover hover:shadow-xl hover:shadow-primary/10 cursor-pointer"
                data-testid={`upcoming-track-${track.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <CardContent className="p-0">
                  <div className="flex items-center gap-6 p-6">
                  {/* Album Artwork */}
                  <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-border group-hover:border-primary/50 transition-all duration-300 shadow-lg transform group-hover:scale-105">
                      <img
                        src={track.image}
                        alt={`${track.title} artwork`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Badge 
                      className={`absolute -top-2 -right-2 ${track.badgeColor} text-white border-0 shadow-lg text-xs`}
                    >
                      {track.badge}
                    </Badge>
                  </div>

                  {/* Track Info */}
                  <div className="flex-1 min-w-0">
                    <h4
                      className="font-bold text-lg text-foreground mb-1 truncate group-hover:text-primary transition-colors"
                      data-testid={`track-title-${track.title.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {track.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {track.artist}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {track.duration}
                      </span>
                      <span>•</span>
                      <span
                        data-testid={`track-status-${track.title.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {track.releaseDate}
                      </span>
                    </div>
                  </div>

                  {/* Play Button */}
                  <Button
                    size="icon"
                    className="w-12 h-12 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100"
                    data-testid={`track-action-${track.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <Play className="h-5 w-5" />
                  </Button>
                </div>

                {/* Progress bar for upcoming tracks */}
                <div className="px-6 pb-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>{track.status}</span>
                    <span className="font-medium">{index === 0 ? "95%" : index === 1 ? "70%" : index === 2 ? "45%" : "20%"} Complete</span>
                  </div>
                  <div className="w-full bg-border/50 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full ${track.badgeColor} transition-all duration-500`}
                      style={{ width: index === 0 ? "95%" : index === 1 ? "70%" : index === 2 ? "45%" : "20%" }}
                    ></div>
                  </div>
                </div>
              </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
