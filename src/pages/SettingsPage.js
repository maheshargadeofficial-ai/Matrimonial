import React from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accessibility, Globe, Type } from 'lucide-react';

const SettingsPage = () => {
  const { t, i18n } = useTranslation();
  const { highContrast, fontSize, toggleHighContrast, changeFontSize } = useAccessibility();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark" data-testid="settings-page">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="font-heading font-bold text-3xl md:text-4xl text-text-primary mb-8">
          {t('settings')}
        </h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Accessibility className="w-6 h-6" aria-hidden="true" />
                {t('accessibility')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="high-contrast" className="text-base font-semibold">
                    {t('high_contrast')}
                  </Label>
                  <p className="text-sm text-text-secondary">
                    Enhance contrast for better visibility
                  </p>
                </div>
                <Switch
                  id="high-contrast"
                  checked={highContrast}
                  onCheckedChange={toggleHighContrast}
                  data-testid="high-contrast-toggle"
                  aria-label={t('high_contrast')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="font-size" className="text-base font-semibold">
                  <Type className="w-5 h-5 inline mr-2" aria-hidden="true" />
                  {t('font_size')}
                </Label>
                <Select value={fontSize} onValueChange={changeFontSize}>
                  <SelectTrigger id="font-size" className="w-full" data-testid="font-size-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-6 h-6" aria-hidden="true" />
                {t('language')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={i18n.language} onValueChange={changeLanguage}>
                <SelectTrigger className="w-full" data-testid="language-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
