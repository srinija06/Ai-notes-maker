import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, FileText, Calendar, User } from "lucide-react";

interface DashboardStats {
  totalQuizzes: number;
  averageScore: number;
  studyStreak: number;
  topicsStudied: number;
}

const mockStats: DashboardStats = {
  totalQuizzes: 24,
  averageScore: 87,
  studyStreak: 7,
  topicsStudied: 12
};

const recentActivity = [
  { id: 1, topic: "French Revolution", score: 92, date: "2 hours ago", type: "quiz" },
  { id: 2, topic: "Photosynthesis", score: 88, date: "1 day ago", type: "notes" },
  { id: 3, topic: "Algebra Basics", score: 76, date: "2 days ago", type: "quiz" },
  { id: 4, topic: "World War II", score: 94, date: "3 days ago", type: "quiz" },
];

const weakAreas = [
  { subject: "Mathematics", accuracy: 68, improvement: "+5%" },
  { subject: "Science", accuracy: 74, improvement: "+12%" },
  { subject: "History", accuracy: 89, improvement: "+3%" },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Quizzes</p>
                <p className="text-2xl font-bold text-primary">{mockStats.totalQuizzes}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold text-success">{mockStats.averageScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Study Streak</p>
                <p className="text-2xl font-bold text-warning">{mockStats.studyStreak} days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-info/10 to-info/5 border-info/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-info/20 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Topics Studied</p>
                <p className="text-2xl font-bold text-info">{mockStats.topicsStudied}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest learning sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      {activity.type === 'quiz' ? (
                        <FileText className="w-4 h-4 text-primary" />
                      ) : (
                        <BookOpen className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{activity.topic}</p>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={activity.score >= 80 ? "default" : activity.score >= 60 ? "secondary" : "destructive"}
                  >
                    {activity.score}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Analysis</CardTitle>
            <CardDescription>Areas for improvement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {weakAreas.map((area, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{area.subject}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-success">{area.improvement}</span>
                      <span className="text-sm font-medium">{area.accuracy}%</span>
                    </div>
                  </div>
                  <Progress 
                    value={area.accuracy} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}