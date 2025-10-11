import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, Clock, Music, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const tracks = [
  {
    id: 1,
    title: "The Monsoon Nights",
    subtitle: "Our breakthrough single",
    description: "A mystical journey through rain-soaked dimensions, where ancient tabla rhythms meet cosmic synthesizers and ethereal vocals paint pictures of interdimensional storms.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    duration: "3:47",
    status: "released",
    audioUrl: "/The Monsoon Nights.mp3" // Will be replaced with actual MP3 when available
  }
];

const upcomingTracks = [
  {
    title: "Cosmic Dreams",
    status: "Coming Soon",
    image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    icon: Play
  },
  {
    title: "Digital Rifts",
    status: "In Production",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    icon: Clock
  },
  {
    title: "Tabla Fusion",
    status: "Demo Stage",
    image: "https://images.unsplash.com/photo-1504198458649-3128b932f49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    icon: Music
  },
  {
    title: "Ethereal Voices",
    status: "Concept Phase",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    icon: Lightbulb
  }
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(227); // 3:47 in seconds
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

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);
      
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);
      
      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, []);

  return (
    <section id="music" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Our Music</h2>
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
                <img src={tracks[0].image} alt="The Monsoon Nights album artwork" className="w-full h-full object-cover" />
              </div>
            </div>
            
            {/* Track Info & Controls */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-3xl font-bold text-foreground mb-2" data-testid="featured-track-title">
                {tracks[0].title}
              </h3>
              <p className="text-lg text-muted-foreground mb-4">{tracks[0].subtitle}</p>
              <p className="text-muted-foreground mb-6 max-w-2xl" data-testid="featured-track-description">
                {tracks[0].description}
              </p>
              
              {/* Music Player Controls */}
              <Card className="bg-muted/50 border border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Button 
                      onClick={togglePlay}
                      className="w-12 h-12 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors p-0"
                      data-testid="play-pause-button"
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </Button>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                        <span data-testid="current-time">{formatTime(currentTime)}</span>
                        <span data-testid="duration">{formatTime(duration)}</span>
                      </div>
                      <div className="w-full bg-border rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-100" 
                          style={{ width: `${(currentTime / duration) * 100}%` }}
                          data-testid="progress-bar"
                        ></div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" data-testid="volume-button">
                      <Volume2 className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </Button>
                  </div>
                  
                  <div className="text-center mt-4">
                    <p className="text-sm text-muted-foreground">
                      Audio file will be available when provided
                    </p>
                  </div>
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
              <Card key={index} className="bg-card border border-border card-hover" data-testid={`upcoming-track-${track.title.toLowerCase().replace(' ', '-')}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={track.image} alt={`${track.title} artwork`} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground" data-testid={`track-title-${track.title.toLowerCase().replace(' ', '-')}`}>
                        {track.title}
                      </h4>
                      <p className="text-sm text-muted-foreground" data-testid={`track-status-${track.title.toLowerCase().replace(' ', '-')}`}>
                        {track.status}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary transition-colors" data-testid={`track-action-${track.title.toLowerCase().replace(' ', '-')}`}>
                      <Icon size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
