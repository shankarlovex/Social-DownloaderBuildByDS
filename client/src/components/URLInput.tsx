import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, X, Clipboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface URLInputProps {
  onSubmit: (url: string) => void;
}

export default function URLInput({ onSubmit }: URLInputProps) {
  const [url, setUrl] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  const validateURL = (input: string) => {
    if (!input) {
      setIsValid(null);
      setError("");
      return;
    }

    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/;
    const valid = youtubeRegex.test(input);
    setIsValid(valid);
    setError(valid ? "" : "Please enter a valid YouTube URL");
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      validateURL(text);
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  };

  const handleSubmit = () => {
    if (isValid && url) {
      onSubmit(url);
    }
  };

  return (
    <div className="w-full space-y-3">
      <div className="relative">
        <Input
          type="url"
          placeholder="Paste YouTube URL here..."
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            validateURL(e.target.value);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="pr-24 h-12 text-base rounded-2xl"
          data-testid="input-url"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {isValid !== null && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={isValid ? "text-chart-2" : "text-destructive"}
            >
              {isValid ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
            </motion.div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePaste}
            className="h-8 w-8"
            data-testid="button-paste"
          >
            <Clipboard className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-destructive"
            data-testid="text-error"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <Button
        onClick={handleSubmit}
        disabled={!isValid}
        className="w-full h-12 text-base rounded-xl"
        data-testid="button-fetch-video"
      >
        Fetch Video
      </Button>
    </div>
  );
}
