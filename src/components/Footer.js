import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Mail, FileText, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer
      className="bg-surface-light dark:bg-surface-dark border-t border-stone-200 dark:border-stone-800 mt-auto"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-primary" aria-hidden="true" />
              <span className="font-heading font-bold text-lg text-primary">
                {t('app_name')}
              </span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              {t('tagline')}
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-text-primary mb-4">
              {t('about')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-text-secondary hover:text-primary transition-colors"
                  data-testid="footer-about-link"
                >
                  <FileText className="w-4 h-4 inline mr-2" aria-hidden="true" />
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-text-secondary hover:text-primary transition-colors"
                  data-testid="footer-contact-link"
                >
                  <Mail className="w-4 h-4 inline mr-2" aria-hidden="true" />
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-text-primary mb-4">
              {t('privacy')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/privacy"
                  className="text-text-secondary hover:text-primary transition-colors"
                  data-testid="footer-privacy-link"
                >
                  <Shield className="w-4 h-4 inline mr-2" aria-hidden="true" />
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-text-secondary hover:text-primary transition-colors"
                  data-testid="footer-terms-link"
                >
                  <FileText className="w-4 h-4 inline mr-2" aria-hidden="true" />
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-stone-200 dark:border-stone-800 text-center text-sm text-text-secondary">
          <p>&copy; 2026 {t('app_name')}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
