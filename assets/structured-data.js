// JSON-LD Structured Data for SEO
// Helps search engines understand the content and display rich results

(function() {
  'use strict';

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Signal Pilot",
    "url": "https://signalpilot.io",
    "logo": "https://education.signalpilot.io/assets/icons/icon-512x512.png",
    "sameAs": [
      "https://twitter.com/signalpilot",
      "https://linkedin.com/company/signalpilot"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": "support@signalpilot.io"
    }
  };

  // Educational Organization
  const educationalOrganization = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Signal Pilot Education Hub",
    "url": "https://education.signalpilot.io",
    "description": "Learn institutional trading concepts from Signal Pilot. 42 comprehensive lessons covering order flow, liquidity engineering, and professional trading frameworks.",
    "provider": {
      "@type": "Organization",
      "name": "Signal Pilot"
    }
  };

  // Course Schema (for homepage)
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Signal Pilot Trading Education",
    "description": "Interactive trading course with 42 lessons across 3 tiers: Beginner, Intermediate, and Advanced. Learn market structure, institutional order flow, and professional trading frameworks.",
    "provider": {
      "@type": "Organization",
      "name": "Signal Pilot",
      "url": "https://signalpilot.io"
    },
    "courseCode": "SP-EDU-001",
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": "PT40H"
    },
    "educationalLevel": "Beginner to Advanced",
    "numberOfCredits": 42,
    "about": [
      "Trading",
      "Order Flow",
      "Market Microstructure",
      "Liquidity Engineering",
      "Institutional Trading"
    ],
    "teaches": [
      "Market structure analysis",
      "Order flow reading",
      "Liquidity sweep identification",
      "Risk management",
      "Professional trading frameworks"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250",
      "bestRating": "5"
    }
  };

  // Learning Resource for individual lessons
  function createLessonSchema(lessonData) {
    return {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      "name": lessonData.title,
      "description": lessonData.description,
      "learningResourceType": "Lesson",
      "educationalLevel": lessonData.tier, // beginner, intermediate, advanced
      "timeRequired": lessonData.duration, // e.g., "PT18M"
      "inLanguage": "en-US",
      "isPartOf": {
        "@type": "Course",
        "name": "Signal Pilot Trading Education"
      },
      "position": lessonData.number,
      "teaches": lessonData.teaches || []
    };
  }

  // BreadcrumbList for navigation
  function createBreadcrumbSchema(items) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };
  }

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Signal Pilot Education Hub",
    "url": "https://education.signalpilot.io",
    "description": "Interactive trading education platform with 42 lessons, quizzes, and progress tracking.",
    "publisher": {
      "@type": "Organization",
      "name": "Signal Pilot"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://education.signalpilot.io/search.html?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // FAQ Schema (can be used on pages with common questions)
  function createFAQSchema(faqs) {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  }

  // Helper function to inject schema into page
  function injectSchema(schema) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  // Auto-detect page type and inject appropriate schemas
  function initStructuredData() {
    const pathname = window.location.pathname;

    // Always add Organization schema
    injectSchema(organizationSchema);

    // Homepage
    if (pathname === '/' || pathname === '/index.html') {
      injectSchema(websiteSchema);
      injectSchema(courseSchema);
      injectSchema(educationalOrganization);

      // Homepage breadcrumb
      injectSchema(createBreadcrumbSchema([
        { name: "Home", url: "https://education.signalpilot.io/" }
      ]));
    }

    // Lesson pages
    else if (pathname.includes('/curriculum/')) {
      const lessonId = window.getLessonId ? window.getLessonId() : null;

      if (lessonId) {
        const lessonTitle = document.querySelector('.article header .headline')?.textContent || 'Lesson';
        const tier = lessonId.split('/')[0]; // beginner, intermediate, advanced
        const lessonNumber = lessonId.match(/\d+/)?.[0] || '1';

        const lessonSchema = createLessonSchema({
          title: lessonTitle,
          description: document.querySelector('meta[name="description"]')?.content || '',
          tier: tier.charAt(0).toUpperCase() + tier.slice(1),
          duration: "PT18M", // 18 minutes average
          number: parseInt(lessonNumber)
        });

        injectSchema(lessonSchema);

        // Lesson breadcrumb
        injectSchema(createBreadcrumbSchema([
          { name: "Home", url: "https://education.signalpilot.io/" },
          { name: tier.charAt(0).toUpperCase() + tier.slice(1), url: `https://education.signalpilot.io/${tier}.html` },
          { name: lessonTitle, url: window.location.href }
        ]));
      }
    }

    // Tier pages (beginner, intermediate, advanced)
    else if (pathname.match(/\/(beginner|intermediate|advanced)\.html/)) {
      const tier = pathname.match(/\/(beginner|intermediate|advanced)/)[1];
      const tierName = tier.charAt(0).toUpperCase() + tier.slice(1);

      injectSchema(createBreadcrumbSchema([
        { name: "Home", url: "https://education.signalpilot.io/" },
        { name: tierName, url: window.location.href }
      ]));
    }

    // Search page
    else if (pathname.includes('/search.html')) {
      injectSchema(websiteSchema); // Includes SearchAction

      injectSchema(createBreadcrumbSchema([
        { name: "Home", url: "https://education.signalpilot.io/" },
        { name: "Search", url: "https://education.signalpilot.io/search.html" }
      ]));
    }

    // Calculators page
    else if (pathname.includes('/calculators.html')) {
      injectSchema(createBreadcrumbSchema([
        { name: "Home", url: "https://education.signalpilot.io/" },
        { name: "Calculators", url: "https://education.signalpilot.io/calculators.html" }
      ]));
    }

    logger.log('[SEO] Structured data injected');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStructuredData);
  } else {
    initStructuredData();
  }

  // Expose helper functions globally for custom use
  window.SEO = {
    createLessonSchema,
    createBreadcrumbSchema,
    createFAQSchema,
    injectSchema
  };

})();
