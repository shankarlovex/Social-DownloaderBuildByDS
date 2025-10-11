import DownloadProgress from "../DownloadProgress";

export default function DownloadProgressExample() {
  return (
    <div className="p-8 max-w-4xl">
      <DownloadProgress
        percentage={65}
        speed="5.2 MB/s"
        timeRemaining="00:45"
        fileSize="800 MB"
      />
    </div>
  );
}
