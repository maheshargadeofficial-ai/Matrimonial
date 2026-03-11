import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { profileAPI } from '@/services/api';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Upload, X } from 'lucide-react';

const ProfileEditPage = () => {
  const { t } = useTranslation();
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [photoUrls, setPhotoUrls] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    state: '',
    education: '',
    occupation: '',
    income: '',
    marital_status: 'never_married',
    height: '',
    religion: '',
    bio: '',
    disability_info: {
      disability_type: '',
      percentage: '',
      description: '',
      assistance_required: ''
    },
    preferences: {
      min_age: 21,
      max_age: 50,
      preferred_location: [],
      religion: ''
    },
    family_info: {
      father_name: '',
      mother_name: '',
      siblings: 0,
      family_type: '',
      family_values: ''
    }
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        city: user.city || '',
        state: user.state || '',
        education: user.education || '',
        occupation: user.occupation || '',
        income: user.income || '',
        marital_status: user.marital_status || 'never_married',
        height: user.height || '',
        religion: user.religion || '',
        bio: user.bio || '',
        disability_info: user.disability_info || {
          disability_type: '',
          percentage: '',
          description: '',
          assistance_required: ''
        },
        preferences: user.preferences || {
          min_age: 21,
          max_age: 50,
          preferred_location: [],
          religion: ''
        },
        family_info: user.family_info || {
          father_name: '',
          mother_name: '',
          siblings: 0,
          family_type: '',
          family_values: ''
        }
      });
      setPhotoUrls(user.photos || []);
    }
  }, [user]);

  const handlePhotoUrlAdd = () => {
    const url = prompt('Enter photo URL:');
    if (url) {
      setPhotoUrls([...photoUrls, url]);
    }
  };

  const handlePhotoRemove = (index) => {
    setPhotoUrls(photoUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await profileAPI.updateProfile({
        ...formData,
        photos: photoUrls
      });
      updateUser(response.data);
      toast.success('Profile updated successfully!');
      navigate('/profile');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark py-8" data-testid="profile-edit-page">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-heading font-bold text-3xl md:text-4xl text-text-primary mb-8">
          {t('edit_profile')}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('name')}</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    data-testid="edit-name-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('phone')}</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    data-testid="edit-phone-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">{t('city')}</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    data-testid="edit-city-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">{t('state')}</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    data-testid="edit-state-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    placeholder="e.g., 5'6&quot;"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="marital-status">Marital Status</Label>
                  <Select
                    value={formData.marital_status}
                    onValueChange={(value) => setFormData({ ...formData, marital_status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never_married">Never Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="religion">Religion</Label>
                <Input
                  id="religion"
                  value={formData.religion}
                  onChange={(e) => setFormData({ ...formData, religion: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="education">{t('education')}</Label>
                <Input
                  id="education"
                  placeholder="e.g., B.Tech, MBA"
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="occupation">{t('occupation')}</Label>
                  <Input
                    id="occupation"
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="income">Annual Income</Label>
                  <Input
                    id="income"
                    placeholder="e.g., 5-10 LPA"
                    value={formData.income}
                    onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Disability Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="disability-type">{t('disability_type')}</Label>
                <Select
                  value={formData.disability_info.disability_type}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      disability_info: { ...formData.disability_info, disability_type: value }
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="locomotor">{t('locomotor')}</SelectItem>
                    <SelectItem value="visual">{t('visual')}</SelectItem>
                    <SelectItem value="hearing">{t('hearing')}</SelectItem>
                    <SelectItem value="speech">{t('speech')}</SelectItem>
                    <SelectItem value="cognitive">{t('cognitive')}</SelectItem>
                    <SelectItem value="multiple">{t('multiple')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="disability-percentage">Disability Percentage</Label>
                <Input
                  id="disability-percentage"
                  type="number"
                  placeholder="e.g., 40"
                  value={formData.disability_info.percentage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      disability_info: { ...formData.disability_info, percentage: e.target.value }
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="disability-desc">Description</Label>
                <Textarea
                  id="disability-desc"
                  value={formData.disability_info.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      disability_info: { ...formData.disability_info, description: e.target.value }
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Photos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {photoUrls.map((url, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                    <img src={url} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handlePhotoRemove(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      data-testid={`remove-photo-${index}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {photoUrls.length < 6 && (
                  <button
                    type="button"
                    onClick={handlePhotoUrlAdd}
                    className="aspect-square rounded-lg border-2 border-dashed border-stone-300 flex flex-col items-center justify-center hover:border-primary transition-colors"
                    data-testid="add-photo-btn"
                  >
                    <Upload className="w-8 h-8 text-stone-400 mb-2" />
                    <span className="text-sm text-stone-500">Add Photo</span>
                  </button>
                )}
              </div>
              <p className="text-sm text-text-secondary">Add up to 6 photos (Enter image URL)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Write about yourself, your interests, what you're looking for in a partner..."
                rows={6}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                data-testid="edit-bio-textarea"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Family Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="father-name">Father's Name</Label>
                  <Input
                    id="father-name"
                    value={formData.family_info.father_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        family_info: { ...formData.family_info, father_name: e.target.value }
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mother-name">Mother's Name</Label>
                  <Input
                    id="mother-name"
                    value={formData.family_info.mother_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        family_info: { ...formData.family_info, mother_name: e.target.value }
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siblings">Number of Siblings</Label>
                  <Input
                    id="siblings"
                    type="number"
                    value={formData.family_info.siblings}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        family_info: { ...formData.family_info, siblings: parseInt(e.target.value) || 0 }
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="family-type">Family Type</Label>
                  <Select
                    value={formData.family_info.family_type}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        family_info: { ...formData.family_info, family_type: value }
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nuclear">Nuclear</SelectItem>
                      <SelectItem value="joint">Joint</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-white"
              disabled={loading}
              data-testid="save-profile-btn"
            >
              {loading ? t('loading') : t('save')}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/profile')}
              data-testid="cancel-edit-btn"
            >
              {t('cancel')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditPage;
