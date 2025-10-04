import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookCopy, BrainCircuit, Target } from 'lucide-react';

interface DashboardStatsProps {
  totalWords: number;
  wordsToReview: number;
  wordsLearned: number;
}

export function DashboardStats({ totalWords, wordsToReview, wordsLearned }: DashboardStatsProps) {
  const stats = [
    { title: 'Words to Review', value: wordsToReview, icon: BrainCircuit, iconClass: 'text-accent' },
    { title: 'Words Learned', value: wordsLearned, icon: Target, iconClass: 'text-primary' },
    { title: 'Total Words', value: totalWords, icon: BookCopy, iconClass: 'text-muted-foreground' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.iconClass}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
