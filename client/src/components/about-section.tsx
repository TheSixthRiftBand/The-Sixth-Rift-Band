import { Star, Rocket, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const achievements = [
  { label: "Songs Released", value: "1" },
  { label: "Average Age", value: "13" },
  { label: "Months Creating", value: "6" },
  { label: "Songs in Works", value: "2" }
];

const highlights = [
  {
    icon: Star,
    title: "Young Prodigies",
    description: "At just average of 13 years old, each member of The Sixth Rift brings exceptional talent and passion. We believe age is just a number when it comes to creating meaningful music.",
    color: "primary"
  },
  {
    icon: Rocket,
    title: "Musical Innovation",
    description: "We blend traditional Indian instruments like tabla with modern synthesizers and vocals, creating a unique sound that transcends dimensional boundaries.",
    color: "secondary"
  },
  {
    icon: Heart,
    title: "Growing Together",
    description: "Our journey has just begun. With 'The Monsoon Nights' as our first step into the music world, we're excited to explore new dimensions of sound and share our vision with the world.",
    color: "accent"
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Our Story</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Five young souls united by music, creating magic beyond their years
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="rounded-2xl overflow-hidden border-4 border-primary/30">
              <img 
                src="https://images.unsplash.com/photo-1588032786045-59cefda005c0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&fm=jpg&q=60&w=3000" 
                alt="The Sixth Rift band photo" 
                className="w-full h-auto"
                data-testid="band-photo"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              const colorClass = highlight.color === 'primary' ? 'bg-primary/20 text-primary' :
                                highlight.color === 'secondary' ? 'bg-secondary/20 text-secondary' :
                                'bg-accent/20 text-accent';
              
              return (
                <Card key={index} className="bg-card border border-border" data-testid={`highlight-${highlight.title.toLowerCase().replace(' ', '-')}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClass}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{highlight.title}</h3>
                    </div>
                    <p className="text-muted-foreground">
                      {highlight.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Achievement Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center" data-testid={`stat-${achievement.label.toLowerCase().replace(' ', '-')}`}>
              <div className="text-3xl font-bold gradient-text mb-2" data-testid={`stat-value-${achievement.label.toLowerCase().replace(' ', '-')}`}>
                {achievement.value}
              </div>
              <div className="text-muted-foreground" data-testid={`stat-label-${achievement.label.toLowerCase().replace(' ', '-')}`}>
                {achievement.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
