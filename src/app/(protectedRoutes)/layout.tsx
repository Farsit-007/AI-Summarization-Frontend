const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="min-h-[100vh] flex-1 rounded-xl container mx-auto md:min-h-min">
        {children}
      </div>
    </div>
  );
};
export default DashboardLayout;
