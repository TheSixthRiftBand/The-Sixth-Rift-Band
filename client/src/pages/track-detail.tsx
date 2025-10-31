import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

const trackData = {
  "cosmic-dreams": {
    id: 1,
    title: "Cosmic Dreams",
    subtitle: "A Journey Through the Stars",
    description:
      "Embark on an ethereal voyage through the cosmos with 'Cosmic Dreams.' This track blends ambient soundscapes with pulsating electronic beats, creating a sonic experience that transports listeners beyond the earthly realm. Featuring layered synthesizers, celestial pads, and intricate percussion patterns that mirror the rhythm of distant galaxies.",
    fullDescription:
      "Cosmic Dreams represents our exploration into the vastness of space through sound. We've incorporated actual NASA recordings of cosmic phenomena, processed through our custom synthesizers to create an otherworldly atmosphere. The track builds gradually, starting with sparse, contemplative passages before erupting into a full cosmic symphony. This piece took over six months to complete, with countless hours spent perfecting the intricate layers of sound that represent different celestial bodies and cosmic events.",
    image:
      "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    status: "Coming Soon",
    releaseDate: "Spring 2025",
    genre: "Ambient Electronic",
    duration: "5:23",
    audioUrl: "",
  },
  "digital-rifts": {
    id: 2,
    title: "Digital Rifts",
    subtitle: "Where Technology Meets Soul",
    description:
      "Digital Rifts explores the intersection of human emotion and digital technology. With glitchy beats, distorted vocals, and unexpected time signature changes, this track challenges conventional music structures while maintaining an emotional core that speaks to the human experience in the digital age.",
    fullDescription:
      "This track emerged from our fascination with the glitch aesthetic and how technical 'errors' can become beautiful artistic statements. We've used circuit-bent instruments, corrupted audio files, and intentionally 'broken' plugins to create a soundscape that's both chaotic and controlled. The vocals are processed through multiple layers of digital manipulation, representing the fragmentation of identity in our increasingly digital world. Production is nearly complete, and we're currently in the mixing phase.",
    image:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    status: "In Production",
    releaseDate: "Summer 2025",
    genre: "Experimental Electronic",
    duration: "4:47",
    audioUrl: "",
  },
  "tabla-fusion": {
    id: 3,
    title: "Tabla Fusion",
    subtitle: "East Meets Electronic",
    description:
      "A groundbreaking fusion of traditional Indian classical rhythms and modern electronic production. Featuring authentic tabla performances intertwined with deep bass lines and atmospheric synths, this track bridges centuries of musical tradition with cutting-edge production techniques.",
    fullDescription:
      "Tabla Fusion is our homage to Indian classical music and its profound influence on our sound. We collaborated with master tabla player Pandit Ravi Shankar Jr. to capture authentic performances, which we then wove into our electronic framework. The track respects the traditional rhythmic cycles (taals) while pushing them into new territory with electronic augmentation. Currently in demo stage, we're experimenting with different arrangements to find the perfect balance between tradition and innovation.",
    image:
      "https://images.unsplash.com/photo-1504198458649-3128b932f49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    status: "Demo Stage",
    releaseDate: "Fall 2025",
    genre: "World Fusion Electronic",
    duration: "6:12",
    audioUrl: "",
  },
  "ethereal-voices": {
    id: 4,
    title: "Ethereal Voices",
    subtitle: "Voices from Another Dimension",
    description:
      "Ethereal Voices features haunting vocal harmonies processed through experimental techniques to create sounds that seem to originate from another dimension. Layered with crystalline synths and deep sub-bass, this track creates an immersive sonic environment that's both beautiful and unsettling.",
    fullDescription:
      "This concept piece explores the human voice as a purely sonic instrument, divorced from language and meaning. We've recorded vocalists from various cultural backgrounds, then processed their performances through spectral manipulation, granular synthesis, and custom reverb algorithms to create something entirely new. The result is a chorus of 'voices' that sound simultaneously human and alien. Still in the concept phase, we're developing the technological framework needed to realize this ambitious vision.",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    status: "Concept Phase",
    releaseDate: "Winter 2025",
    genre: "Experimental Ambient",
    duration: "7:45",
    audioUrl: "",
  },
};

export default function TrackDetail() {
  const params = useParams();
  const trackSlug = params.slug as string;
  const track = trackData[trackSlug as keyof typeof trackData];

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current && track.audioUrl) {
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
    if (audio && track.audioUrl) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);
      const handleEnded = () => setIsPlaying(false);

      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", updateDuration);
      audio.addEventListener("ended", handleEnded);

      audio.volume = volume / 100;

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", updateDuration);
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [volume, track.audioUrl]);

  if (!track) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Track Not Found
          </h1>
          <Link href="/">
            <Button className="bg-primary text-primary-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/">
          <Button
            variant="ghost"
            className="mb-8 text-muted-foreground hover:text-foreground"
            data-testid="back-button"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="bg-card rounded-2xl p-8 border border-border">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="flex flex-col">
              <div className="w-full aspect-square rounded-xl overflow-hidden border-4 border-primary/30 mb-6">
                <img
                  src={track.image}
                  alt={`${track.title} artwork`}
                  className="w-full h-full object-cover"
                  data-testid="track-image"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <p className="text-lg font-semibold text-foreground" data-testid="track-status">
                    {track.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Expected Release
                  </p>
                  <p className="text-lg font-semibold text-foreground" data-testid="track-release-date">
                    {track.releaseDate}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Genre</p>
                  <p className="text-lg font-semibold text-foreground" data-testid="track-genre">
                    {track.genre}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Duration</p>
                  <p className="text-lg font-semibold text-foreground" data-testid="track-duration">
                    {track.duration}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="mb-6">
                <h1
                  className="text-4xl md:text-5xl font-bold gradient-text mb-2"
                  data-testid="track-title"
                >
                  {track.title}
                </h1>
                <p className="text-xl text-muted-foreground mb-4" data-testid="track-subtitle">
                  {track.subtitle}
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  About This Track
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4" data-testid="track-description">
                  {track.description}
                </p>
                <p className="text-muted-foreground leading-relaxed" data-testid="track-full-description">
                  {track.fullDescription}
                </p>
              </div>
            </div>
          </div>

          {track.audioUrl ? (
            <Card className="bg-muted/50 border border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
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
                      <span data-testid="duration-time">
                        {formatTime(duration)}
                      </span>
                    </div>
                    <Slider
                      value={[
                        duration > 0 ? (currentTime / duration) * 100 : 0,
                      ]}
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

                <audio
                  ref={audioRef}
                  src={track.audioUrl}
                  preload="metadata"
                />
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-muted/50 border border-border">
              <CardContent className="p-8 text-center">
                <Play className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">
                  Audio preview coming soon
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  This track is currently {track.status.toLowerCase()} and will be
                  available for preview closer to the release date.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
