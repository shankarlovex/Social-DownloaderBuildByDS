import { useState } from "react";
import SplashScreen from "../SplashScreen";
import { Button } from "@/components/ui/button";

export default function SplashScreenExample() {
  const [show, setShow] = useState(false);

  return (
    <div className="p-8">
      <Button onClick={() => setShow(true)}>Show Splash Screen</Button>
      {show && <SplashScreen onComplete={() => setShow(false)} />}
    </div>
  );
}
