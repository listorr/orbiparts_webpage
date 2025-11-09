import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/lib/customSupabaseClient';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    partNumber: '',
    message: ''
  });
  const [formState, setFormState] = useState('idle'); // idle, loading, success, error
  const [errors, setErrors] = useState({});

  const { toast } = useToast();
  const location = useLocation();
  const formRef = useRef(null);

  useEffect(() => {
    if (location.hash === '#request-quote' && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if(errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = t('rfq.nameRequired');
    if (!formData.company) newErrors.company = t('rfq.companyRequired');
    if (!formData.email) {
      newErrors.email = t('rfq.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('rfq.validationEmail');
    }
    if (!formData.partNumber && !formData.message) {
        newErrors.message = t('rfq.messageRequired');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
        toast({
            variant: "destructive",
            title: t('rfq.validationErrorTitle'),
            description: t('rfq.validationErrorMessage'),
        });
        return;
    }

    setFormState('loading');
    
    const { error } = await supabase.functions.invoke('send-rfq', {
        body: { ...formData, lang: i18n.language },
    });
    
    if (error) {
        setFormState('error');
        toast({
            variant: "destructive",
            title: t('rfq.errorTitle'),
            description: t('rfq.errorMessage'),
        });
    } else {
        setFormState('success');
        toast({
            title: t('rfq.successTitle'),
            description: t('rfq.successMessage'),
        });
        setFormData({ name: '', company: '', email: '', phone: '', partNumber: '', message: '' });
        setTimeout(() => setFormState('idle'), 3000);
    }
  };

  const handleAOGCall = () => {
    window.location.href = "tel:+19292299520";
  };

  const handleAOGChat = () => {
    const phoneNumber = "+19292299520";
    const message = "Hi ORBIPARTS team, I have an AOG situation and need urgent support.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contactPage.contact_miami_title'),
      details: ["Miami, Florida, USA"],
      description: t('contactPage.contact_miami_desc')
    }, 
    {
      icon: Mail,
      title: t('contactPage.contact_email_title'),
      details: ["sales@orbiparts.com"],
      description: t('contactPage.contact_email_desc'),
      href: "mailto:sales@orbiparts.com"
    }, 
    {
      icon: Phone,
      title: t('contactPage.contact_phone_title'),
      details: ["+1 929 229 9520"],
      description: t('contactPage.contact_phone_desc'),
      href: "tel:+19292299520"
    }
  ];

  return <>
      <Helmet>
        <title>Contact ORBIPARTS - Miami Aircraft Components RFQ | Get Quote Today</title>
        <meta name="description" content="Contact ORBIPARTS Miami for aircraft components RFQ. Get competitive quotes within hours. Professional aviation parts supplier." />
        <meta property="og:title" content="Contact ORBIPARTS - Aircraft Components RFQ" />
        <meta property="og:description" content="Send your aircraft parts RFQ to Miami-based ORBIPARTS. Fast response, competitive pricing, professional service." />
      </Helmet>

      <div className="min-h-screen pt-20 bg-base-bg">
        <section className="py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">{t('contactPage.title')}</h1>
            <p className="text-xl md:text-2xl text-neutral-600 max-w-4xl mx-auto">
              {t('contactPage.subtitle')}
            </p>
          </motion.div>
        </section>

        <section ref={formRef} id="request-quote" className="pb-20 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <Card className="rounded-lg shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">{t('contactPage.formTitle')}</CardTitle>
                    <CardDescription>
                      {t('contactPage.formSubtitle')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">{t('contactPage.nameLabel')}</Label>
                          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder={t('contactPage.namePlaceholder')} className={errors.name ? 'border-destructive' : ''} />
                          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">{t('contactPage.companyLabel')}</Label>
                          <Input id="company" name="company" value={formData.company} onChange={handleInputChange} placeholder={t('contactPage.companyPlaceholder')} className={errors.company ? 'border-destructive' : ''} />
                           {errors.company && <p className="text-sm text-destructive">{errors.company}</p>}
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">{t('contactPage.emailLabel')}</Label>
                          <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder={t('contactPage.emailPlaceholder')} className={errors.email ? 'border-destructive' : ''} />
                          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">{t('contactPage.phoneLabel')}</Label>
                          <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder={t('contactPage.phonePlaceholder')} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="partNumber">{t('contactPage.partNumberLabel')}</Label>
                        <Input id="partNumber" name="partNumber" value={formData.partNumber} onChange={handleInputChange} placeholder={t('contactPage.partNumberPlaceholder')} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">{t('contactPage.messageLabel')}</Label>
                        <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} rows={4} placeholder={t('contactPage.messagePlaceholder')} className={errors.message ? 'border-destructive' : ''} />
                        {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                      </div>
                      <Button type="submit" className="w-full rounded-md py-3 text-base" disabled={formState === 'loading'}>
                        {formState === 'loading' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {formState === 'loading' ? t('contactPage.sendingButton') : t('contactPage.sendButton')}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-neutral-900 mb-4">{t('contactPage.getInTouchTitle')}</h2>
                  <p className="text-lg text-neutral-600">
                    {t('contactPage.getInTouchSubtitle')}
                  </p>
                </div>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <a key={index} href={info.href} target="_blank" rel="noopener noreferrer" className="block">
                      <Card className="hover-lift rounded-lg">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <info.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-neutral-900 mb-1">{info.title}</h3>
                              {info.details.map((detail, i) => <p key={i} className="text-primary font-medium">{detail}</p>)}
                              <p className="text-neutral-600 text-sm mt-1">{info.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  ))}
                </div>
                <Card className="bg-red-500/10 border-red-500/20 rounded-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-red-800 mb-2">{t('contactPage.aogTitle')}</h3>
                    <p className="text-red-700 mb-4">
                      {t('contactPage.aogSubtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button onClick={handleAOGCall} className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-md">
                        <Phone className="mr-2 w-4 h-4"/> {t('contactPage.callAog')}
                      </Button>
                      <Button onClick={handleAOGChat} variant="outline" className="flex-1 border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-md">
                        <MessageSquare className="mr-2 w-4 h-4" /> {t('contactPage.chatAog')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>;
};
export default Contact;