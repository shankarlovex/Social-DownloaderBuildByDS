import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface VideoPreviewProps {
  thumbnail: string;
  title: string;
  duration: string;
  channel: string;
}

export default function VideoPreview({ thumbnail, title, duration, channel }: VideoPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="p-4 hover-elevate rounded-2xl" data-testid="card-video-preview">
        <div className="flex gap-4">
          <div className="relative flex-shrink-0 w-40 h-24 rounded-lg overflow-hidden bg-muted">
            <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="bg-black/60 rounded-full p-2">
                <Play className="h-6 w-6 text-white fill-white" />
              </div>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
              {duration}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base line-clamp-2 mb-1" data-testid="text-video-title">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground" data-testid="text-channel-name">
              {channel}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
