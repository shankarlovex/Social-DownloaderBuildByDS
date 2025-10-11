import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { SiInstagram } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsModal({ open, onClose }: SettingsModalProps) {
  const { theme, setTheme } = useTheme();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">Theme</h3>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                onClick={() => setTheme("light")}
                className="w-full"
                data-testid="button-theme-light"
              >
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                onClick={() => setTheme("dark")}
                className="w-full"
                data-testid="button-theme-dark"
              >
                Dark
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                onClick={() => setTheme("system")}
                className="w-full"
                data-testid="button-theme-system"
              >
                System
              </Button>
            </div>
          </div>

          <Card className="p-4 space-y-2 rounded-xl">
            <h3 className="text-sm font-semibold text-muted-foreground">App Version</h3>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-base px-3 py-1">
                v1.0.0
              </Badge>
            </div>
          </Card>

          <Card className="p-4 space-y-2 rounded-xl">
            <h3 className="text-sm font-semibold text-muted-foreground">Privacy Note</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Social Downloader respects your privacy. Downloads are processed locally and no data is stored on our servers.
            </p>
          </Card>

          <Card className="p-4 space-y-3 rounded-xl">
            <h3 className="text-sm font-semibold text-muted-foreground">Developer</h3>
            <div className="space-y-2">
              <p className="text-sm">
                Created by <span className="font-semibold">@shankar__lovex</span>
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  asChild
                >
                  <a
                    href="https://instagram.com/shankar__lovex"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-instagram"
                  >
                    <SiInstagram className="h-4 w-4" />
                    Instagram
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  asChild
                >
                  <a
                    href="https://x.com/shankar__lovex"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-twitter"
                  >
                    <FaXTwitter className="h-4 w-4" />
                    X
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
