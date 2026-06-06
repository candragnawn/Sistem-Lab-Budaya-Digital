import { ReactNode } from 'react';
import { Card, CardContent } from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

export function StatCard({ title, value, icon, change, changeType = 'neutral' }: StatCardProps) {
  const changeColors = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-muted-foreground',
  };

  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <p className="text-xs text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-medium mt-1 text-foreground">{value}</h3>
          {change && (
            <p className={`text-xs mt-0.5 ${changeColors[changeType]}`}>
              {change}
            </p>
          )}
        </div>
        <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center text-primary">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
