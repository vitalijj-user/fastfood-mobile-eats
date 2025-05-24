interface Props {
  headerTitle?: string;
  headerContent?: React.ReactNode;
  children: React.ReactNode;
}

const Section = ({ headerTitle, headerContent, children }: Props) => (
  <section className="px-4 mb-8">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">{headerTitle}</h3>
      {headerContent}
    </div>
    {children}
  </section>
);

export default Section;
