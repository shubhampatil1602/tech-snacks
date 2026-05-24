export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative'>
      <div className='min-h-screen w-full bg-[#f9fafb] relative'>
        {/* Diagonal Fade Center Grid Background */}
        <div
          className='pointer-events-none absolute inset-0 z-0'
          style={{
            backgroundImage: `
        linear-gradient(to right, #d1d5db .5px, transparent 1px),
        linear-gradient(to bottom, #d1d5db .5px, transparent 1px)
      `,
            backgroundSize: "48px 48px",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 60%)",
            maskImage:
              "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
          }}
        />
        <div className='relative z-10'>{children}</div>
      </div>
    </div>
  );
}
