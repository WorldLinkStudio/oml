import React, { useState, useMemo } from 'react';
import { Card } from './ui/Card';

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

// Simplified FAQ data - in production, load from FAQ.md
const faqData: FAQItem[] = [
  {
    question: 'What is OML?',
    answer:
      'OML (Open Music License) is a dual-tier licensing framework designed specifically for music producers, beatmakers, and audio creators. It provides a fair, transparent, and enforceable way to license music for both personal and commercial use.',
    category: 'general',
  },
  {
    question: 'How is OML different from other music licenses?',
    answer:
      'Unlike traditional music licenses or Creative Commons, OML has a clear revenue threshold ($1,000/year for personal use), provides specific attribution requirements, offers flexible payment structures for commercial use, and includes music-specific provisions for sampling, stems, and derivatives.',
    category: 'general',
  },
  {
    question: 'What can I do with OML-P?',
    answer:
      'With OML-P, you can use the music in your creative projects, modify and create derivative works, distribute your projects (with proper attribution), perform the music publicly, and make money up to $1,000/year total revenue.',
    category: 'oml-p',
  },
  {
    question: 'What happens if I exceed $1,000 in revenue?',
    answer:
      'You have a 30-day grace period to obtain a Commercial Use License (OML-C). During this period, you can continue using the music while negotiating commercial terms. After 30 days, you must either get a commercial license or stop using the music.',
    category: 'oml-p',
  },
  {
    question: 'When do I need OML-C?',
    answer:
      'You need OML-C when your revenue exceeds $1,000/year, you want unlimited commercial use without revenue tracking, you need to sublicense derivative works, you want professional warranties and protections, or you need exclusive rights.',
    category: 'oml-c',
  },
  {
    question: 'What is OML-S used for?',
    answer:
      'OML-S is specifically for synchronization licensing - putting music in videos, films, TV shows, advertisements, video games, and other audiovisual content.',
    category: 'oml-s',
  },
  {
    question: 'Where do I put attribution?',
    answer:
      'Attribution must be reasonably accessible to the audience experiencing your project. This can include video descriptions, end credits, album liner notes, streaming platform credits, website credits pages, social media captions, and live performance announcements.',
    category: 'attribution',
  },
];

export const FAQAccordion: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const cats = new Set<string>(['all']);
    faqData.forEach((item) => {
      if (item.category) cats.add(item.category);
    });
    return Array.from(cats);
  }, []);

  const filteredFAQs = useMemo(() => {
    return faqData.filter((item) => {
      const matchesSearch =
        searchQuery === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="section-container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-description">
          Find answers to common questions about OML licensing.
        </p>

        <div className="faq-controls">
          <input
            type="text"
            className="faq-search"
            placeholder="Search FAQ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search FAQ"
          />

          <div className="faq-categories">
            {categories.map((category) => (
              <button
                key={category}
                className={`faq-category-button ${
                  selectedCategory === category ? 'active' : ''
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="faq-list">
          {filteredFAQs.length === 0 ? (
            <Card padding="medium">
              <p>No FAQ items found matching your search.</p>
            </Card>
          ) : (
            filteredFAQs.map((item, index) => {
              const isOpen = openItems.has(index);
              return (
                <Card key={index} padding="medium" className="faq-item">
                  <button
                    className="faq-question"
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="faq-question-text">{item.question}</span>
                    <span
                      className={`faq-toggle-icon ${isOpen ? 'open' : ''}`}
                      aria-hidden="true"
                    >
                      ▼
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      id={`faq-answer-${index}`}
                      className="faq-answer"
                      role="region"
                    >
                      <p>{item.answer}</p>
                    </div>
                  )}
                </Card>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

