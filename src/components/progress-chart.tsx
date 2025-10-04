'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Skeleton } from './ui/skeleton';

const chartConfig = {
  words: {
    label: 'Words Reviewed',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function ProgressChart() {
  const [chartData, setChartData] = useState<any[] | null>(null);

  useEffect(() => {
    // Generate data on client to avoid hydration mismatch
    const data = [
      { day: 'Mon', words: Math.floor(Math.random() * 10) + 1 },
      { day: 'Tue', words: Math.floor(Math.random() * 10) + 1 },
      { day: 'Wed', words: Math.floor(Math.random() * 10) + 1 },
      { day: 'Thu', words: Math.floor(Math.random() * 10) + 1 },
      { day: 'Fri', words: Math.floor(Math.random() * 10) + 1 },
      { day: 'Sat', words: Math.floor(Math.random() * 10) + 1 },
      { day: 'Sun', words: Math.floor(Math.random() * 10) + 1 },
    ];
    setChartData(data);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Progress</CardTitle>
        <CardDescription>Words reviewed in the last 7 days (mock data)</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData ? (
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
              <Bar dataKey="words" fill="var(--color-words)" radius={4} />
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="flex min-h-[200px] w-full items-end gap-2 p-4">
             <Skeleton className="h-24 w-[12%]" />
             <Skeleton className="h-32 w-[12%]" />
             <Skeleton className="h-16 w-[12%]" />
             <Skeleton className="h-40 w-[12%]" />
             <Skeleton className="h-28 w-[12%]" />
             <Skeleton className="h-36 w-[12%]" />
             <Skeleton className="h-20 w-[12%]" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
