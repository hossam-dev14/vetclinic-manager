interface LogoProps {
  size?: number;
  color?: string;
}

export function Logo({ size = 24, color = 'blue' }: LogoProps) {
  const dimension = `${size}px`;

  return (
    <div
      className="flex items-center justify-center rounded-lg overflow-hidden bg-transparent"
      style={{ width: dimension, height: dimension }}
    >
      <img
        src={`/logo-${color}.png`}
        alt="VetClinic Manager logo"
        className="h-full w-full object-contain"
      />
    </div>
  );
}

