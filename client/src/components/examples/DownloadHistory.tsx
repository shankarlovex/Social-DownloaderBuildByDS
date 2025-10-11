import DownloadHistory from "../DownloadHistory";

export default function DownloadHistoryExample() {
  const mockDownloads = [
    {
      id: "1",
      title: "Amazing Tutorial Video",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg",
      status: "success" as const,
      format: "MP4 1080p",
    },
    {
      id: "2",
      title: "Music Video Download",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg",
      status: "downloading" as const,
      format: "MP3 320kbps",
    },
    {
      id: "3",
      title: "Failed Download Example",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg",
      status: "failed" as const,
      format: "MP4 4K",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      <DownloadHistory
        downloads={mockDownloads}
        onClose={() => console.log("Close history")}
        onRedownload={(id) => console.log("Redownload:", id)}
        onDelete={(id) => console.log("Delete:", id)}
      />
    </div>
  );
}
