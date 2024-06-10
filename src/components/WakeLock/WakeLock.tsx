import { ReactNode, useEffect } from "react";
import { useWakeLock } from "react-screen-wake-lock";

export const WakeLock = ({ children }: { children?: ReactNode }) => {
  const { isSupported, released, request, release } = useWakeLock({
    //onRequest: () => alert("Screen Wake Lock: requested!"),
    onError: () => alert("WakeLock: An error happened 💥"),
    //onRelease: () => alert("Screen Wake Lock: released!"),
  });

  useEffect(() => {
    if (!isSupported) {
      alert("Screen Wake Lock: not supported!");
      return;
    }
    request();
    return () => {
      if (!released) release();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};
