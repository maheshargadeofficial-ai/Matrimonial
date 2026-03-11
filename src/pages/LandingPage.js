import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Heart, Users, Shield, Accessibility } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const LandingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: Heart,
      title: t('feature_1_title'),
      description: t('feature_1_desc'),
      image: 'https://images.unsplash.com/photo-1706295330859-e28eb8017370?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NjV8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNvdXBsZSUyMHdoZWVsY2hhaXIlMjBkYXRlJTIwY2FmZXxlbnwwfHx8fDE3NzMxODU5MzJ8MA&ixlib=rb-4.1.0&q=85'
    },
    {
      icon: Shield,
      title: t('feature_2_title'),
      description: t('feature_2_desc'),
      image: 'https://images.unsplash.com/photo-1751441080433-eae5a8b04db7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHw0fHxibGluZCUyMHBlcnNvbiUyMGd1aWRlJTIwZG9nJTIwd2Fsa2luZyUyMHBhcmslMjBoYXBweXxlbnwwfHx8fDE3NzMxODU5MzR8MA&ixlib=rb-4.1.0&q=85'
    },
    {
      icon: Users,
      title: t('feature_3_title'),
      description: t('feature_3_desc'),
      image: 'https://images.unsplash.com/photo-1626447269096-f8665509589c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxkZWFmJTIwY291cGxlJTIwc2lnbiUyMGxhbmd1YWdlJTIwY29tbXVuaWNhdGluZyUyMHNtaWxpbmd8ZW58MHx8fHwxNzczMTg1OTM1fDA&ixlib=rb-4.1.0&q=85'
    },
    {
      icon: Accessibility,
      title: t('feature_4_title'),
      description: t('feature_4_desc'),
      image: 'https://images.unsplash.com/photo-1772723246501-b108bc8a4d8e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwZ3JvdXAlMjBmcmllbmRzJTIwZGlzYWJpbGl0aWVzJTIwbGF1Z2hpbmd8ZW58MHx8fHwxNzczMTg1OTM1fDA&ixlib=rb-4.1.0&q=85'
    }
  ];

  const steps = [
    { number: '1', title: t('step_1') },
    { number: '2', title: t('step_2') },
    { number: '3', title: t('step_3') },
    { number: '4', title: t('step_4') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F7F2] via-[#E8F0E6] to-[#D08C60]/10">
      <main>
        <section
          className="relative px-6 py-20 md:py-32"
          aria-labelledby="hero-heading"
          data-testid="hero-section"
        >
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1
              id="hero-heading"
              className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-text-primary leading-tight tracking-tight"
            >
              {t('hero_title')}
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              {t('hero_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                onClick={() => navigate('/register')}
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:-translate-y-0.5 transition-all min-h-[44px] min-w-[150px]"
                data-testid="hero-get-started-btn"
              >
                {t('get_started')}
              </Button>
              <Button
                onClick={() => navigate('/login')}
                variant="outline"
                className="rounded-full px-8 py-6 text-lg font-medium border-2 border-primary text-primary hover:bg-primary/10 min-h-[44px] min-w-[150px]"
                data-testid="hero-login-btn"
              >
                {t('login')}
              </Button>
            </div>
          </div>
        </section>

        <section
          className="px-6 py-16 bg-white dark:bg-surface-dark"
          aria-labelledby="features-heading"
        >
          <div className="max-w-7xl mx-auto">
            <h2
              id="features-heading"
              className="font-heading font-bold text-3xl md:text-4xl text-text-primary text-center mb-12"
            >
              {t('features_title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-surface-light dark:bg-[#1E1E1E] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    data-testid={`feature-card-${index}`}
                  >
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                        </div>
                        <h3 className="font-heading font-semibold text-xl text-text-primary">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-text-secondary leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section
          className="px-6 py-16 bg-gradient-to-br from-primary/5 to-secondary/5"
          aria-labelledby="how-it-works-heading"
        >
          <div className="max-w-6xl mx-auto">
            <h2
              id="how-it-works-heading"
              className="font-heading font-bold text-3xl md:text-4xl text-text-primary text-center mb-12"
            >
              {t('how_it_works')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="text-center space-y-4"
                  data-testid={`step-${index}`}
                >
                  <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto shadow-md">
                    {step.number}
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-text-primary">
                    {step.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 bg-primary text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-heading font-bold text-3xl md:text-4xl">
              {t('hero_title')}
            </h2>
            <p className="text-lg md:text-xl opacity-90">{t('tagline')}</p>
            <Button
              onClick={() => navigate('/register')}
              className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:-translate-y-0.5 transition-all min-h-[44px]"
              data-testid="cta-register-btn"
            >
              {t('get_started')}
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
