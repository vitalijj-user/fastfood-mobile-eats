const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="container max-w-xl mx-auto px-4 py-6 space-y-6">
    {children}
  </div>
);

export default Container;
