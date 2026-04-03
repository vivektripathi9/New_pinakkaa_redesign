// Apply consistent typography classes across the site without editing every markup spot.
// Maps common existing selectors to the new reusable classes:
document.addEventListener('DOMContentLoaded', () => {
  const addClassAll = (selector, className) => {
    document.querySelectorAll(selector).forEach((el) => {
      if (!el.classList.contains(className)) el.classList.add(className);
    });
  };

  // Large section titles (hero/primary)
  addClassAll(`
    .main-heading,
    .services-heading,
    .z-heading,
    .why-pinakkaa-section .main-title,
    .creative-touch-section .main-heading,
    .cta-heading
  `, 'section-title-big');

  // Standard section titles
  addClassAll(`
    .about-values-heading,
    .about-services-title,
    .about-faq-title,
    .about-process-title,
    .about-newsletter-title,
    .services-hero-title,
    .services-cta-title,
    .service-title-main,
    .contact-main-heading,
    .legal-title,
    .precision-heading
  `, 'section-title');

  // Subtitles / kickers
  addClassAll(`
    .sub-heading,
    .subtitle,
    .about-faq-kicker,
    .about-services-kicker,
    .about-growth-kicker,
    .about-story-kicker,
    .nav-heading,
    .kicker
  `, 'sub-title');

  // Paragraphs / description text
  addClassAll(`
    .about-story-text,
    .about-values-copy,
    .about-value-text,
    .service-description-main,
    .about-faq-intro,
    .about-faq-answer p,
    .services-cta-text,
    .column-description,
    .testimonial-section .subtitle,
    .contact-address p,
    .section-para-auto
  `, 'section-para');
});

