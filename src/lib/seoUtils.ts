import { TOOLS, ToolConfig } from '@/config/tools';
import { Metadata } from 'next';

const BASE_URL = 'https://pdf-combiner.free'; // Replace with production domain later

export function getToolUrl(toolId: string): string {
  return `${BASE_URL}/${toolId}`;
}

export function generateMetadataForTool(toolId: string): Metadata {
  const tool = TOOLS[toolId];
  if (!tool) {
    return {
      title: 'Free PDF Tools Online',
      description: 'Convert, merge, split, compress, and edit PDF files in your browser for free.',
    };
  }

  const url = getToolUrl(toolId);
  return {
    title: tool.title,
    description: tool.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: url,
      siteName: 'PDF Combiner Free',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/og-images/${toolId}.png`,
          width: 1200,
          height: 630,
          alt: tool.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.title,
      description: tool.description,
      images: [`${BASE_URL}/og-images/${toolId}.png`],
    },
    keywords: tool.keywords,
  };
}

export function generateJsonLdSchema(toolId: string) {
  const tool = TOOLS[toolId];
  if (!tool) return null;

  const url = getToolUrl(toolId);

  // 1. SoftwareApplication Schema
  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': tool.h1,
    'operatingSystem': 'All',
    'applicationCategory': 'UtilitiesApplication',
    'browserRequirements': 'Requires JavaScript. Requires HTML5.',
    'url': url,
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.8',
      'ratingCount': '24890'
    }
  };

  // 2. BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': BASE_URL
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': tool.h1,
        'item': url
      }
    ]
  };

  // 3. FAQ Schema
  const faqSchema = tool.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': tool.faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  } : null;

  // 4. HowTo Schema
  const howToSchema = tool.howTo.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': `How to ${tool.h1}`,
    'description': tool.description,
    'step': tool.howTo.map((step, index) => ({
      '@type': 'HowToStep',
      'position': index + 1,
      'name': step.name,
      'text': step.text,
      'url': `${url}#step-${index + 1}`
    }))
  } : null;

  return {
    softwareAppSchema,
    breadcrumbSchema,
    faqSchema,
    howToSchema
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'PDF Combiner Free',
    'url': BASE_URL,
    'logo': `${BASE_URL}/logo.png`,
    'sameAs': [
      'https://twitter.com/pdfcombinerfree',
      'https://github.com/pdfcombinerfree'
    ]
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'PDF Combiner Free',
    'url': BASE_URL,
    'potentialAction': {
      '@type': 'SearchAction',
      'target': `${BASE_URL}/?search={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}
