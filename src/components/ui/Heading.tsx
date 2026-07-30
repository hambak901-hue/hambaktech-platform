type HeadingProps = {
  title: string;
  subtitle?: string;
};

export default function Heading({
  title,
  subtitle,
}: HeadingProps) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-blue-600">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 text-gray-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}