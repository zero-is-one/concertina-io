import { useEffect } from "react";
import useStayAwake from "use-stay-awake";

export const DeviceStayAwake = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const device = useStayAwake();
  useEffect(() => {
    device.preventSleeping();
    return () => {
      device.allowSleeping();
    };
  });

  return <>{children}</>;
};
