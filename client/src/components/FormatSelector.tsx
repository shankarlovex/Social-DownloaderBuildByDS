import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

interface QualityOption {
  label: string;
  size: string;
  recommended?: boolean;
}

interface FormatSelectorProps {
  onDownload: (format: string, quality: string) => void;
}

const videoQualities: QualityOption[] = [
  { label: "8K", size: "~8 GB", recommended: false },
  { label: "4K", size: "~4 GB", recommended: false },
  { label: "1440p", size: "~2 GB", recommended: false },
  { label: "1080p HD", size: "~800 MB", recommended: true },
  { label: "720p HD", size: "~400 MB", recommended: false },
  { label: "480p", size: "~200 MB", recommended: false },
  { label: "360p", size: "~100 MB", recommended: false },
  { label: "240p", size: "~50 MB", recommended: false },
];

const audioQualities: QualityOption[] = [
  { label: "320 kbps", size: "~7 MB", recommended: true },
  { label: "256 kbps", size: "~6 MB", recommended: false },
  { label: "192 kbps", size: "~4 MB", recommended: false },
  { label: "128 kbps", size: "~3 MB", recommended: false },
  { label: "96 kbps", size: "~2 MB", recommended: false },
];

export default function FormatSelector({ onDownload }: FormatSelectorProps) {
  const [selectedFormat, setSelectedFormat] = useState<"mp4" | "mp3">("mp4");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="w-full"
    >
      <Tabs value={selectedFormat} onValueChange={(v) => setSelectedFormat(v as "mp4" | "mp3")}>
        <TabsList className="grid w-full grid-cols-2 mb-6" data-testid="tabs-format">
          <TabsTrigger value="mp4" data-testid="tab-mp4">Video (MP4)</TabsTrigger>
          <TabsTrigger value="mp3" data-testid="tab-mp3">Audio (MP3)</TabsTrigger>
        </TabsList>

        <TabsContent value="mp4" className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {videoQualities.map((quality) => (
              <Button
                key={quality.label}
                variant="outline"
                onClick={() => onDownload("mp4", quality.label)}
                className="h-auto py-4 px-4 flex flex-col items-start gap-2 hover-elevate active-elevate-2 rounded-xl"
                data-testid={`button-quality-${quality.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-semibold text-base">{quality.label}</span>
                  {quality.recommended && (
                    <Badge variant="secondary" className="text-xs">
                      Recommended
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm text-muted-foreground font-mono">{quality.size}</span>
                  <Download className="h-4 w-4 text-muted-foreground" />
                </div>
              </Button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mp3" className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {audioQualities.map((quality) => (
              <Button
                key={quality.label}
                variant="outline"
                onClick={() => onDownload("mp3", quality.label)}
                className="h-auto py-4 px-4 flex flex-col items-start gap-2 hover-elevate active-elevate-2 rounded-xl"
                data-testid={`button-quality-${quality.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-semibold text-base">{quality.label}</span>
                  {quality.recommended && (
                    <Badge variant="secondary" className="text-xs">
                      Recommended
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm text-muted-foreground font-mono">{quality.size}</span>
                  <Download className="h-4 w-4 text-muted-foreground" />
                </div>
              </Button>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
