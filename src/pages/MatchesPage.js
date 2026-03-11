import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { matchesAPI } from '@/services/api';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import ProfileCard from '@/components/ProfileCard';
import { Heart } from 'lucide-react';

const MatchesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await matchesAPI.getMatches();
      setMatches(response.data);
    } catch (error) {
      toast.error('Failed to load matches');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark" data-testid="matches-page">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-text-primary mb-2">
            <Heart className="w-8 h-8 inline mr-3 text-secondary" />
            {t('matches')}
          </h1>
          <p className="text-text-secondary text-lg">
            Your mutual connections - interests that were accepted by both parties
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-text-secondary">{t('loading')}</p>
          </div>
        ) : matches.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <p className="text-text-secondary text-lg mb-2">No matches yet</p>
            <p className="text-text-secondary">Start browsing profiles and send interests to find your perfect match!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="matches-grid">
            {matches.map((match) => (
              <ProfileCard
                key={match.id}
                user={match}
                onViewProfile={(id) => navigate(`/profile/${id}`)}
                onSendInterest={() => navigate(`/messages/${match.id}`)}
                showInterestButton={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchesPage;
