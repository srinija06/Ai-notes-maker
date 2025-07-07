import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, BookmarkMinus, BookOpen, List } from "lucide-react";
import { cn } from "@/lib/utils";

interface Note {
  id: string;
  title: string;
  content: string;
  keyPoints: string[];
  isBookmarked: boolean;
}

const sampleNotes: Note[] = [
  {
    id: "1",
    title: "Photosynthesis Process",
    content: "Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugar.",
    keyPoints: [
      "Occurs in chloroplasts of plant cells",
      "Requires sunlight, water, and CO2",
      "Produces glucose and oxygen",
      "Two main stages: light-dependent and light-independent reactions"
    ],
    isBookmarked: false
  },
  {
    id: "2", 
    title: "French Revolution Timeline",
    content: "The French Revolution (1789-1799) was a period of radical political and societal change in France that had a lasting impact on French history.",
    keyPoints: [
      "Started in 1789 with financial crisis",
      "Storming of Bastille on July 14, 1789",
      "Declaration of Rights of Man and Citizen",
      "Reign of Terror (1793-1794)",
      "Napoleon's rise to power"
    ],
    isBookmarked: true
  }
];

interface NotesDisplayProps {
  topic?: string;
}

export function NotesDisplay({ topic = "Generated Notes" }: NotesDisplayProps) {
  const [notes, setNotes] = useState<Note[]>(sampleNotes);
  const [viewMode, setViewMode] = useState<"list" | "mindmap">("list");

  const toggleBookmark = (noteId: string) => {
    setNotes(prev => prev.map(note => 
      note.id === noteId 
        ? { ...note, isBookmarked: !note.isBookmarked }
        : note
    ));
  };

  const MindMapView = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5" />
          <span>Mind Map View</span>
        </CardTitle>
        <CardDescription>Visual representation of key concepts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-6 p-6">
          {/* Central Topic */}
          <div className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground px-6 py-3 rounded-xl text-lg font-semibold shadow-lg">
            {topic}
          </div>
          
          {/* Branches */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {notes.map((note, index) => (
              <div key={note.id} className="relative">
                {/* Connection Line */}
                <div className={cn(
                  "absolute top-0 w-px bg-border h-6 left-1/2 transform -translate-x-1/2",
                  index < 2 ? "-translate-y-6" : "translate-y-full"
                )} />
                
                <Card className="bg-gradient-to-br from-accent/50 to-accent/20 border-accent">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-accent-foreground mb-2">{note.title}</h4>
                    <ul className="space-y-1">
                      {note.keyPoints.slice(0, 3).map((point, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ListView = () => (
    <div className="space-y-6">
      {notes.map((note) => (
        <Card key={note.id} className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span>{note.title}</span>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleBookmark(note.id)}
                className={cn(
                  "transition-colors",
                  note.isBookmarked ? "text-warning" : "text-muted-foreground"
                )}
              >
                {note.isBookmarked ? (
                  <BookmarkMinus className="w-4 h-4" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">{note.content}</p>
            
            <div>
              <h4 className="font-semibold mb-3 flex items-center space-x-2">
                <List className="w-4 h-4" />
                <span>Key Points</span>
              </h4>
              <div className="grid gap-2">
                {note.keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-accent/30 rounded-lg">
                    <Badge variant="outline" className="mt-0.5 flex-shrink-0">
                      {index + 1}
                    </Badge>
                    <span className="text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* View Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Study Notes: {topic}</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4 mr-2" />
                List View
              </Button>
              <Button
                variant={viewMode === "mindmap" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("mindmap")}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Mind Map
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {viewMode === "list" ? <ListView /> : <MindMapView />}
    </div>
  );
}