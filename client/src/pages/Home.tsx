import { useState } from "react";
import Header from "@/components/Header";
import URLInput from "@/components/URLInput";
import VideoPreview from "@/components/VideoPreview";
import FormatSelector from "@/components/FormatSelector";
import DownloadProgress from "@/components/DownloadProgress";
import DownloadHistory from "@/components/DownloadHistory";
import SettingsModal from "@/components/SettingsModal";
import { Button } from "@/components/ui/button";
import { Bell, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoData, setVideoData] = useState<any>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();
  
  //todo: remove mock functionality
  const [downloadHistory, setDownloadHistory] = useState([
    {
      id: "1",
      title: "Previous Download Example",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg",
      status: "success" as const,
      format: "MP4 1080p HD",
    },
  ]);

  const handleURLSubmit = async (url: string) => {
    setVideoUrl(url);
    setIsLoading(true);
    setShowVideo(false);
    
    try {
      const response = await apiRequest("POST", "/api/video-info", { url });
      const data = await response.json();

      setVideoData(data);
      setShowVideo(true);
      console.log("Fetched video info:", data);
    } catch (error: any) {
      console.error("Error fetching video info:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to fetch video information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (format: string, quality: string) => {
    console.log(`Starting download: ${format} ${quality}`);
    setIsDownloading(true);
    setDownloadProgress(0);

    //todo: remove mock functionality - simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          
          const newDownload = {
            id: Date.now().toString(),
            title: videoData?.title || "Downloaded Video",
            thumbnail: videoData?.thumbnail || "https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg",
            status: "success" as const,
            format: `${format.toUpperCase()} ${quality}`,
          };
          setDownloadHistory((prev) => [newDownload, ...prev].slice(0, 5));
          
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSettingsClick={() => setShowSettings(true)} />
      
      {showHistory && (
        <DownloadHistory
          downloads={downloadHistory}
          onClose={() => setShowHistory(false)}
          onRedownload={(id) => console.log("Redownload:", id)}
          onDelete={(id) => {
            setDownloadHistory((prev) => prev.filter((d) => d.id !== id));
          }}
        />
      )}

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Download YouTube Videos
            </h1>
            <p className="text-muted-foreground">
              Fast, free, and easy video downloader with multiple quality options
            </p>
          </div>
          {downloadHistory.length > 0 && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowHistory(!showHistory)}
              className="relative"
              data-testid="button-show-history"
            >
              <Bell className="h-5 w-5" />
              {downloadHistory.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {downloadHistory.length}
                </span>
              )}
            </Button>
          )}
        </div>

        <div className="space-y-6">
          <URLInput onSubmit={handleURLSubmit} />

          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-lg">Fetching video information...</span>
            </div>
          )}

          {showVideo && videoData && !isLoading && (
            <>
              <VideoPreview {...videoData} />
              <FormatSelector onDownload={handleDownload} />
            </>
          )}

          {isDownloading && (
            <DownloadProgress
              percentage={downloadProgress}
              speed="5.2 MB/s"
              timeRemaining={downloadProgress < 100 ? "00:45" : "00:00"}
              fileSize="800 MB"
            />
          )}
        </div>
      </main>

      <SettingsModal open={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}
