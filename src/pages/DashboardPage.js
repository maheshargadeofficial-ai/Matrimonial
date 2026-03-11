import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, User, MessageCircle, Star, ArrowRight, AlertCircle } from 'lucide-react';

const DashboardPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: User,
      title: t('browse_profiles'),
      description: 'Find compatible matches',
      action: () => navigate('/browse'),
      color: 'bg-primary',
      testId: 'dashboard-browse-card'
    },
    {
      icon: Star,
      title: t('interests'),
      description: 'View sent and received interests',
      action: () => navigate('/interests'),
      color: 'bg-secondary',
      testId: 'dashboard-interests-card'
    },
    {
      icon: Heart,
      title: t('matches'),
      description: 'See your matches',
      action: () => navigate('/matches'),
      color: 'bg-accent-success',
      testId: 'dashboard-matches-card'
    },
    {
      icon: MessageCircle,
      title: t('messages'),
      description: 'Chat with your connections',
      action: () => navigate('/messages'),
      color: 'bg-accent-warning',
      testId: 'dashboard-messages-card'
    }
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark" data-testid="dashboard-page">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-text-primary mb-2">
            Welcome, {user?.name}!
          </h1>
          <p className="text-text-secondary text-lg">
            {t('tagline')}
          </p>
        </div>

        {!user?.profile_completed && (
          <Card className="mb-8 p-6 bg-accent-warning/10 border-accent-warning" data-testid="complete-profile-alert">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-accent-warning flex-shrink-0 mt-1" aria-hidden="true" />
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">
                  {t('complete_profile')}
                </h3>
                <p className="text-text-secondary mb-4">
                  Complete your profile to get better matches and increase visibility.
                </p>
                <Button
                  onClick={() => navigate('/profile/edit')}
                  className="bg-primary hover:bg-primary/90 text-white"
                  data-testid="complete-profile-btn"
                >
                  {t('edit_profile')}
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all cursor-pointer group"
                onClick={action.action}
                data-testid={action.testId}
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-text-primary mb-1">
                      {action.title}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {action.description}
                    </p>
                  </div>
                  <div className="flex items-center text-primary font-medium text-sm">
                    Explore
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
