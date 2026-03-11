import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { profileAPI, interestsAPI } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Heart, MapPin, GraduationCap, Briefcase, Home, Users, ArrowLeft, MessageCircle } from 'lucide-react';

const ProfileViewPage = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchProfile();
    } else if (currentUser) {
      setProfile(currentUser);
      setLoading(false);
    }
  }, [userId, currentUser]);

  const fetchProfile = async () => {
    try {
      const response = await profileAPI.getProfile(userId);
      setProfile(response.data);
    } catch (error) {
      toast.error('Failed to load profile');
      navigate('/browse');
    } finally {
      setLoading(false);
    }
  };

  const handleSendInterest = async () => {
    try {
      await interestsAPI.send(profile.id, 'I would like to connect with you!');
      toast.success('Interest sent successfully!');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to send interest');
    }
  };

  const getAge = (dob) => {
    if (!dob) return 'N/A';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-secondary">{t('loading')}</p>
      </div>
    );
  }

  if (!profile) return null;

  const isOwnProfile = !userId || currentUser?.id === profile.id;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark py-8" data-testid="profile-view-page">
      <div className="max-w-5xl mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
          data-testid="back-btn"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card className="overflow-hidden">
              <div className="aspect-[3/4] bg-stone-200 dark:bg-stone-800">
                {profile.photos && profile.photos.length > 0 ? (
                  <img
                    src={profile.photos[0]}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Heart className="w-16 h-16 text-stone-400" />
                  </div>
                )}
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h1 className="font-heading font-bold text-2xl text-text-primary">
                    {profile.name}, {getAge(profile.date_of_birth)}
                  </h1>
                  {profile.verified && (
                    <Badge className="mt-2 bg-accent-success text-white">Verified</Badge>
                  )}
                </div>

                {!isOwnProfile && (
                  <div className="space-y-2">
                    <Button
                      onClick={handleSendInterest}
                      className="w-full bg-secondary hover:bg-secondary/90 text-white"
                      data-testid="send-interest-btn"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      {t('send_interest')}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate(`/messages/${profile.id}`)}
                      data-testid="send-message-btn"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                )}

                {isOwnProfile && (
                  <Button
                    onClick={() => navigate('/profile/edit')}
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    data-testid="edit-profile-btn"
                  >
                    {t('edit_profile')}
                  </Button>
                )}
              </div>
            </Card>

            {profile.photos && profile.photos.length > 1 && (
              <Card className="p-4">
                <h3 className="font-heading font-semibold mb-3">More Photos</h3>
                <div className="grid grid-cols-2 gap-2">
                  {profile.photos.slice(1).map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Photo ${index + 2}`}
                      className="aspect-square rounded-lg object-cover"
                    />
                  ))}
                </div>
              </Card>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="font-heading font-bold text-xl mb-4">Basic Information</h2>
              <div className="space-y-3">
                {profile.city && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-text-primary">Location</p>
                      <p className="text-text-secondary">
                        {profile.city}, {profile.state}
                      </p>
                    </div>
                  </div>
                )}
                {profile.education && (
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-text-primary">{t('education')}</p>
                      <p className="text-text-secondary">{profile.education}</p>
                    </div>
                  </div>
                )}
                {profile.occupation && (
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-text-primary">{t('occupation')}</p>
                      <p className="text-text-secondary">{profile.occupation}</p>
                      {profile.income && (
                        <p className="text-sm text-text-secondary mt-1">Income: {profile.income}</p>
                      )}
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">Details</p>
                    <p className="text-text-secondary">
                      Height: {profile.height || 'Not specified'} | Marital Status:{' '}
                      {profile.marital_status?.replace('_', ' ') || 'Not specified'}
                    </p>
                    {profile.religion && (
                      <p className="text-text-secondary">Religion: {profile.religion}</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {profile.disability_info && profile.disability_info.disability_type && (
              <Card className="p-6">
                <h2 className="font-heading font-bold text-xl mb-4">Disability Information</h2>
                <div className="space-y-2">
                  <div>
                    <p className="font-medium text-text-primary">Type</p>
                    <Badge variant="outline" className="mt-1">
                      {t(profile.disability_info.disability_type)}
                    </Badge>
                  </div>
                  {profile.disability_info.percentage && (
                    <div>
                      <p className="font-medium text-text-primary">Percentage</p>
                      <p className="text-text-secondary">{profile.disability_info.percentage}%</p>
                    </div>
                  )}
                  {profile.disability_info.description && (
                    <div>
                      <p className="font-medium text-text-primary">Description</p>
                      <p className="text-text-secondary">{profile.disability_info.description}</p>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {profile.bio && (
              <Card className="p-6">
                <h2 className="font-heading font-bold text-xl mb-4">About Me</h2>
                <p className="text-text-secondary leading-relaxed">{profile.bio}</p>
              </Card>
            )}

            {profile.family_info && (
              <Card className="p-6">
                <h2 className="font-heading font-bold text-xl mb-4">
                  <Home className="w-5 h-5 inline mr-2" />
                  Family Information
                </h2>
                <div className="space-y-2">
                  {profile.family_info.father_name && (
                    <p className="text-text-secondary">
                      <span className="font-medium">Father:</span> {profile.family_info.father_name}
                    </p>
                  )}
                  {profile.family_info.mother_name && (
                    <p className="text-text-secondary">
                      <span className="font-medium">Mother:</span> {profile.family_info.mother_name}
                    </p>
                  )}
                  {profile.family_info.siblings !== undefined && (
                    <p className="text-text-secondary">
                      <span className="font-medium">Siblings:</span> {profile.family_info.siblings}
                    </p>
                  )}
                  {profile.family_info.family_type && (
                    <p className="text-text-secondary">
                      <span className="font-medium">Family Type:</span>{' '}
                      {profile.family_info.family_type}
                    </p>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileViewPage;
