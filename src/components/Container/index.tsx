type ContainerProps = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  return (
    <div className="text-slate-900 bg-slate-200 min-h-screen">
      <div className="max-w-screen-md mx-auto px-8">{children}</div>
    </div>
  );
}
