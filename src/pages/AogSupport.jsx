import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, Clock, Globe, Truck, Mail, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const AogSupport = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    partNumbers: '',
    aircraftType: '',
    aircraftRegistration: '',
    airline: '',
    airport: '',
    location: '',
    urgencyLevel: 'critical',
    leadTime: '',
    message: ''
  });
  const [formState, setFormState] = useState('idle');
  const [errors, setErrors] = useState({});

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if(errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = t('aogSupport.validation.nameRequired');
    if (!formData.company) newErrors.company = t('aogSupport.validation.companyRequired');
    if (!formData.airline) newErrors.airline = t('aogSupport.validation.airlineRequired');
    if (!formData.aircraftType) newErrors.aircraftType = t('aogSupport.validation.aircraftTypeRequired');
    if (!formData.location) newErrors.location = t('aogSupport.validation.locationRequired');
    if (!formData.email) {
      newErrors.email = t('aogSupport.validation.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('aogSupport.validation.emailValid');
    }
    if (!formData.partNumbers && !formData.message) {
        newErrors.partNumbers = t('aogSupport.validation.partNumbersRequired');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
        toast({
            variant: "destructive",
            title: "Validation Error",
            description: "Please fill in all required fields for AOG support.",
        });
        return;
    }

    setFormState('loading');
    
    const aogData = {
      ...formData,
      subject: `🚨 AOG EMERGENCY - ${formData.airline} - ${formData.aircraftType}`,
      messageType: 'aog_emergency',
      timestamp: new Date().toISOString(),
    };
    
    const { error } = await supabase.functions.invoke('send-rfq', {
        body: aogData,
    });
    
    if (error) {
        setFormState('error');
        toast({
            variant: "destructive",
            title: "AOG Request Failed",
            description: "Error sending AOG request. Please call our hotline immediately: +1 929 229 9520",
        });
    } else {
        setFormState('success');
        toast({
            title: "🚨 AOG Request Sent",
            description: "Our AOG team will contact you within 15 minutes. Check your email and phone.",
        });
        setFormData({ 
          name: '', company: '', email: '', phone: '', partNumbers: '', 
          aircraftType: '', aircraftRegistration: '', airline: '', airport: '', 
          location: '', urgencyLevel: 'critical', leadTime: '', message: '' 
        });
        setTimeout(() => setFormState('idle'), 3000);
    }
  };

  const handleAOGCall = () => {
    window.location.href = "tel:+19292299520";
  };

  const handleAOGChat = () => {
    const phoneNumber = "+19292299520";
    const message = "Hi ORBIPARTS team, I have an AOG situation and need urgent assistance.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const services = [
    { icon: Clock, title: t('aogSupport.services.service1.title'), description: t('aogSupport.services.service1.description') },
    { icon: Globe, title: t('aogSupport.services.service2.title'), description: t('aogSupport.services.service2.description') },
    { icon: Truck, title: t('aogSupport.services.service3.title'), description: t('aogSupport.services.service3.description') },
  ];

  return (
    <>
      <Helmet>
        <title>{t('aogSupport.seo.title')}</title>
        <meta name="description" content={t('aogSupport.seo.description')} />
        <meta property="og:title" content={t('aogSupport.seo.ogTitle')} />
        <meta property="og:description" content={t('aogSupport.seo.ogDescription')} />
      </Helmet>

      <div className="min-h-screen pt-16">
        <section className="py-20 bg-red-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('aogSupport.hero.title')}</h1>
              <p className="text-xl md:text-2xl text-red-100 max-w-4xl mx-auto">
                {t('aogSupport.hero.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('aogSupport.immediate.title')}</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">{t('aogSupport.immediate.description')}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={handleAOGCall} size="lg" className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6 rounded-md">
                    <Phone className="mr-3 w-6 h-6" /> {t('aogSupport.immediate.callButton')}
                  </Button>
                  <Button onClick={handleAOGChat} size="lg" variant="outline" className="text-lg px-8 py-6 rounded-md border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                    <MessageSquare className="mr-3 w-6 h-6" /> {t('aogSupport.immediate.chatButton')}
                  </Button>
                </div>
            </div>

            {/* AOG Form Section */}
            <div className="max-w-4xl mx-auto">
              <Card className="border-red-200 shadow-lg">
                <CardHeader className="bg-red-50">
                  <CardTitle className="text-2xl text-red-700 flex items-center gap-2">
                    {t('aogSupport.form.title')}
                  </CardTitle>
                  <CardDescription>
                    {t('aogSupport.form.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Contact Information */}
                    <div className="space-y-4 border-b pb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{t('aogSupport.form.contact.heading')}</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">{t('aogSupport.form.contact.name')} *</Label>
                          <Input 
                            id="name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleInputChange} 
                            placeholder={t('aogSupport.form.contact.namePlaceholder')} 
                            className={errors.name ? 'border-destructive' : ''} 
                          />
                          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">{t('aogSupport.form.contact.company')} *</Label>
                          <Input 
                            id="company" 
                            name="company" 
                            value={formData.company} 
                            onChange={handleInputChange} 
                            placeholder={t('aogSupport.form.contact.companyPlaceholder')} 
                            className={errors.company ? 'border-destructive' : ''} 
                          />
                          {errors.company && <p className="text-sm text-destructive">{errors.company}</p>}
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">{t('aogSupport.form.contact.email')} *</Label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                            placeholder={t('aogSupport.form.contact.emailPlaceholder')} 
                            className={errors.email ? 'border-destructive' : ''} 
                          />
                          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">{t('aogSupport.form.contact.phone')} *</Label>
                          <Input 
                            id="phone" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleInputChange} 
                            placeholder={t('aogSupport.form.contact.phonePlaceholder')} 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Aircraft Information */}
                    <div className="space-y-4 border-b pb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{t('aogSupport.form.aircraft.heading')}</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="airline">{t('aogSupport.form.aircraft.airline')} *</Label>
                          <Input 
                            id="airline" 
                            name="airline" 
                            value={formData.airline} 
                            onChange={handleInputChange} 
                            placeholder={t('aogSupport.form.aircraft.airlinePlaceholder')} 
                            className={errors.airline ? 'border-destructive' : ''} 
                          />
                          {errors.airline && <p className="text-sm text-destructive">{errors.airline}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="aircraftType">{t('aogSupport.form.aircraft.aircraftType')} *</Label>
                          <Input 
                            id="aircraftType" 
                            name="aircraftType" 
                            value={formData.aircraftType} 
                            onChange={handleInputChange} 
                            placeholder={t('aogSupport.form.aircraft.aircraftTypePlaceholder')} 
                            className={errors.aircraftType ? 'border-destructive' : ''} 
                          />
                          {errors.aircraftType && <p className="text-sm text-destructive">{errors.aircraftType}</p>}
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="aircraftRegistration">{t('aogSupport.form.aircraft.aircraftRegistration')}</Label>
                          <Input 
                            id="aircraftRegistration" 
                            name="aircraftRegistration" 
                            value={formData.aircraftRegistration} 
                            onChange={handleInputChange} 
                            placeholder={t('aogSupport.form.aircraft.aircraftRegistrationPlaceholder')} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">{t('aogSupport.form.aircraft.location')} *</Label>
                          <Input 
                            id="location" 
                            name="location" 
                            value={formData.location} 
                            onChange={handleInputChange} 
                            placeholder={t('aogSupport.form.aircraft.locationPlaceholder')} 
                            className={errors.location ? 'border-destructive' : ''} 
                          />
                          {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Parts & Urgency Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">{t('aogSupport.form.parts.heading')}</h3>
                      <div className="space-y-2">
                        <Label htmlFor="partNumbers">{t('aogSupport.form.parts.partNumbers')} *</Label>
                        <Textarea 
                          id="partNumbers" 
                          name="partNumbers" 
                          value={formData.partNumbers} 
                          onChange={handleInputChange} 
                          rows={3} 
                          placeholder={t('aogSupport.form.parts.partNumbersPlaceholder')} 
                          className={errors.partNumbers ? 'border-destructive' : ''} 
                        />
                        {errors.partNumbers && <p className="text-sm text-destructive">{errors.partNumbers}</p>}
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="urgencyLevel">{t('aogSupport.form.parts.urgencyLevel')}</Label>
                          <select 
                            id="urgencyLevel" 
                            name="urgencyLevel" 
                            value={formData.urgencyLevel} 
                            onChange={handleInputChange} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value="critical">{t('aogSupport.form.parts.urgencyCritical')}</option>
                            <option value="high">{t('aogSupport.form.parts.urgencyHigh')}</option>
                            <option value="medium">{t('aogSupport.form.parts.urgencyMedium')}</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="leadTime">{t('aogSupport.form.parts.leadTime')}</Label>
                          <Input 
                            id="leadTime" 
                            name="leadTime" 
                            value={formData.leadTime} 
                            onChange={handleInputChange} 
                            placeholder={t('aogSupport.form.parts.leadTimePlaceholder')} 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">{t('aogSupport.form.parts.message')}</Label>
                        <Textarea 
                          id="message" 
                          name="message" 
                          value={formData.message} 
                          onChange={handleInputChange} 
                          rows={4} 
                          placeholder={t('aogSupport.form.parts.messagePlaceholder')} 
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full rounded-md py-4 text-base bg-red-600 hover:bg-red-700" 
                      disabled={formState === 'loading'}
                    >
                      {formState === 'loading' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {formState === 'loading' ? t('aogSupport.form.submitting') : t('aogSupport.form.submit')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t('aogSupport.services.title')}</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('aogSupport.services.subtitle')}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div key={service.title} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <Card className="text-center hover-lift h-full rounded-lg">
                    <CardContent className="p-8">
                      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
                        <service.icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AogSupport;