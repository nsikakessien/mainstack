import Image from "next/image";
import React from "react";

const Sidebar = () => {
  return (
    <aside className="fixed-sidebar">
      <div className="p-2 rounded-[100px] hover:bg-gray-50 cursor-pointer mix-blend-luminosity hover:mix-blend-normal">
        <Image
          src="/assets/icons/bio.svg"
          alt="link in bio"
          width={24}
          height={24}
        />
      </div>

      <div className="p-2 rounded-[100px] hover:bg-gray-50 cursor-pointer mix-blend-luminosity hover:mix-blend-normal">
        <Image
          src="/assets/icons/store.svg"
          alt="store"
          width={24}
          height={24}
        />
      </div>

      <div className="p-2 rounded-[100px] hover:bg-gray-50 cursor-pointer mix-blend-luminosity hover:mix-blend-normal">
        <Image
          src="/assets/icons/kit.svg"
          alt="media kit"
          width={24}
          height={24}
        />
      </div>

      <div className="p-2 rounded-[100px] hover:bg-gray-50 cursor-pointer mix-blend-luminosity hover:mix-blend-normal">
        <Image
          src="/assets/icons/invoice.svg"
          alt="invoicing"
          width={24}
          height={24}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
