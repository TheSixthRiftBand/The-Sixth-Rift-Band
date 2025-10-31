import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, SkipForward, Repeat, Shuffle, ArrowLeft, Calendar, Clock } from "lucide-react";

const tracksData = [
  {
    id: "cosmic-dreams",
    title: "Cosmic Dreams",
    artist: "The Sixth Rift",
    status: "Coming Soon",
    releaseDate: "December 2025",
    image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    duration: "4:12",
    badge: "New",
    badgeColor: "bg-green-500",
    description: "Cosmic Dreams takes you on an ethereal journey through the vastness of space. Combining ambient synthesizers with rhythmic tabla beats, this track creates a sonic landscape that transcends earthly boundaries. Experience the fusion of ancient Indian percussion with futuristic soundscapes as we explore the cosmic consciousness.",
    fullDescription: "This upcoming release represents a bold new direction in our sound. Drawing inspiration from both ancient spiritual traditions and modern electronic music, Cosmic Dreams weaves together layers of atmospheric pads, pulsing bass lines, and intricate tabla patterns. The track builds gradually, starting with a meditative intro before evolving into a hypnotic groove that carries listeners through different dimensions of sound. Features include live tabla recordings, modular synthesis, and field recordings from various sacred sites. Expected to be our most ambitious production yet.",
    lyrics: "Floating through the endless night\nStars align in cosmic light\nDreams unfold in space and time\nRhythms echo, so divine...",
    audioUrl: null,
  },
  {
    id: "digital-rifts",
    title: "Digital Rifts",
    artist: "The Sixth Rift",
    status: "In Production",
    releaseDate: "January 2026",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    duration: "5:30",
    badge: "Production",
    badgeColor: "bg-blue-500",
    description: "Digital Rifts explores the intersection between the digital and analog worlds. Heavy basslines meet intricate glitch patterns in this high-energy track that pushes the boundaries of electronic music. The tabla provides an organic counterpoint to the synthetic textures, creating a unique sonic tension.",
    fullDescription: "Currently in production, Digital Rifts is our most experimental work to date. This track explores the concept of digital consciousness and the spaces between reality and virtuality. We're incorporating cutting-edge sound design techniques, including granular synthesis, bit crushing, and spectral processing, alongside traditional tabla recordings. The composition features multiple movements, shifting from chaotic digital textures to moments of serene clarity. Production highlights include a custom-built Max/MSP patch for real-time sound manipulation and field recordings from technology centers around the world.",
    lyrics: "In the rifts between the code\nWhere the digital worlds explode\nFinding patterns in the noise\nHear the future's calling voice...",
    audioUrl: null,
  },
  {
    id: "tabla-fusion",
    title: "Tabla Fusion",
    artist: "The Sixth Rift",
    status: "Demo Stage",
    releaseDate: "February 2026",
    image: "https://images.unsplash.com/photo-1504198458649-3128b932f49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    duration: "3:55",
    badge: "Demo",
    badgeColor: "bg-yellow-500",
    description: "A pure celebration of the tabla's versatility. This track showcases the instrument in all its glory, blending traditional playing techniques with electronic processing. From delicate whispers to thunderous crescendos, Tabla Fusion demonstrates the full range of this ancient instrument in a modern context.",
    fullDescription: "Tabla Fusion is our homage to the rich tradition of Indian classical music, reimagined for the 21st century. The demo currently features extensive tabla solos, ranging from classical compositions (teental, jhaptal) to free-form improvisations. We're working with master tabla players to record authentic performances, which will then be layered with subtle electronic elements - reverbs, delays, and harmonizers - to create a bridge between tradition and innovation. The track will evolve through multiple sections, each highlighting different aspects of tabla technique: the resonant bass tones of the bayan, the sharp melodic strikes of the dayan, and the complex rhythmic patterns that have been passed down through generations.",
    lyrics: "Hands dance on ancient skin\nRhythms weave and intertwine\nEchoes from a distant past\nFused with futures yet to find...",
    audioUrl: null,
  },
  {
    id: "ethereal-voices",
    title: "Ethereal Voices",
    artist: "The Sixth Rift",
    status: "Concept Phase",
    releaseDate: "March 2026",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    duration: "4:45",
    badge: "Concept",
    badgeColor: "bg-purple-500",
    description: "Ethereal Voices weaves together vocal textures from different cultures and traditions. Layered harmonies float above a foundation of tabla and subtle electronics, creating a meditative soundscape that speaks to the universal human experience of music and connection.",
    fullDescription: "Still in the concept phase, Ethereal Voices aims to be our most collaborative work. We're reaching out to vocalists from various traditions - Indian classical singers, throat singers from Mongolia, gospel choirs, and electronic vocal processors - to create a tapestry of human voice. The concept centers on the idea that voice transcends language and culture, connecting us all through pure emotion and vibration. Our plan includes recording sessions in different locations, capturing not just the voices but also the acoustic character of sacred spaces. The tabla will serve as the rhythmic anchor, grounding these celestial voices with its earthy presence. We're currently in discussions with several vocalists and exploring different arrangement possibilities.",
    lyrics: "Voices rise from earth to sky\nHarmonies that never die\nEvery culture, every tongue\nIn this chorus, we are one...",
    audioUrl: null,
  },
];

