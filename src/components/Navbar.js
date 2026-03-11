import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { Heart, User, MessageCircle, Star, Settings, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav
      className="sticky top-0 z-50 bg-surface-light dark:bg-surface-dark border-b border-stone-200 dark:border-stone-800"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to={isAuthenticated ? '/dashboard' : '/'}
            className="flex items-center gap-2"
            data-testid="navbar-logo-link"
          >
            <Heart className="w-8 h-8 text-primary" aria-hidden="true" />
            <span className="font-heading font-bold text-xl text-primary">
              {t('app_name')}
            </span>
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/browse')}
                  data-testid="nav-browse-btn"
                  aria-label={t('browse_profiles')}
                >
                  <User className="w-5 h-5 mr-2" aria-hidden="true" />
                  {t('browse_profiles')}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/interests')}
                  data-testid="nav-interests-btn"
                  aria-label={t('interests')}
                >
                  <Star className="w-5 h-5 mr-2" aria-hidden="true" />
                  {t('interests')}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/messages')}
                  data-testid="nav-messages-btn"
                  aria-label={t('messages')}
                >
                  <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
                  {t('messages')}
                </Button>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="gap-2"
                    data-testid="user-menu-trigger"
                    aria-label="User menu"
                  >
                    <User className="w-5 h-5" aria-hidden="true" />
                    <span className="hidden sm:inline">{user?.name}</span>
                    <Menu className="w-4 h-4 md:hidden" aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => navigate('/profile')}
                    data-testid="menu-profile"
                  >
                    <User className="w-4 h-4 mr-2" aria-hidden="true" />
                    {t('my_profile')}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate('/matches')}
                    data-testid="menu-matches"
                  >
                    <Heart className="w-4 h-4 mr-2" aria-hidden="true" />
                    {t('matches')}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate('/settings')}
                    data-testid="menu-settings"
                  >
                    <Settings className="w-4 h-4 mr-2" aria-hidden="true" />
                    {t('settings')}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    data-testid="menu-logout"
                    className="text-accent-error"
                  >
                    <LogOut className="w-4 h-4 mr-2" aria-hidden="true" />
                    {t('logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={() => navigate('/login')}
                data-testid="nav-login-btn"
              >
                {t('login')}
              </Button>
              <Button
                onClick={() => navigate('/register')}
                className="bg-primary hover:bg-primary/90 text-white rounded-full"
                data-testid="nav-register-btn"
              >
                {t('get_started')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
