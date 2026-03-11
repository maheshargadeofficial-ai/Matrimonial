import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { interestsAPI } from '@/services/api';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, CheckCircle, XCircle, Clock } from 'lucide-react';

const InterestsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [receivedInterests, setReceivedInterests] = useState([]);
  const [sentInterests, setSentInterests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterests();
  }, []);

  const fetchInterests = async () => {
    try {
      setLoading(true);
      const [received, sent] = await Promise.all([
        interestsAPI.getReceived(),
        interestsAPI.getSent()
      ]);
      setReceivedInterests(received.data);
      setSentInterests(sent.data);
    } catch (error) {
      toast.error('Failed to load interests');
    } finally {
      setLoading(false);
    }
  };

  const handleRespond = async (interestId, status) => {
    try {
      await interestsAPI.respond(interestId, status);
      toast.success(`Interest ${status}!`);
      fetchInterests();
    } catch (error) {
      toast.error('Failed to respond to interest');
    }
  };

  const InterestCard = ({ interest, type }) => {
    const user = type === 'received' ? {
      id: interest.sender_id,
      name: interest.sender_name,
      photo: interest.sender_photo
    } : {
      id: interest.receiver_id,
      name: interest.receiver_name,
      photo: interest.receiver_photo
    };

    return (
      <Card className="p-6" data-testid={`interest-card-${interest.id}`}>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-stone-200 dark:bg-stone-800 flex-shrink-0 overflow-hidden">
            {user.photo ? (
              <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-stone-400" aria-hidden="true" />
              </div>
            )}
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <h3 className="font-heading font-semibold text-lg text-text-primary">
                {user.name}
              </h3>
              <Badge
                variant="outline"
                className={
                  interest.status === 'accepted'
                    ? 'border-accent-success text-accent-success'
                    : interest.status === 'rejected'
                    ? 'border-accent-error text-accent-error'
                    : 'border-accent-warning text-accent-warning'
                }
              >
                {interest.status === 'accepted' && (
                  <CheckCircle className="w-3 h-3 mr-1" aria-hidden="true" />
                )}
                {interest.status === 'rejected' && (
                  <XCircle className="w-3 h-3 mr-1" aria-hidden="true" />
                )}
                {interest.status === 'pending' && (
                  <Clock className="w-3 h-3 mr-1" aria-hidden="true" />
                )}
                {t(interest.status)}
              </Badge>
            </div>

            {interest.message && (
              <p className="text-sm text-text-secondary italic">"{interest.message}"</p>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => navigate(`/profile/${user.id}`)}
                data-testid={`view-profile-${interest.id}`}
              >
                {t('view_profile')}
              </Button>

              {type === 'received' && interest.status === 'pending' && (
                <>
                  <Button
                    className="bg-accent-success hover:bg-accent-success/90 text-white"
                    onClick={() => handleRespond(interest.id, 'accepted')}
                    data-testid={`accept-interest-${interest.id}`}
                  >
                    {t('accept')}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleRespond(interest.id, 'rejected')}
                    data-testid={`reject-interest-${interest.id}`}
                  >
                    {t('reject')}
                  </Button>
                </>
              )}

              {interest.status === 'accepted' && (
                <Button
                  className="bg-secondary hover:bg-secondary/90 text-white"
                  onClick={() => navigate(`/messages/${user.id}`)}
                  data-testid={`chat-btn-${interest.id}`}
                >
                  {t('chat_now')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark" data-testid="interests-page">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="font-heading font-bold text-3xl md:text-4xl text-text-primary mb-8">
          {t('interests')}
        </h1>

        <Tabs defaultValue="received" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="received" data-testid="tab-received">
              {t('received')} ({receivedInterests.length})
            </TabsTrigger>
            <TabsTrigger value="sent" data-testid="tab-sent">
              {t('sent')} ({sentInterests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="received" className="mt-6 space-y-4">
            {loading ? (
              <p className="text-center py-8 text-text-secondary">{t('loading')}</p>
            ) : receivedInterests.length === 0 ? (
              <p className="text-center py-8 text-text-secondary">{t('no_results')}</p>
            ) : (
              receivedInterests.map((interest) => (
                <InterestCard key={interest.id} interest={interest} type="received" />
              ))
            )}
          </TabsContent>

          <TabsContent value="sent" className="mt-6 space-y-4">
            {loading ? (
              <p className="text-center py-8 text-text-secondary">{t('loading')}</p>
            ) : sentInterests.length === 0 ? (
              <p className="text-center py-8 text-text-secondary">{t('no_results')}</p>
            ) : (
              sentInterests.map((interest) => (
                <InterestCard key={interest.id} interest={interest} type="sent" />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InterestsPage;
