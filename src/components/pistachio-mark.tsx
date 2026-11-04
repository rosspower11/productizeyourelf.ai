export function PistachioMark({ className }: { className?: string }) {
  return (
    <img
      src="/images/brand/pistachio-mark.png"
      alt=""
      className={className}
      width={120}
      height={120}
      draggable={false}
    />
  );
}

export function PistachioLockup({
  className,
  alt = "pistachio",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <img
      src="/images/brand/pistachio-lockup.png"
      alt={alt}
      className={className}
      width={251}
      height={72}
      draggable={false}
    />
  );
}

export function PoweredByPistachio({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  return (
    <span className={`powered powered-${size}`}>
      <span className="powered-label">Powered by</span>
      <PistachioLockup className="powered-lockup" />
    </span>
  );
}
