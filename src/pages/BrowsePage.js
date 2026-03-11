import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usersAPI, interestsAPI } from '@/services/api';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import ProfileCard from '@/components/ProfileCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

const BrowsePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    disability_type: '',
    city: '',
    state: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (filterParams = {}) => {
    try {
      setLoading(true);
      const response = await usersAPI.browse(filterParams);
      setUsers(response.data);
    } catch (error) {
      toast.error('Failed to load profiles');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const activeFilters = {};
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        activeFilters[key] = filters[key];
      }
    });
    fetchUsers(activeFilters);
  };

  const handleSendInterest = async (userId) => {
    try {
      await interestsAPI.send(userId, 'I would like to connect with you!');
      toast.success(t('send_interest') + ' successful!');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to send interest');
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark" data-testid="browse-page">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-text-primary mb-4">
            {t('browse_profiles')}
          </h1>
          
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-semibold text-lg">
                <Filter className="w-5 h-5 inline mr-2" aria-hidden="true" />
                Filters
              </h2>
              <Button
                variant="ghost"
                onClick={() => setShowFilters(!showFilters)}
                data-testid="toggle-filters-btn"
              >
                {showFilters ? 'Hide' : 'Show'}
              </Button>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>{t('disability_type')}</Label>
                  <Select
                    value={filters.disability_type}
                    onValueChange={(value) => setFilters({ ...filters, disability_type: value })}
                  >
                    <SelectTrigger data-testid="filter-disability-select">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All</SelectItem>
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
                  <Label>{t('city')}</Label>
                  <Input
                    value={filters.city}
                    onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                    placeholder="Enter city"
                    data-testid="filter-city-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label>{t('state')}</Label>
                  <Input
                    value={filters.state}
                    onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                    placeholder="Enter state"
                    data-testid="filter-state-input"
                  />
                </div>
              </div>
            )}

            <Button
              onClick={handleSearch}
              className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white"
              data-testid="search-btn"
            >
              <Search className="w-4 h-4 mr-2" aria-hidden="true" />
              Search
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-text-secondary">{t('loading')}</p>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-secondary">{t('no_results')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="profiles-grid">
            {users.map((user) => (
              <ProfileCard
                key={user.id}
                user={user}
                onViewProfile={(id) => navigate(`/profile/${id}`)}
                onSendInterest={handleSendInterest}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;
