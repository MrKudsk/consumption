"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

import { usePropertyModal } from "@/hooks/use-property-modal";

const SetupPage = () => {
  const onOpen = usePropertyModal((state) => state.onOpen);
  const isOpen = usePropertyModal((state) => state.isOpen);

  useEffect(() => {
    if(!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
 
export default SetupPage;