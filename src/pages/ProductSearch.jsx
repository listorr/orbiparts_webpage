import React, { useState, useEffect, useMemo, useCallback } from 'react';
// Replacing Helmet with internal SEO component
import { SEO } from '@/components/SEO';
import { motion } from 'framer-motion';
import { Search, Loader2, Inbox, ServerCrash, Mail, ChevronDown, ChevronUp, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';

const ProductSearch = () => {
  const { t, i18n } = useTranslation();
  const [searchMode, setSearchMode] = useState('single');
  const [searchTerm, setSearchTerm] = useState('');
  const [bulkTerms, setBulkTerms] = useState('');
  const [parsedBulkTerms, setParsedBulkTerms] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [expandedGroups, setExpandedGroups] = useState({});
  const [notFoundParts, setNotFoundParts] = useState([]);
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  const [selectedNotFoundParts, setSelectedNotFoundParts] = useState({});
  const [notFoundPartDetails, setNotFoundPartDetails] = useState({}); // {partNumber: {quantity: 1, condition: 'new'}}
  const [selectedQuantities, setSelectedQuantities] = useState({}); // {itemId: quantity}
  const [quoteForm, setQuoteForm] = useState({
    company: '',
    deliveryPlace: '',
    condition: '',
    expectedLeadTime: '',
    comments: ''
  });
  
  // Estados para partes que ORBIPARTS está buscando comprar
  const [wantedParts, setWantedParts] = useState([]);
  const [loadingWantedParts, setLoadingWantedParts] = useState(true);
  const [showWantedParts, setShowWantedParts] = useState(true);
  const formatUSD = useCallback((n) => {
    if (n === null || n === undefined || Number.isNaN(n)) return '—';
    try {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
    } catch {
      return `$${n}`;
    }
  }, []);
  // Inventory KPI states (from Supabase)
  const [inventoryMetrics, setInventoryMetrics] = useState({
    totalItems: null,
    inStockItems: null,
    distinctPartNumbers: null,
    categories: [],
    loading: false,
    error: null
  });

  const conditionLabels = useMemo(() => ({
    new: t('productSearch.conditions.new'), 
    oh: t('productSearch.conditions.oh'), 
    sv: t('productSearch.conditions.sv'), 
    ar: t('productSearch.conditions.ar'), 
    rep: t('productSearch.conditions.rep'), 
    used: t('productSearch.conditions.used'), 
    repair: t('productSearch.conditions.repair')
  }), [t]);

  const conditionColors = useMemo(() => ({
    new: 'bg-green-100 text-green-800', 
    oh: 'bg-blue-100 text-blue-800', 
    sv: 'bg-yellow-100 text-yellow-800', 
    ar: 'bg-gray-100 text-gray-800', 
    rep: 'bg-orange-100 text-orange-800', 
    used: 'bg-purple-100 text-purple-800', 
    repair: 'bg-orange-100 text-orange-800'
  }), []);

  const parseBulkInput = useCallback((input) => {
    return input
      .split(/[\s,;\n]+/)
      .map(term => term.trim().toUpperCase())
      .filter(term => term.length > 0);
  }, []);

  useEffect(() => {
    setParsedBulkTerms(parseBulkInput(bulkTerms));
  }, [bulkTerms, parseBulkInput]);

  // Fetch inventory KPIs from Supabase (public_stock view from Quote Hub)
  useEffect(() => {
    const fetchInventoryMetrics = async () => {
      setInventoryMetrics(prev => ({ ...prev, loading: true }));
      try {
        // Fetch all stock items minimal fields to compute metrics
        const { data, error } = await supabase
          .from('public_stock')
          .select('id, part_number, trade_type, category');
        if (error) throw error;
        const totalItems = data.length;
        // Count items available for sale (all items in view are for sale)
        const inStockItems = data.length;
        const distinctPartNumbers = new Set(data.map(c => c.part_number)).size;
        const categoriesCount = data.reduce((map, c) => {
          if (c.category) map[c.category] = (map[c.category] || 0) + 1;
          return map;
        }, {});
        const categoriesSorted = Object.entries(categoriesCount)
          .sort((a,b) => b[1]-a[1])
          .map(([name, count]) => ({ name, count }));
        setInventoryMetrics({
          totalItems,
          inStockItems,
          distinctPartNumbers,
          categories: categoriesSorted.slice(0,6),
          loading: false,
          error: null
        });
      } catch (err) {
        setInventoryMetrics(prev => ({ ...prev, loading: false, error: err.message }));
      }
    };
    fetchInventoryMetrics();
  }, []);

  // Cargar partes que ORBIPARTS está buscando comprar
  useEffect(() => {
    const fetchWantedParts = async () => {
      setLoadingWantedParts(true);
      try {
        // Intentar cargar desde Supabase primero
        const { data: supabaseData, error } = await supabase
          .from('wanted_parts')
          .select('*')
          .eq('active', true)
          .order('urgency', { ascending: false })
          .order('created_at', { ascending: false })
          .limit(10);

        let partsToShow = [];

        if (error || !supabaseData || supabaseData.length === 0) {
          // Si no hay datos en Supabase, usar datos de ejemplo
          // Fallback to mock data when Supabase returns empty or errors in local dev
          partsToShow = [
            {
              id: 1,
              part_number: 'NAS6604-6',
              description: 'Screw, Machine, Pan Head',
              quantity_needed: 50,
              max_price: 15.00,
              condition_accepted: ['new', 'oh', 'sv'],
              urgency: 'high',
              notes: 'Needed for AOG situation - Boeing 737 fleet',
              active: true
            },
            {
              id: 2,
              part_number: '737-45789-01',
              description: 'Actuator Assembly, Landing Gear',
              quantity_needed: 2,
              max_price: 25000.00,
              condition_accepted: ['new', 'oh'],
              urgency: 'medium',
              notes: 'Regular maintenance program',
              active: true
            },
            {
              id: 3,
              part_number: 'MS21919WDG4',
              description: 'Clamp Assembly, Wire Bundle',
              quantity_needed: 25,
              max_price: 75.00,
              condition_accepted: ['new', 'oh', 'sv', 'ar'],
              urgency: 'low',
              notes: 'Stock replenishment for Airbus A320 fleet',
              active: true
            },
            {
              id: 4,
              part_number: 'BAC-J41-123',
              description: 'Hydraulic Filter Element',
              quantity_needed: 10,
              max_price: 450.00,
              condition_accepted: ['new', 'oh'],
              urgency: 'high',
              notes: 'Critical for maintenance program',
              active: true
            }
          ];
        } else {
          partsToShow = supabaseData;
        }
        
        setWantedParts(partsToShow);
      } catch (error) {
        console.error('Error fetching wanted parts:', error);
        toast({
          variant: "destructive",
          title: t('productSearch.wanted.errorTitle', 'Error loading wanted parts'),
          description: t('productSearch.wanted.errorDesc', "Could not load the parts we're looking to purchase.")
        });
      } finally {
        setLoadingWantedParts(false);
      }
    };

    fetchWantedParts();
  }, []);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    
    const termsToSearch = searchMode === 'single' ? [searchTerm.trim()] : parsedBulkTerms;
    if (termsToSearch.every(term => term === '')) {
      toast({ 
        variant: "destructive", 
        title: t('productSearch.fillRequired'), 
        description: t('productSearch.selectItems')
      });
      return;
    }

    setLoading(true);
    setError(null);
    
    // LIMPIEZA COMPLETA Y AGRESIVA del estado anterior
    setResults([]);
    setNotFoundParts([]);
    setSelectedItems({});
    setSelectedNotFoundParts({});
    setNotFoundPartDetails({});
    setSelectedQuantities({});
    setExpandedGroups({});
    setQuoteDialogOpen(false);
    
    // Forzar múltiples re-renders para asegurar limpieza
    await new Promise(resolve => setTimeout(resolve, 10));
    setHasSearched(false);
    await new Promise(resolve => setTimeout(resolve, 10));
    setHasSearched(true);

    try {
      const { data, error } = await supabase
        .from('public_stock')
        .select('*')
        .in('part_number', termsToSearch.map(t => t.toUpperCase()));

      if (error) throw error;
      
      // Identify parts that were not found - usar Set para evitar duplicados
      const foundPartsSet = new Set(data?.map(item => item.part_number.toUpperCase()) || []);
      const notFound = termsToSearch
        .map(term => term.toUpperCase())
        .filter(term => !foundPartsSet.has(term))
        .filter((term, index, array) => array.indexOf(term) === index);
      
      // Asegurar que se establecen los nuevos resultados SOLAMENTE
      setResults(data || []);
      setNotFoundParts(notFound);
      
      // Limpiar cualquier selección residual que pueda haber quedado
      setSelectedItems({});
      setSelectedNotFoundParts({});
      setNotFoundPartDetails({});
      setSelectedQuantities({});

    } catch (e) {
      setError(t('productSearch.quoteError'));
      console.error("Search error:", e);
      
      // Limpiar todo en caso de error también
      setResults([]);
      setNotFoundParts([]);
      setSelectedItems({});
      setSelectedNotFoundParts({});
      setNotFoundPartDetails({});
      setSelectedQuantities({});
      
      toast({ 
        variant: "destructive", 
        title: t('productSearch.quoteError'), 
        description: e.message 
      });
    } finally {
      setLoading(false);
    }
  };

  const groupedResults = useMemo(() => {
    if (!results) return [];
    const groups = results.reduce((acc, item) => {
      const key = item.part_number;
      if (!acc[key]) {
        acc[key] = {
          part_number: item.part_number,
          description: item.description,
          items: [],
          totalQuantity: 0
        };
      }
      acc[key].items.push(item);
      acc[key].totalQuantity += item.quantity || 1;
      return acc;
    }, {});
    return Object.values(groups);
  }, [results]);

  const toggleGroupExpansion = (partNumber) => {
    setExpandedGroups(prev => ({
      ...prev,
      [partNumber]: !prev[partNumber]
    }));
  };

  const handleSelect = (itemId, checked) => {
    setSelectedItems(prev => {
      const newSelected = { ...prev };
      if (checked) {
        newSelected[itemId] = true;
      } else {
        delete newSelected[itemId];
      }
      return newSelected;
    });
  };

  const handleNotFoundSelect = (partNumber, checked) => {
    setSelectedNotFoundParts(prev => {
      const newSelected = { ...prev };
      if (checked) {
        newSelected[partNumber] = true;
      } else {
        delete newSelected[partNumber];
      }
      return newSelected;
    });
  };

  const handleSelectAll = () => {
    // Verificar si todas las partes están seleccionadas
    const allAvailableSelected = results.length > 0 && results.every(item => selectedItems[item.id]);
    const allNotFoundSelected = notFoundParts.length > 0 && notFoundParts.every(pn => selectedNotFoundParts[pn]);
    const allSelected = allAvailableSelected && allNotFoundSelected;
    
    if (allSelected) {
      // Si todo está seleccionado, deseleccionar todo
      setSelectedItems({});
      setSelectedNotFoundParts({});
      setSelectedQuantities({});
    } else {
      // Si no todo está seleccionado, seleccionar todo
      if (results.length > 0) {
        const allIds = results.reduce((acc, item) => {
          acc[item.id] = true;
          return acc;
        }, {});
        setSelectedItems(allIds);
      }
      
      if (notFoundParts.length > 0) {
        const allNotFound = notFoundParts.reduce((acc, partNumber) => {
          acc[partNumber] = true;
          return acc;
        }, {});
        setSelectedNotFoundParts(allNotFound);
      }
    }
  };

  // Generar ID único para RFQ
  const generateRFQId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `RFQ-${timestamp}-${random}`;
  };

  const handleQuoteSubmit = () => {
    const selectedComponentIds = Object.keys(selectedItems);
    const selectedNotFoundIds = Object.keys(selectedNotFoundParts);
    
    if (selectedComponentIds.length === 0 && selectedNotFoundIds.length === 0) {
      toast({ 
        variant: "destructive", 
        title: t('productSearch.selectItems'), 
        description: t('productSearch.selectItems')
      });
      return;
    }

    if (!quoteForm.company || !quoteForm.deliveryPlace || !quoteForm.condition || !quoteForm.expectedLeadTime) {
      toast({ 
        variant: "destructive", 
        title: t('productSearch.fillRequired'), 
        description: t('productSearch.fillRequired')
      });
      return;
    }

    const itemsToQuote = results.filter(item => selectedComponentIds.includes(item.id.toString()));
    const notFoundToQuote = notFoundParts.filter(partNumber => selectedNotFoundIds.includes(partNumber));
    const date = new Date().toLocaleDateString('en-US');
    const rfqId = generateRFQId();
    const subject = `RFQ ${rfqId} - Request for Quote ${date}`;
    
    let body = `Dear OrbiParts Team,\n\nI would like to request a quote for the following components:\n\nRFQ ID: ${rfqId}\nDate: ${date}\n\n`;
    
    // Available items - CON CANTIDAD PERSONALIZADA SI SE ESPECIFICA
    if (itemsToQuote.length > 0) {
      body += "AVAILABLE ITEMS:\n";
      itemsToQuote.forEach(item => {
        const selectedQty = selectedQuantities[item.id] || item.quantity || 1;
        body += `P/N: ${item.part_number} - Qty: ${selectedQty} - Condition: ${conditionLabels[item.condition] || item.condition}`;
        if (item.serial_number) body += ` - S/N: ${item.serial_number}`;
        if (item.location) body += ` - Location: ${item.location}`;
        body += "\n";
      });
      body += "\n";
    }

    // Not found items - CON CANTIDAD Y CONDICIÓN PERSONALIZADA
    if (notFoundToQuote.length > 0) {
      body += "ITEMS NOT IN CURRENT STOCK (Please source from your extended network):\n";
      notFoundToQuote.forEach(partNumber => {
        const details = notFoundPartDetails[partNumber] || { quantity: 1, condition: 'new' };
        const conditionLabel = conditionLabels[details.condition] || details.condition;
        body += `P/N: ${partNumber} - Qty: ${details.quantity} - Preferred Condition: ${conditionLabel}\n`;
      });
      body += "\n";
    }

    body += "CUSTOMER INFORMATION:\n";
    body += `Company: ${quoteForm.company}\n`;
    body += `Delivery Place: ${quoteForm.deliveryPlace}\n`;
    body += `Expected Lead Time: ${quoteForm.expectedLeadTime}\n`;
    
    if (quoteForm.comments) {
      body += `Comments: ${quoteForm.comments}\n`;
    }
    
    body += `\nPlease reference RFQ ID: ${rfqId} in your response.\n\nBest regards,\n`;

    const mailtoLink = `mailto:rfq@orbiparts.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    
    setQuoteDialogOpen(false);
    toast({
      title: t('productSearch.quoteSent'),
      description: `RFQ ${rfqId} sent successfully`
    });
  };

  const openQuoteDialog = () => {
    setQuoteDialogOpen(true);
  };

  // Función para generar oferta de venta hacia ORBIPARTS
  const handleSellToOrbiparts = (wantedPart) => {
    const subject = `SALE OFFER - ${wantedPart.part_number} - Available for Sale`;
    const body = `Dear ORBIPARTS Procurement Team,

I have the following part available for sale that matches your current requirements:

PART INFORMATION:
P/N: ${wantedPart.part_number}
Description: ${wantedPart.description}
Your Requirement: ${wantedPart.quantity_needed} units
Your Max Price: $${wantedPart.max_price}
Accepted Conditions: ${wantedPart.condition_accepted.join(', ')}

MY OFFER:
Quantity Available: [Please specify]
Condition: [Please specify: ${wantedPart.condition_accepted.join(' / ')}]
Price per Unit: $[Your price]
Location: [Your location]
Lead Time: [Your lead time]
Certificates: [Available certificates]

Additional Notes:
${wantedPart.notes}

Please let me know if you're interested in this offer.

Best regards,`;

    const mailtoLink = `mailto:procurement@orbiparts.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    
    toast({
      title: t('productSearch.wanted.offerToastTitle', 'Sell Offer Email Generated'),
      description: t('productSearch.wanted.offerToastDesc', 'Your email client should open with a pre-filled offer for {{pn}}', { pn: wantedPart.part_number })
    });
  };

  // Simple statistics - CORREGIDO
  const stats = useMemo(() => {
    if (!results || results.length === 0) return null;
    
    const uniqueParts = new Set(results.map(item => item.part_number)).size;
    const totalQuantity = results.reduce((sum, item) => sum + (item.quantity || 1), 0);
    
    // CORREGIR: Usar los términos de la búsqueda actual
    const currentSearchTerms = searchMode === 'single' 
      ? (searchTerm.trim() ? [searchTerm.trim()] : [])
      : parsedBulkTerms;
    
    const termsSearched = currentSearchTerms.length;
    const foundRate = termsSearched > 0 ? Math.round((uniqueParts / termsSearched) * 100) : 0;
    
    return { uniqueParts, totalQuantity, foundRate, totalItems: results.length, termsSearched };
  }, [results, searchMode, searchTerm, parsedBulkTerms]);

  return (
    <>
      <SEO
        title={`${t('productSearch.title')} - ORBIPARTS`}
        description={t('productSearch.subtitle')}
        canonical={`https://orbiparts.com/stock`}
        breadcrumbs={[
          { name: t('nav.home'), url: 'https://orbiparts.com/' },
          { name: t('nav.stock'), url: 'https://orbiparts.com/stock' }
        ]}
      />

      <div className="min-h-screen pt-16 bg-gray-50">
        <section className="py-14 md:py-20 bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">{t('productSearch.inventoryHeading', 'Aircraft Parts Inventory')}</h1>
              <p className="text-base md:text-lg text-gray-600 mb-6 max-w-3xl">{t('productSearch.inventorySubheading', 'Real-time searchable catalog of certified aircraft components and rotables. Bulk multi-part querying supported.')}</p>
              {/* KPI Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">{t('productSearch.kpi.totalRecords')}</div>
                  <div className="text-2xl font-bold text-gray-900">{inventoryMetrics.loading ? '—' : inventoryMetrics.totalItems ?? '—'}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">{t('productSearch.kpi.inStock')}</div>
                  <div className="text-2xl font-bold text-green-700">{inventoryMetrics.loading ? '—' : inventoryMetrics.inStockItems ?? '—'}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">{t('productSearch.kpi.distinctPN')}</div>
                  <div className="text-2xl font-bold text-blue-700">{inventoryMetrics.loading ? '—' : inventoryMetrics.distinctPartNumbers ?? '—'}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">{t('productSearch.kpi.inStockRate')}</div>
                  <div className="text-2xl font-bold text-indigo-700">{
                    inventoryMetrics.loading || !inventoryMetrics.totalItems ? '—' :
                    `${Math.round((inventoryMetrics.inStockItems / Math.max(1, inventoryMetrics.totalItems)) * 100)}%`
                  }</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">{t('productSearch.kpi.topCategories')}</div>
                  <div className="text-sm font-medium text-gray-800 line-clamp-3">
                    {inventoryMetrics.loading && t('productSearch.loadingShort', 'Loading…')}
                    {!inventoryMetrics.loading && inventoryMetrics.categories.length === 0 && '—'}
                    {!inventoryMetrics.loading && inventoryMetrics.categories.length > 0 && inventoryMetrics.categories.map(cat => cat.name).join(', ')}
                  </div>
                </div>
              </div>
              {/* Category Ratio (mini bars) */}
              {!inventoryMetrics.loading && inventoryMetrics.categories.length > 0 && (
                <div className="mb-8">
                  <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">{t('productSearch.kpi.categoryRatio', 'Category Ratio')}</div>
                  <div className="space-y-2">
                    {inventoryMetrics.categories.map(cat => {
                      const percent = Math.round(((cat.count || 0) / Math.max(1, inventoryMetrics.totalItems || 0)) * 100);
                      return (
                        <div key={cat.name}>
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                            <span className="font-medium">{cat.name}</span>
                            <span>{percent}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded">
                            <div className="h-2 bg-blue-600 rounded" style={{ width: `${percent}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {inventoryMetrics.error && (
                <div className="text-sm text-red-600 mb-6">{t('productSearch.inventoryError', 'Inventory metrics unavailable')} • {inventoryMetrics.error}</div>
              )}
              <Card>
                <CardContent className="p-4">
                  <div className="flex border-b mb-4">
                    <button 
                      onClick={() => setSearchMode('single')} 
                      className={`px-4 py-2 text-sm font-medium transition-colors ${searchMode === 'single' ? 'border-b-2 border-blue-600 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      {t('productSearch.singleSearch')}
                    </button>
                    <button 
                      onClick={() => setSearchMode('bulk')} 
                      className={`px-4 py-2 text-sm font-medium transition-colors ${searchMode === 'bulk' ? 'border-b-2 border-blue-600 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      {t('productSearch.bulkSearch')}
                    </button>
                  </div>
                  
                  <form onSubmit={handleSearch}>
                    {searchMode === 'single' ? (
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input 
                          placeholder={t('productSearch.searchPlaceholder')} 
                          value={searchTerm} 
                          onChange={(e) => setSearchTerm(e.target.value)} 
                          className="pl-10 h-12 text-base md:text-lg w-full" 
                        />
                      </div>
                    ) : (
                      <div>
                        <Textarea 
                          placeholder={t('productSearch.bulkSearchPlaceholder')} 
                          value={bulkTerms} 
                          onChange={(e) => setBulkTerms(e.target.value)} 
                          rows={5} 
                        />
                        <div className="text-sm text-gray-500 mt-2">
                          {t('productSearch.bulkDetected', '{{count}} part numbers detected.', { count: parsedBulkTerms.length })}
                        </div>
                      </div>
                    )}
                    <Button type="submit" className="w-full mt-4 h-11 md:h-12 text-base md:text-lg" disabled={loading}>
                      {loading ? 
                        <Loader2 className="w-6 h-6 animate-spin" /> : 
                        <>
                          <Search className="w-5 h-5 mr-2" />
                          {t('productSearch.searchButton')}
                        </>
                      }
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading && (
              <div className="text-center py-12">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
                <p className="mt-4 text-gray-500">{t('productSearch.searching')}</p>
              </div>
            )}

            {!loading && error && (
              <div className="text-center py-12 text-red-600">
                <ServerCrash className="mx-auto h-12 w-12 mb-4" />
                <p className="text-lg font-semibold">{t('productSearch.errorTitle', 'Oops! Something went wrong.')}</p>
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && hasSearched && groupedResults.length === 0 && notFoundParts.length === 0 && (
              <div className="text-center py-12">
                <Inbox className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg text-gray-600 font-semibold">{t('productSearch.noResults')}</p>
                <p className="text-gray-500">{t('productSearch.noResultsDesc')}</p>
              </div>
            )}

            {!loading && !error && hasSearched && (groupedResults.length > 0 || notFoundParts.length > 0) && (
              <div className="space-y-6" key={`search-${Date.now()}`}>
                {/* Simple Statistics */}
                {stats && (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{stats.totalItems}</div>
                        <div className="text-sm text-gray-500">{t('productSearch.stats.totalItems', 'Total Items')}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">{stats.uniqueParts}</div>
                        <div className="text-sm text-gray-500">{t('productSearch.stats.uniquePN', 'Unique P/N Found')}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-orange-600">{stats.totalQuantity}</div>
                        <div className="text-sm text-gray-500">{t('productSearch.stats.totalQty', 'Total Qty')}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">{stats.foundRate}%</div>
                        <div className="text-sm text-gray-500">{t('productSearch.stats.foundRateWithCount', 'Found Rate ({{count}} searched)', { count: stats.termsSearched })}</div>
                      </CardContent>
                    </Card>
                  </div>
                )}



                {/* Tabla Unificada de Resultados */}
                {(groupedResults.length > 0 || notFoundParts.length > 0) && (
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <span className="text-lg md:text-xl">{t('productSearch.resultsTitle')} ({results.length + notFoundParts.length} {t('productSearch.items')})</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleSelectAll}
                            className="w-fit"
                          >
                            <Checkbox 
                              checked={(
                                results.length > 0 && results.every(item => selectedItems[item.id]) &&
                                notFoundParts.length > 0 && notFoundParts.every(pn => selectedNotFoundParts[pn])
                              ) || (
                                results.length > 0 && results.every(item => selectedItems[item.id]) && notFoundParts.length === 0
                              ) || (
                                notFoundParts.length > 0 && notFoundParts.every(pn => selectedNotFoundParts[pn]) && results.length === 0
                              )}
                              className="mr-2"
                            />
                            <span className="hidden sm:inline">{t('productSearch.selectAll')}</span>
                            <span className="sm:hidden">{t('productSearch.selectAll')}</span>
                          </Button>
                        </CardTitle>
                        <Dialog open={quoteDialogOpen} onOpenChange={setQuoteDialogOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              onClick={openQuoteDialog}
                              disabled={Object.keys(selectedItems).length === 0 && Object.keys(selectedNotFoundParts).length === 0}
                              size="default"
                              className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto"
                            >
                              <Mail className="mr-1 md:mr-2 h-4 w-4" />
                              <span className="hidden sm:inline">{t('productSearch.quoteSelected')} ({Object.keys(selectedItems).length + Object.keys(selectedNotFoundParts).length})</span>
                              <span className="sm:hidden">{t('productSearch.quoteSelected')} ({Object.keys(selectedItems).length + Object.keys(selectedNotFoundParts).length})</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-lg">
                            <DialogHeader>
                              <DialogTitle>{t('productSearch.requestQuote')}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="company">{t('productSearch.company')} *</Label>
                                <Input
                                  id="company"
                                  value={quoteForm.company}
                                  onChange={(e) => setQuoteForm(prev => ({...prev, company: e.target.value}))}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="deliveryPlace">{t('productSearch.deliveryPlace')} *</Label>
                                <Input
                                  id="deliveryPlace"
                                  value={quoteForm.deliveryPlace}
                                  onChange={(e) => setQuoteForm(prev => ({...prev, deliveryPlace: e.target.value}))}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="preferredCondition">{t('productSearch.preferredCondition')} *</Label>
                                <Select onValueChange={(value) => setQuoteForm(prev => ({...prev, condition: value}))}>
                                  <SelectTrigger>
                                    <SelectValue placeholder={t('productSearch.preferredConditionPlaceholder', 'Select preferred condition for sourcing')} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="new">{t('productSearch.conditions.new')}</SelectItem>
                                    <SelectItem value="oh">{t('productSearch.conditions.oh')}</SelectItem>
                                    <SelectItem value="sv">{t('productSearch.conditions.sv')}</SelectItem>
                                    <SelectItem value="ar">{t('productSearch.conditions.ar')}</SelectItem>
                                    <SelectItem value="rep">{t('productSearch.conditions.rep')}</SelectItem>
                                    <SelectItem value="used">{t('productSearch.conditions.used')}</SelectItem>
                                  </SelectContent>
                                </Select>
                                <div className="text-xs text-gray-500 mt-1">
                                  {t('productSearch.preferredConditionNote')}
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="expectedLeadTime">{t('productSearch.expectedLeadTime')} *</Label>
                                <Input
                                  id="expectedLeadTime"
                                  value={quoteForm.expectedLeadTime}
                                  onChange={(e) => setQuoteForm(prev => ({...prev, expectedLeadTime: e.target.value}))}
                                  placeholder={t('productSearch.leadTimeExample', 'e.g., ASAP, 30 days, etc.')}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="comments">{t('productSearch.comments')}</Label>
                                <Textarea
                                  id="comments"
                                  value={quoteForm.comments}
                                  onChange={(e) => setQuoteForm(prev => ({...prev, comments: e.target.value}))}
                                  rows={3}
                                />
                              </div>
                              <Button onClick={handleQuoteSubmit} className="w-full">
                                {t('productSearch.sendQuote')}
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Headers - Ocultos en móvil */}
                      <div className="hidden md:grid grid-cols-12 gap-4 items-center py-3 px-4 bg-gray-100 rounded-lg mb-4 text-sm font-semibold text-gray-700">
                        <div className="col-span-1 text-center">{t('productSearch.table.select', 'Select')}</div>
                        <div className="col-span-3">{t('productSearch.table.partNumber', 'Part Number')}</div>
                        <div className="col-span-4">{t('productSearch.table.description', 'Description')}</div>
                        <div className="col-span-2">{t('productSearch.table.availableRequested', 'Available / Requested')}</div>
                        <div className="col-span-1">{t('productSearch.table.condition', 'Condition')}</div>
                        <div className="col-span-1 text-center">{t('productSearch.table.action', 'Action')}</div>
                      </div>
                      
                      <div className="space-y-3">
                        {/* Partes Disponibles */}
                        {groupedResults.map(group => {
                          const isSelected = group.items.every(item => selectedItems[item.id]);
                          
                          return (
                            <div key={group.part_number} className="bg-white border-2 rounded-lg p-3 md:p-4 hover:border-blue-300 transition-colors">
                              {/* Layout Desktop */}
                              <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-1 text-center">
                                  <Checkbox 
                                    onCheckedChange={(checked) => {
                                      group.items.forEach(item => handleSelect(item.id, checked));
                                    }} 
                                    checked={isSelected}
                                  />
                                </div>
                                <div className="col-span-3">
                                  <h3 className="text-lg font-bold text-green-600">{group.part_number}</h3>
                                </div>
                                <div className="col-span-4">
                                  <p className="text-gray-600 text-sm">{group.description}</p>
                                </div>
                                <div className="col-span-2">
                                  <div className="flex flex-col gap-1">
                                    <div className="text-xs text-gray-500">{t('productSearch.availableLabel', 'Available')}: {group.totalQuantity}</div>
                                    <Input
                                      type="number"
                                      min="1"
                                      max={group.totalQuantity}
                                      placeholder={t('productSearch.qtyNeeded', 'Qty needed')}
                                      className="h-8 text-xs"
                                      value={selectedQuantities[group.items[0].id] || 1}
                                      onChange={(e) => {
                                        const qty = parseInt(e.target.value) || 1;
                                        group.items.forEach(item => {
                                          setSelectedQuantities(prev => ({
                                            ...prev,
                                            [item.id]: Math.min(qty, group.totalQuantity)
                                          }));
                                        });
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="col-span-1">
                                  <Badge className="bg-green-100 text-green-800 text-xs">
                                    {conditionLabels[group.items[0].condition] || group.items[0].condition}
                                  </Badge>
                                </div>
                                <div className="col-span-1 text-center">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="outline" size="sm">
                                        <Mail className="h-3 w-3" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-lg">
                                      <DialogHeader>
                                        <DialogTitle>{t('productSearch.requestQuote')} - {group.part_number}</DialogTitle>
                                      </DialogHeader>
                                      <div className="space-y-4">
                                        <div>
                                          <Label htmlFor={`individual-company-${group.part_number}`}>{t('productSearch.company')} *</Label>
                                          <Input id={`individual-company-${group.part_number}`} placeholder={t('productSearch.companyPlaceholder', 'Your company name')} />
                                        </div>
                                        <div>
                                          <Label htmlFor={`individual-delivery-${group.part_number}`}>{t('productSearch.deliveryPlace')} *</Label>
                                          <Input id={`individual-delivery-${group.part_number}`} placeholder={t('productSearch.deliveryPlacePlaceholder', 'Delivery location')} />
                                        </div>
                                        <div>
                                          <Label htmlFor={`individual-leadtime-${group.part_number}`}>{t('productSearch.expectedLeadTime')} *</Label>
                                          <Input id={`individual-leadtime-${group.part_number}`} placeholder={t('productSearch.leadTimeExample', 'e.g., ASAP, 30 days')} />
                                        </div>
                                        <Button className="w-full" onClick={() => {
                                          const company = document.getElementById(`individual-company-${group.part_number}`).value;
                                          const delivery = document.getElementById(`individual-delivery-${group.part_number}`).value;
                                          const leadTime = document.getElementById(`individual-leadtime-${group.part_number}`).value;
                                          
                                          if (!company || !delivery || !leadTime) {
                                            toast({ variant: "destructive", title: t('productSearch.fillRequired') });
                                            return;
                                          }
                                          
                                          const date = new Date().toLocaleDateString('en-US');
                                          const rfqId = generateRFQId();
                                          const subject = `RFQ ${rfqId} - ${group.part_number} - ${date}`;
                                          
                                          let body = `Dear OrbiParts Team,\n\nI would like to request a quote for:\n\nRFQ ID: ${rfqId}\nDate: ${date}\n\n`;
                                          body += `P/N: ${group.part_number}\nDescription: ${group.description}\nQuantity Available: ${group.totalQuantity}\nCondition: ${conditionLabels[group.items[0].condition] || group.items[0].condition}\n\n`;
                                          body += `Customer Information:\nCompany: ${company}\nDelivery Place: ${delivery}\nExpected Lead Time: ${leadTime}\n\nBest regards,\n`;
                                          
                                          const mailtoLink = `mailto:rfq@orbiparts.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                                          window.location.href = mailtoLink;
                                          
                                          toast({ title: t('productSearch.quoteSent'), description: t('productSearch.rfqSentWithId', 'RFQ {{id}} sent successfully', { id: rfqId }) });
                                        }}>{t('productSearch.sendQuote')}</Button>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                              </div>

                              {/* Layout Móvil */}
                              <div className="md:hidden space-y-3">
                                <div className="flex items-start justify-between">
                                  <div className="flex items-center gap-2">
                                    <Checkbox 
                                      onCheckedChange={(checked) => {
                                        group.items.forEach(item => handleSelect(item.id, checked));
                                      }} 
                                      checked={isSelected}
                                    />
                                    <div>
                                      <h3 className="text-base font-bold text-green-600">{group.part_number}</h3>
                                      <Badge className="bg-green-100 text-green-800 text-xs mt-1">
                                        {conditionLabels[group.items[0].condition] || group.items[0].condition}
                                      </Badge>
                                    </div>
                                  </div>
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="outline" size="sm">
                                        <Mail className="h-3 w-3" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-sm mx-4">
                                      <DialogHeader>
                                        <DialogTitle className="text-sm">{t('productSearch.quoteFor', 'Quote for {{partNumber}}', { partNumber: group.part_number })}</DialogTitle>
                                      </DialogHeader>
                                      <div className="space-y-3">
                                        <div>
                                          <Label className="text-sm">{t('productSearch.company')} *</Label>
                                          <Input placeholder={t('productSearch.companyPlaceholder', 'Your company name')} className="text-sm" />
                                        </div>
                                        <div>
                                          <Label className="text-sm">{t('productSearch.deliveryPlace')} *</Label>
                                          <Input placeholder={t('productSearch.deliveryPlacePlaceholder', 'Delivery location')} className="text-sm" />
                                        </div>
                                        <div>
                                          <Label className="text-sm">{t('productSearch.expectedLeadTime')} *</Label>
                                          <Input placeholder={t('productSearch.leadTimeExample', 'e.g., ASAP, 30 days')} className="text-sm" />
                                        </div>
                                        <Button className="w-full text-sm">{t('productSearch.sendQuote')}</Button>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                                <p className="text-gray-600 text-sm">{group.description}</p>
                                <div className="flex items-center gap-4">
                                  <div className="flex-1">
                                    <div className="text-xs text-gray-500 mb-1">{t('productSearch.availableLabel', 'Available')}: {group.totalQuantity}</div>
                                    <Input
                                      type="number"
                                      min="1"
                                      max={group.totalQuantity}
                                      placeholder={t('productSearch.qtyShort', 'Qty')}
                                      className="h-8 text-sm"
                                      value={selectedQuantities[group.items[0].id] || 1}
                                      onChange={(e) => {
                                        const qty = parseInt(e.target.value) || 1;
                                        group.items.forEach(item => {
                                          setSelectedQuantities(prev => ({
                                            ...prev,
                                            [item.id]: Math.min(qty, group.totalQuantity)
                                          }));
                                        });
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        
                        {/* Partes No Disponibles */}
                        {notFoundParts.map(partNumber => (
                          <div key={partNumber} className="bg-red-50 border-2 border-red-200 rounded-lg p-3 md:p-4 hover:border-red-400 transition-colors">
                            {/* Layout Desktop */}
                            <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                              <div className="col-span-1 text-center">
                                <Checkbox 
                                  onCheckedChange={(checked) => handleNotFoundSelect(partNumber, checked)}
                                  checked={!!selectedNotFoundParts[partNumber]}
                                />
                              </div>
                              <div className="col-span-3">
                                <h3 className="text-lg font-bold text-red-600">{partNumber}</h3>
                              </div>
                              <div className="col-span-4">
                                <p className="text-red-600 text-sm font-medium">{t('productSearch.notFound.message', 'Not in current stock - will source from network')}</p>
                              </div>
                              <div className="col-span-2">
                                <div className="flex flex-col gap-1">
                                  <div className="text-xs text-red-500 font-medium">{t('productSearch.notFound.noStock', 'No Stock')}</div>
                                  <Input
                                    type="number"
                                    min="1"
                                    placeholder={t('productSearch.qtyNeeded', 'Qty needed')}
                                    className="h-8 text-xs border-red-300"
                                    value={notFoundPartDetails[partNumber]?.quantity || 1}
                                    onChange={(e) => {
                                      setNotFoundPartDetails(prev => ({
                                        ...prev,
                                        [partNumber]: {
                                          ...prev[partNumber],
                                          quantity: parseInt(e.target.value) || 1
                                        }
                                      }));
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="col-span-1">
                                <Select
                                  value={notFoundPartDetails[partNumber]?.condition || 'new'}
                                  onValueChange={(value) => {
                                    setNotFoundPartDetails(prev => ({
                                      ...prev,
                                      [partNumber]: {
                                        ...prev[partNumber],
                                        condition: value
                                      }
                                    }));
                                  }}
                                >
                                  <SelectTrigger className="h-8 text-xs border-red-300">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="new">{t('productSearch.conditions.new')}</SelectItem>
                                    <SelectItem value="oh">{t('productSearch.conditions.oh')}</SelectItem>
                                    <SelectItem value="sv">{t('productSearch.conditions.sv')}</SelectItem>
                                    <SelectItem value="ar">{t('productSearch.conditions.ar')}</SelectItem>
                                    <SelectItem value="rep">{t('productSearch.conditions.rep')}</SelectItem>
                                    <SelectItem value="used">{t('productSearch.conditions.used')}</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="col-span-1 text-center">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="border-red-300">
                                      <Mail className="h-3 w-3" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-lg">
                                    <DialogHeader>
                                      <DialogTitle>{t('productSearch.requestQuote')} - {partNumber}</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div>
                                        <Label htmlFor={`source-company-${partNumber}`}>{t('productSearch.company')} *</Label>
                                        <Input id={`source-company-${partNumber}`} placeholder={t('productSearch.companyPlaceholder', 'Your company name')} />
                                      </div>
                                      <div>
                                        <Label htmlFor={`source-delivery-${partNumber}`}>{t('productSearch.deliveryPlace')} *</Label>
                                        <Input id={`source-delivery-${partNumber}`} placeholder={t('productSearch.deliveryPlacePlaceholder', 'Delivery location')} />
                                      </div>
                                      <div>
                                        <Label htmlFor={`source-leadtime-${partNumber}`}>{t('productSearch.expectedLeadTime')} *</Label>
                                        <Input id={`source-leadtime-${partNumber}`} placeholder={t('productSearch.leadTimeExample', 'e.g., ASAP, 30 days')} />
                                      </div>
                                      <Button className="w-full" onClick={() => {
                                        const company = document.getElementById(`source-company-${partNumber}`).value;
                                        const delivery = document.getElementById(`source-delivery-${partNumber}`).value;
                                        const leadTime = document.getElementById(`source-leadtime-${partNumber}`).value;
                                        
                                        if (!company || !delivery || !leadTime) {
                                          toast({ variant: "destructive", title: t('productSearch.fillRequired') });
                                          return;
                                        }
                                        
                                        const details = notFoundPartDetails[partNumber] || { quantity: 1, condition: 'new' };
                                        const date = new Date().toLocaleDateString('en-US');
                                        const rfqId = generateRFQId();
                                        const subject = `RFQ ${rfqId} - Source Request for ${partNumber} - ${date}`;
                                        
                                        let body = `Dear OrbiParts Team,\n\nI need you to source the following part:\n\nRFQ ID: ${rfqId}\nDate: ${date}\n\n`;
                                        body += `P/N: ${partNumber}\nQuantity: ${details.quantity}\nPreferred Condition: ${details.condition}\n\n`;
                                        body += `Customer Information:\nCompany: ${company}\nDelivery Place: ${delivery}\nExpected Lead Time: ${leadTime}\n\nBest regards,\n`;
                                        
                                        const mailtoLink = `mailto:rfq@orbiparts.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                                        window.location.href = mailtoLink;
                                        
                                        toast({ title: t('productSearch.quoteSent'), description: t('productSearch.rfqSentWithId', 'RFQ {{id}} sent successfully', { id: rfqId }) });
                                      }}>{t('productSearch.sendQuote')}</Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>

                            {/* Layout Móvil */}
                            <div className="md:hidden space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                  <Checkbox 
                                    onCheckedChange={(checked) => handleNotFoundSelect(partNumber, checked)}
                                    checked={!!selectedNotFoundParts[partNumber]}
                                  />
                                  <div>
                                    <h3 className="text-base font-bold text-red-600">{partNumber}</h3>
                                    <div className="text-xs text-red-500 font-medium mt-1">{t('productSearch.notFound.noStock', 'No Stock')}</div>
                                  </div>
                                </div>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="border-red-300">
                                      <Mail className="h-3 w-3" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-sm mx-4">
                                    <DialogHeader>
                                      <DialogTitle className="text-sm">{t('productSearch.requestQuote')} - {partNumber}</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-3">
                                      <div>
                                        <Label className="text-sm">{t('productSearch.company')} *</Label>
                                        <Input placeholder="Your company name" className="text-sm" />
                                      </div>
                                      <div>
                                        <Label className="text-sm">{t('productSearch.deliveryPlace')} *</Label>
                                        <Input placeholder="Delivery location" className="text-sm" />
                                      </div>
                                      <div>
                                        <Label className="text-sm">{t('productSearch.expectedLeadTime')} *</Label>
                                        <Input placeholder="e.g., ASAP, 30 days" className="text-sm" />
                                      </div>
                                      <Button className="w-full text-sm">{t('productSearch.sendQuote')}</Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                              <p className="text-red-600 text-sm font-medium">{t('productSearch.notFound.message', 'Not in current stock - will source from network')}</p>
                              <div className="flex items-center gap-4">
                                <div className="flex-1">
                                  <Input
                                    type="number"
                                    min="1"
                                    placeholder={t('productSearch.qtyShort', 'Qty')}
                                    className="h-8 text-sm border-red-300"
                                    value={notFoundPartDetails[partNumber]?.quantity || 1}
                                    onChange={(e) => {
                                      setNotFoundPartDetails(prev => ({
                                        ...prev,
                                        [partNumber]: {
                                          ...prev[partNumber],
                                          quantity: parseInt(e.target.value) || 1
                                        }
                                      }));
                                    }}
                                  />
                                </div>
                                <div className="flex-1">
                                  <Select
                                    value={notFoundPartDetails[partNumber]?.condition || 'new'}
                                    onValueChange={(value) => {
                                      setNotFoundPartDetails(prev => ({
                                        ...prev,
                                        [partNumber]: {
                                          ...prev[partNumber],
                                          condition: value
                                        }
                                      }));
                                    }}
                                  >
                                    <SelectTrigger className="h-8 text-sm border-red-300">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="new">{t('productSearch.conditions.new')}</SelectItem>
                                      <SelectItem value="oh">{t('productSearch.conditions.oh')}</SelectItem>
                                      <SelectItem value="sv">{t('productSearch.conditions.sv')}</SelectItem>
                                      <SelectItem value="ar">{t('productSearch.conditions.ar')}</SelectItem>
                                      <SelectItem value="rep">{t('productSearch.conditions.rep')}</SelectItem>
                                      <SelectItem value="used">{t('productSearch.conditions.used')}</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Wanted Parts (Procurement Programs) */}
            <div className="mt-12">
              <Card className="border-gray-200 bg-white shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-gray-900">
                      {t('productSearch.wanted.title')}
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setShowWantedParts(!showWantedParts)}>
                      {showWantedParts ? t('productSearch.wanted.toggleHide', 'Hide') : t('productSearch.wanted.toggleShow', 'Show')}
                    </Button>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {t('productSearch.wanted.intro')}
                  </p>
                </CardHeader>
                {showWantedParts && (
                  <CardContent className="pt-2">
                    {loadingWantedParts ? (
                      <div className="text-center py-6">
                        <Loader2 className="mx-auto h-8 w-8 animate-spin text-gray-500" />
                        <p className="mt-2 text-gray-600">{t('productSearch.wanted.loading')}</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {wantedParts.map((part) => (
                          <div key={part.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow transition-shadow">
                            {/* Layout Desktop */}
                            <div className="hidden md:grid grid-cols-12 gap-6 items-start">
                              <div className="col-span-4 space-y-1">
                                <h3 className="text-lg font-semibold text-gray-900">{part.part_number}</h3>
                                <div className="text-xs uppercase tracking-wide text-gray-500">{(part.category || 'ENGINE').toString()}</div>
                                <Badge className={`text-xs border ${part.urgency === 'high' ? 'bg-red-50 text-red-700 border-red-200' : part.urgency === 'medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                                  {part.urgency === 'high' ? t('productSearch.wanted.urgency.high') : part.urgency === 'medium' ? t('productSearch.wanted.urgency.medium') : t('productSearch.wanted.urgency.low')}
                                </Badge>
                              </div>
                              <div className="col-span-4">
                                <p className="text-gray-800 text-sm font-medium">{part.description}</p>
                                <p className="text-gray-500 text-xs mt-1">{part.notes}</p>
                              </div>
                              <div className="col-span-3">
                                <div className="text-xs uppercase tracking-wide text-gray-500">{t('productSearch.wanted.need', 'Need')}</div>
                                <div className="text-sm text-gray-900 font-semibold">{part.quantity_needed} {t('productSearch.wanted.units', 'units')}</div>
                                <div className="mt-2 text-xs uppercase tracking-wide text-gray-500">{t('productSearch.wanted.max', 'Max')}</div>
                                <div className="text-sm text-gray-900 font-semibold">{formatUSD(part.max_price)}</div>
                                <div className="mt-3">
                                  <div className="text-xs text-gray-500 mb-1">{t('productSearch.wanted.accepted')}</div>
                                  <div className="flex flex-wrap gap-1">
                                    {part.condition_accepted.map((condition) => (
                                      <Badge key={condition} className={`text-xs ${conditionColors[condition] || 'bg-gray-100 text-gray-800'}`}>
                                        {conditionLabels[condition] || condition}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="col-span-1 text-right flex justify-end items-start">
                                <Button
                                  onClick={() => handleSellToOrbiparts(part)}
                                  size="sm"
                                  variant="outline"
                                  className="whitespace-nowrap"
                                >
                                  {t('productSearch.wanted.contact')}
                                </Button>
                              </div>
                            </div>

                            {/* Layout Móvil */}
                            <div className="md:hidden space-y-3">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="text-base font-semibold text-gray-900">{part.part_number}</h3>
                                  <div className="text-xs uppercase tracking-wide text-gray-500">{(part.category || 'ENGINE').toString()}</div>
                                  <Badge className={`text-xs mt-1 border ${part.urgency === 'high' ? 'bg-red-50 text-red-700 border-red-200' : part.urgency === 'medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                                    {part.urgency === 'high' ? t('productSearch.wanted.urgency.high') : part.urgency === 'medium' ? t('productSearch.wanted.urgency.medium') : t('productSearch.wanted.urgency.low')}
                                  </Badge>
                                </div>
                                <Button
                                  onClick={() => handleSellToOrbiparts(part)}
                                  size="sm"
                                  variant="outline"
                                >
                                  {t('productSearch.wanted.contact')}
                                </Button>
                              </div>
                              <p className="text-gray-700 text-sm font-medium">{part.description}</p>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="text-gray-500">{t('productSearch.wanted.need', 'Need')}: </span>
                                  <span className="font-semibold text-gray-900">{part.quantity_needed} {t('productSearch.wanted.units', 'units')}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">{t('productSearch.wanted.max', 'Max')}: </span>
                                  <span className="font-semibold text-gray-900">{formatUSD(part.max_price)}</span>
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-500 mb-1">{t('productSearch.wanted.accepted')}</div>
                                <div className="flex flex-wrap gap-1">
                                  {part.condition_accepted.map((condition) => (
                                    <Badge key={condition} className={`text-xs ${conditionColors[condition] || 'bg-gray-100 text-gray-800'}`}>
                                      {conditionLabels[condition] || condition}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <p className="text-gray-500 text-xs">{part.notes}</p>
                            </div>
                          </div>
                        ))}
                        <div className="text-center pt-4 border-t border-gray-200">
                          <p className="text-gray-600 text-sm">
                            {t('productSearch.wanted.footer')} <a href="mailto:procurement@orbiparts.com" className="font-semibold underline">procurement@orbiparts.com</a>
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductSearch;