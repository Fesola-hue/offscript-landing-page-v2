export function Wordmark({ className = "", onLight = false }: { className?: string; onLight?: boolean }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <img
        src={onLight ? "/logos/logo-blue-web.png" : "/logos/logo-white-web.png"}
        alt="The OffScript"
        className="block h-auto w-[6em] max-w-full"
      />
    </span>
  );
}
