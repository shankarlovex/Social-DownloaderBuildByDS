import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Gauge, Clock, HardDrive, Percent } from "lucide-react";

interface DownloadProgressProps {
  percentage: number;
  speed: string;
  timeRemaining: string;
  fileSize: string;
}

export default function DownloadProgress({
  percentage,
  speed,
  timeRemaining,
  fileSize,
}: DownloadProgressProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <Card className="p-6 space-y-6 rounded-2xl">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Downloading...</span>
            <span className="text-2xl font-bold" data-testid="text-percentage">
              {percentage}%
            </span>
          </div>
          <Progress value={percentage} className="h-3" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 space-y-2 bg-muted/50 rounded-xl">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Percent className="h-4 w-4" />
              <span className="text-xs font-medium">Progress</span>
            </div>
            <p className="text-lg font-bold font-mono" data-testid="text-progress">
              {percentage}%
            </p>
          </Card>

          <Card className="p-4 space-y-2 bg-muted/50 rounded-xl">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Gauge className="h-4 w-4" />
              <span className="text-xs font-medium">Speed</span>
            </div>
            <p className="text-lg font-bold font-mono" data-testid="text-speed">
              {speed}
            </p>
          </Card>

          <Card className="p-4 space-y-2 bg-muted/50 rounded-xl">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-xs font-medium">Time Left</span>
            </div>
            <p className="text-lg font-bold font-mono" data-testid="text-time">
              {timeRemaining}
            </p>
          </Card>

          <Card className="p-4 space-y-2 bg-muted/50 rounded-xl">
            <div className="flex items-center gap-2 text-muted-foreground">
              <HardDrive className="h-4 w-4" />
              <span className="text-xs font-medium">File Size</span>
            </div>
            <p className="text-lg font-bold font-mono" data-testid="text-filesize">
              {fileSize}
            </p>
          </Card>
        </div>
      </Card>
    </motion.div>
  );
}
