import VideoPreview from "../VideoPreview";

export default function VideoPreviewExample() {
  return (
    <div className="p-8 max-w-2xl">
      <VideoPreview
        thumbnail="https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg"
        title="Amazing Tutorial: How to Build Modern Web Apps"
        duration="12:34"
        channel="Tech Channel"
      />
    </div>
  );
}
