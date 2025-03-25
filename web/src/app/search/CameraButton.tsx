"use client";

import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const CameraButton = ({ className }: { className?: string }) => {
  return (
    <Button
      onClick={() => console.log(true)}
      className={[
        "size-7 bg-background rounded-sm text-primary hover:bg-background/100",
        className,
      ]}
    >
      <FontAwesomeIcon icon={faCamera} />
    </Button>
  );
};

export default CameraButton;
