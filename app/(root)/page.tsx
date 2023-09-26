"use client";

import { UserButton } from "@clerk/nextjs";
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

  return ( 
    <div className="p-4">
      <UserButton afterSignOutUrl="/" />
    </div>
   );
}
 
export default SetupPage;