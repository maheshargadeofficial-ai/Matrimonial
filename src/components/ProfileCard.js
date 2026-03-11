import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, GraduationCap, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ProfileCard = ({ user, onViewProfile, onSendInterest, showInterestButton = true }) => {
  const { t } = useTranslation();

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

  const photoUrl = user.photos && user.photos.length > 0 ? user.photos[0] : null;

  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-shadow bg-surface-light dark:bg-surface-dark"
      data-testid={`profile-card-${user.id}`}
    >
      <div className="aspect-[3/4] relative bg-stone-200 dark:bg-stone-800">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={`${user.name}'s profile`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Heart className="w-16 h-16 text-stone-400" aria-hidden="true" />
          </div>
        )}
        {user.verified && (
          <Badge
            className="absolute top-3 right-3 bg-accent-success text-white"
            data-testid="verified-badge"
          >
            Verified
          </Badge>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-heading font-semibold text-xl text-text-primary">
            {user.name}, {getAge(user.date_of_birth)}
          </h3>
          {user.disability_info && (
            <Badge variant="outline" className="mt-2">
              {t(user.disability_info.disability_type)}
            </Badge>
          )}
        </div>

        <div className="space-y-1 text-sm text-text-secondary">
          {user.city && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>{user.city}, {user.state}</span>
            </div>
          )}
          {user.education && (
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" aria-hidden="true" />
              <span>{user.education}</span>
            </div>
          )}
          {user.occupation && (
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" aria-hidden="true" />
              <span>{user.occupation}</span>
            </div>
          )}
        </div>

        {user.bio && (
          <p className="text-sm text-text-secondary line-clamp-2">{user.bio}</p>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onViewProfile(user.id)}
            data-testid={`view-profile-btn-${user.id}`}
          >
            {t('view_profile')}
          </Button>
          {showInterestButton && (
            <Button
              className="flex-1 bg-secondary hover:bg-secondary/90 text-white"
              onClick={() => onSendInterest(user.id)}
              data-testid={`send-interest-btn-${user.id}`}
            >
              <Heart className="w-4 h-4 mr-2" aria-hidden="true" />
              {t('send_interest')}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
