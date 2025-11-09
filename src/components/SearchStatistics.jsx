import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Search } from 'lucide-react';

const SearchStatistics = ({ results, notFoundParts, searchTerms }) => {
  const { t } = useTranslation();
  const totalSearched = searchTerms.filter(t => t).length;
  const totalFound = new Set(results.map(r => r.part_number.toUpperCase())).size;
  const totalNotFound = notFoundParts.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('productSearch.searchSummary')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-gray-100 rounded-lg">
            <Search className="mx-auto h-8 w-8 text-gray-500 mb-2" />
            <p className="text-2xl font-bold">{totalSearched}</p>
            <p className="text-sm text-gray-600">{t('productSearch.totalSearched')}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <CheckCircle className="mx-auto h-8 w-8 text-green-600 mb-2" />
            <p className="text-2xl font-bold">{totalFound}</p>
            <p className="text-sm text-green-700">{t('productSearch.partsFound')}</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <XCircle className="mx-auto h-8 w-8 text-red-600 mb-2" />
            <p className="text-2xl font-bold">{totalNotFound}</p>
            <p className="text-sm text-red-700">{t('productSearch.partsNotFound')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchStatistics;