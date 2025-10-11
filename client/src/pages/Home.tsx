import { useState } from "react";
import Header from "@/components/Header";
import URLInput from "@/components/URLInput";
import VideoPreview from "@/components/VideoPreview";
import FormatSelector from "@/components/FormatSelector";
import DownloadProgress from "@/components/DownloadProgress";
import DownloadHistory from "@/components/DownloadHistory";
import SettingsModal from "@/components/SettingsModal";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

//todo: remove mock functionality - get video ID from URL for different previews
const getVideoIdFromUrl = (url: string) => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? match[1] : "dQw4w9WgXcQ";
};

//todo: remove mock functionality - generate mock data based on video ID
const getMockVideoData = (url: string) => {
  const videoId = getVideoIdFromUrl(url);
  const mockTitles = [
    "Amazing Tutorial: How to Build Modern Web Applications",
    "Complete Guide to Web Development in 2024",
    "Learn Programming: From Beginner to Advanced",
    "Top 10 Developer Tools You Must Know",
    "Building Scalable Applications with React",
  ];
  const mockChannels = [
    "Tech Masters",
    "Code Academy",
    "Dev Tutorials",
    "Programming Hub",
    "Web Dev Pro",
  ];
  
  const index = videoId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % mockTitles.length;
  
  return {
    thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    title: mockTitles[index],
    duration: `${10 + (index * 2)}:${20 + (index * 5)}`,
    channel: mockChannels[index],
  };
};

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoData, setVideoData] = useState<any>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
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

  const handleURLSubmit = (url: string) => {
    setVideoUrl(url);
    const mockData = getMockVideoData(url);
    setVideoData(mockData);
    setShowVideo(true);
    console.log("Fetching video info for:", url);
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

          {showVideo && videoData && (
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
