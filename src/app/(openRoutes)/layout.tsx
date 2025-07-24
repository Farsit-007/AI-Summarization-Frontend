const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main className="min-h-[calc(100vh-200px)] container mx-auto">
        {children}
      </main>
    </div>
  );
};

export default CommonLayout;
