import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AdvancedSearchFilters = ({ filters, onFiltersChange, availableConditions, availableAircraft, availableLocations }) => {
  const { t } = useTranslation();

  const conditionLabels = {
    new: t('productSearch.conditions.new'),
    oh: t('productSearch.conditions.oh'),
    sv: t('productSearch.conditions.sv'),
    ar: t('productSearch.conditions.ar'),
    rep: t('productSearch.conditions.rep'),
    used: t('productSearch.conditions.used'),
    repair: t('productSearch.conditions.repair')
  };

  const handleFilterChange = (filterName, value) => {
    onFiltersChange(prev => ({ ...prev, [filterName]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('productSearch.advancedFilters')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label>{t('productSearch.condition')}</Label>
            <Select value={filters.condition || ''} onValueChange={(v) => handleFilterChange('condition', v)}>
              <SelectTrigger><SelectValue placeholder={t('productSearch.selectCondition')} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('productSearch.allConditions')}</SelectItem>
                {availableConditions.map(cond => (
                  <SelectItem key={cond} value={cond}>{conditionLabels[cond] || cond}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>{t('productSearch.aircraft')}</Label>
            <Select value={filters.aircraft || ''} onValueChange={(v) => handleFilterChange('aircraft', v)}>
              <SelectTrigger><SelectValue placeholder={t('productSearch.selectAircraft')} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('productSearch.allAircraft')}</SelectItem>
                {availableAircraft.map(ac => <SelectItem key={ac} value={ac}>{ac}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>{t('productSearch.location')}</Label>
            <Select value={filters.location || ''} onValueChange={(v) => handleFilterChange('location', v)}>
              <SelectTrigger><SelectValue placeholder={t('productSearch.selectLocation')} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('productSearch.allLocations')}</SelectItem>
                {availableLocations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="min-quantity">{t('productSearch.minQuantity')}</Label>
            <Input
              id="min-quantity"
              type="number"
              placeholder="e.g., 5"
              value={filters.minQuantity || ''}
              onChange={(e) => handleFilterChange('minQuantity', e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedSearchFilters;