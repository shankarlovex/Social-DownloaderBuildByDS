import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, CheckCircle2, AlertCircle, Download as DownloadIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Download {
  id: string;
  title: string;
  thumbnail: string;
  status: "success" | "failed" | "downloading";
  format: string;
}

interface DownloadHistoryProps {
  downloads: Download[];
  onClose: () => void;
  onRedownload: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function DownloadHistory({
  downloads,
  onClose,
  onRedownload,
  onDelete,
}: DownloadHistoryProps) {
  if (downloads.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="fixed top-16 left-0 right-0 z-30 px-4"
      >
        <div className="container mx-auto max-w-4xl">
          <Card className="p-4 backdrop-blur-xl bg-card/95 border-2 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Recent Downloads</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
                data-testid="button-close-history"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {downloads.map((download, index) => (
                <motion.div
                  key={download.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-3 flex items-center gap-3 hover-elevate rounded-xl">
                    <img
                      src={download.thumbnail}
                      alt={download.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{download.title}</p>
                      <p className="text-xs text-muted-foreground">{download.format}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {download.status === "success" && (
                        <Badge variant="secondary" className="gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Success
                        </Badge>
                      )}
                      {download.status === "failed" && (
                        <Badge variant="destructive" className="gap-1">
                          <AlertCircle className="h-3 w-3" />
                          Failed
                        </Badge>
                      )}
                      {download.status === "downloading" && (
                        <Badge className="gap-1">
                          <DownloadIcon className="h-3 w-3 animate-pulse" />
                          Downloading
                        </Badge>
                      )}
                      {download.status === "failed" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onRedownload(download.id)}
                          className="h-8 w-8"
                          data-testid={`button-redownload-${download.id}`}
                        >
                          <DownloadIcon className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(download.id)}
                        className="h-8 w-8"
                        data-testid={`button-delete-${download.id}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
