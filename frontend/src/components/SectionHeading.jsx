/**
 * Composant SectionHeading pour les titres de section
 * Style moderne avec titre et sous-titre optionnel
 */
function SectionHeading({ title, subtitle, align = 'center', className = '' }) {
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`mb-12 ${alignments[align]} ${className}`}>
      {title && (
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
