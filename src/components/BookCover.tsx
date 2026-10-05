"use client";

import Image from "next/image";
import { useState } from "react";

export function BookCover({ src, title }: { src: string; title: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-alt">
      {failed ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-primary-50 p-4 text-center">
          <span className="text-2xl font-bold text-primary">S.</span>
          <span className="text-xs font-medium text-text-muted">Cover coming soon</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={`Cover of ${title}`}
          fill
          sizes="(max-width: 768px) 50vw, 300px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
