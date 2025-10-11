import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import ytdl from "@distube/ytdl-core";

export async function registerRoutes(app: Express): Promise<Server> {
  // YouTube video info endpoint
  app.post("/api/video-info", async (req, res) => {
    try {
      const { url } = req.body;
      
      console.log("Received video info request for URL:", url);
      
      if (!url) {
        return res.status(400).json({ error: "URL is required" });
      }

      // Validate YouTube URL
      if (!ytdl.validateURL(url)) {
        return res.status(400).json({ error: "Invalid YouTube URL" });
      }

      console.log("Fetching video info from YouTube...");
      
      // Get video info
      const info = await ytdl.getInfo(url);
      const videoDetails = info.videoDetails;

      console.log("Successfully fetched video info:", videoDetails.title);

      // Extract relevant information
      const videoInfo = {
        title: videoDetails.title,
        thumbnail: videoDetails.thumbnails[videoDetails.thumbnails.length - 1]?.url || 
                   `https://img.youtube.com/vi/${videoDetails.videoId}/mqdefault.jpg`,
        duration: formatDuration(parseInt(videoDetails.lengthSeconds)),
        channel: videoDetails.author.name,
        videoId: videoDetails.videoId,
      };

      return res.json(videoInfo);
    } catch (error: any) {
      console.error("Error fetching video info:", error.message);
      console.error("Full error:", error);
      return res.status(500).json({ 
        error: "Failed to fetch video information",
        message: error.message 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

// Helper function to format duration from seconds to MM:SS
function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}
