import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Dropdown language switcher (EN, ES, DE, FR)
const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const current = i18n.language.split('-')[0];
  const handleChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Select value={current} onValueChange={handleChange}>
      <SelectTrigger className="w-28 h-9 text-sm bg-white/70 backdrop-blur border-neutral-200">
        <SelectValue placeholder="Lang" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="es">Español</SelectItem>
        <SelectItem value="de">Deutsch</SelectItem>
        <SelectItem value="fr">Français</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;