export default function TrackDetail() {
  const params = useParams();
  const trackId = params.id;
  const track = tracksData.find(t => t.id === trackId);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (track?.audioUrl) {
      const audio = audioRef.current;
      if (audio) {
        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handlePause = () => setIsPlaying(false);
        const handlePlay = () => setIsPlaying(true);
        const handleEnded = () => setIsPlaying(false);

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
    }
  }, [track]);

  const togglePlay = () => {
    if (audioRef.current && track?.audioUrl) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (!timeInSeconds || isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!track) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Track Not Found</h1>
          <Link href="/">
            <Button data-testid="back-home-button">
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
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/#music">
            <Button variant="ghost" data-testid="back-button">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Music
            </Button>
          </Link>
        </div>
      </div>

      {/* Track Detail Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Album Art and Player */}
          <div>
            <div className="sticky top-8">
              {/* Album Artwork */}
              <div className="relative group mb-8">
                <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl"></div>
                <div className="relative rounded-3xl overflow-hidden border-4 border-primary/40 shadow-2xl">
                  <img
                    src={track.image}
                    alt={`${track.title} artwork`}
                    className="w-full aspect-square object-cover"
                    data-testid="track-image"
                  />
                  {isPlaying && track.audioUrl && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary animate-pulse"></div>
                    </>
                  )}
                  {!track.audioUrl && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge className={`${track.badgeColor} text-white text-lg px-6 py-2`}>
                        {track.status}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Music Player */}
              {track.audioUrl ? (
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <audio ref={audioRef} src={track.audioUrl} />
                    
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
                          className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-100 relative"
                          style={{
                            width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                          }}
                          data-testid="progress-bar"
                        >
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                      </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-center gap-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-foreground"
                        data-testid="shuffle-button"
                      >
                        <Shuffle className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-foreground"
                        data-testid="previous-button"
                      >
                        <SkipForward className="h-5 w-5 rotate-180" />
                      </Button>

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

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-foreground"
                        data-testid="next-button"
                      >
                        <SkipForward className="h-5 w-5" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-foreground"
                        data-testid="repeat-button"
                      >
                        <Repeat className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-card border-border">
                  <CardContent className="p-8 text-center">
                    <Badge className={`${track.badgeColor} text-white mb-4`}>
                      {track.status}
                    </Badge>
                    <p className="text-muted-foreground">
                      This track is currently {track.status.toLowerCase()}. Audio will be available upon release.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Right Column - Track Information */}
          <div>
            <Badge className={`${track.badgeColor} text-white mb-4`} data-testid="track-badge">
              {track.badge}
            </Badge>
            
            <h1 className="text-5xl font-bold text-foreground mb-4" data-testid="track-title">
              {track.title}
            </h1>
            
            <p className="text-2xl text-primary mb-6" data-testid="track-artist">
              {track.artist}
            </p>

            <div className="flex items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span data-testid="release-date">{track.releaseDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span data-testid="track-duration">{track.duration}</span>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">About This Track</h2>
                <p className="text-lg text-muted-foreground leading-relaxed" data-testid="track-description">
                  {track.description}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">The Story Behind</h2>
                <p className="text-muted-foreground leading-relaxed" data-testid="track-full-description">
                  {track.fullDescription}
                </p>
              </div>

              {track.lyrics && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Lyrics Preview</h2>
                  <Card className="bg-muted/30 border-border">
                    <CardContent className="p-6">
                      <pre className="text-muted-foreground font-serif whitespace-pre-wrap leading-relaxed" data-testid="track-lyrics">
                        {track.lyrics}
                      </pre>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
