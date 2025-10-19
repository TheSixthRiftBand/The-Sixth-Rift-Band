import { Guitar, Mic, MicVocal, Piano, Music } from "lucide-react";

const bandMembers = [
  {
    name: "Vishwajit Kadam",
    role: "Lead Guitarist",
    instrument: "Guitar",
    icon: Guitar,
    color: "primary",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    description: "Master of electric melodies, Vishwajit creates the sonic landscapes that define our dimensional sound."
  },
  {
    name: "Shraddha Sheri",
    role: "Female Vocals",
    instrument: "Vocals",
    icon: Mic,
    color: "accent",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    description: "With ethereal vocals that transport listeners through dimensions, Shraddha is our vocal enchantress."
  },
  {
    name: "Rachit Hedau",
    role: "Male Vocalist",
    instrument: "Vocals",
    icon: MicVocal,
    color: "secondary",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    description: "Rachit's powerful vocals anchor our cosmic journey, bringing depth and emotion to every track."
  },
  {
    name: "Kanishka Malankar",
    role: "Keyboardist",
    instrument: "Keyboards",
    icon: Piano,
    color: "primary",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    description: "Kanishka weaves digital harmonies that open portals to new musical dimensions with every key press."
  },
  {
    name: "Arav Pawar",
    role: "Tabla Player",
    instrument: "Tabla",
    icon: Music,
    color: "accent",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    description: "Arav bridges ancient rhythms with cosmic beats, creating the heartbeat of our dimensional sound."
  }
  {
    name: "Lohit Raj",
    role: "Drums Player",
    instrument: "Drums",
    icon: Drums,
    color: "accent",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    description: "Arav bridges ancient rhythms with cosmic beats, creating the heartbeat of our dimensional sound."
  }
{
    name: "Vivasvan Verma",
    role: "Guitar Player 2",
    instrument: "Guitar",
    icon: Guitar,
    color: "accent",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    description: "Arav bridges ancient rhythms with cosmic beats, creating the heartbeat of our dimensional sound."
  }
];

export default function BandMembers() {
  return (
    <section id="band" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">The Rifters</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet the extraordinary young talents behind the dimensional soundscapes
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {bandMembers.map((member, index) => {
            const Icon = member.icon;
            const colorClass = member.color === 'primary' ? 'border-primary bg-primary/20 text-primary' : 
                              member.color === 'secondary' ? 'border-secondary bg-secondary/20 text-secondary' :
                              'border-accent bg-accent/20 text-accent';
            
            return (
              <div key={index} className="bg-card rounded-xl p-6 card-hover border border-border" data-testid={`member-card-${member.name.toLowerCase().replace(' ', '-')}`}>
                <div className={`w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 ${member.color === 'primary' ? 'border-primary' : member.color === 'secondary' ? 'border-secondary' : 'border-accent'}`}>
                  <img src={member.image} alt={`${member.name} portrait`} className="w-full h-full object-cover" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-foreground mb-1" data-testid={`member-name-${member.name.toLowerCase().replace(' ', '-')}`}>
                    {member.name}
                  </h3>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-3 ${colorClass}`}>
                    <Icon size={16} />
                    {member.role}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed" data-testid={`member-description-${member.name.toLowerCase().replace(' ', '-')}`}>
                    {member.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
