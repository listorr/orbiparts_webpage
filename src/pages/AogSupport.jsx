import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, Clock, Globe, Truck, Mail, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const AogSupport = () => {
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
    if (!formData.name) newErrors.name = 'Name is required for AOG support';
    if (!formData.company) newErrors.company = 'Company is required';
    if (!formData.airline) newErrors.airline = 'Airline information is required';
    if (!formData.aircraftType) newErrors.aircraftType = 'Aircraft type is required';
    if (!formData.location) newErrors.location = 'Location/Airport is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.partNumbers && !formData.message) {
        newErrors.partNumbers = 'Part numbers or detailed message is required';
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
    { icon: Clock, title: '24/7/365 Availability', description: 'Our AOG desk never sleeps. We are available around the clock, every day of the year, to respond to your urgent needs.' },
    { icon: Globe, title: 'Global Parts Sourcing', description: 'Leveraging our extensive global network, we can locate and source critical components from anywhere in the world, fast.' },
    { icon: Truck, title: 'Expedited Logistics', description: 'We manage the entire logistics chain, from customs clearance to next-flight-out shipping, ensuring the fastest possible delivery.' },
  ];

  return (
    <>
      <Helmet>
        <title>AOG Support | ORBIPARTS - 24/7 Emergency Aircraft Parts</title>
        <meta name="description" content="ORBIPARTS provides 24/7 AOG support with rapid global sourcing and expedited logistics to get your aircraft back in the air. Contact our emergency hotline." />
        <meta property="og:title" content="24/7 AOG Support | ORBIPARTS" />
        <meta property="og:description" content="Minimize downtime with our dedicated Aircraft on Ground support. Immediate response, global sourcing, and expedited delivery." />
      </Helmet>

      <div className="min-h-screen pt-16">
        <section className="py-20 bg-red-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Aircraft on Ground (AOG) Support</h1>
              <p className="text-xl md:text-2xl text-red-100 max-w-4xl mx-auto">
                Your mission-critical partner when every second counts.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Immediate Assistance is One Click Away</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">For immediate AOG support, please use our dedicated hotline or WhatsApp chat for the fastest response.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={handleAOGCall} size="lg" className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6 rounded-md">
                    <Phone className="mr-3 w-6 h-6" /> Call AOG Hotline
                  </Button>
                  <Button onClick={handleAOGChat} size="lg" variant="outline" className="text-lg px-8 py-6 rounded-md border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                    <MessageSquare className="mr-3 w-6 h-6" /> Chat on WhatsApp
                  </Button>
                </div>
            </div>

            {/* AOG Form Section */}
            <div className="max-w-4xl mx-auto">
              <Card className="border-red-200 shadow-lg">
                <CardHeader className="bg-red-50">
                  <CardTitle className="text-2xl text-red-700 flex items-center gap-2">
                    🚨 AOG Emergency Request Form
                  </CardTitle>
                  <CardDescription>
                    Complete this form for comprehensive AOG support. Our team will contact you within 15 minutes.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Contact Information */}
                    <div className="space-y-4 border-b pb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name *</Label>
                          <Input 
                            id="name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleInputChange} 
                            placeholder="Contact person name" 
                            className={errors.name ? 'border-destructive' : ''} 
                          />
                          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Company *</Label>
                          <Input 
                            id="company" 
                            name="company" 
                            value={formData.company} 
                            onChange={handleInputChange} 
                            placeholder="Airline/Company name" 
                            className={errors.company ? 'border-destructive' : ''} 
                          />
                          {errors.company && <p className="text-sm text-destructive">{errors.company}</p>}
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                            placeholder="your.email@company.com" 
                            className={errors.email ? 'border-destructive' : ''} 
                          />
                          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone *</Label>
                          <Input 
                            id="phone" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleInputChange} 
                            placeholder="+1 XXX XXX XXXX" 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Aircraft Information */}
                    <div className="space-y-4 border-b pb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Aircraft Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="airline">Airline *</Label>
                          <Input 
                            id="airline" 
                            name="airline" 
                            value={formData.airline} 
                            onChange={handleInputChange} 
                            placeholder="e.g., Delta Air Lines" 
                            className={errors.airline ? 'border-destructive' : ''} 
                          />
                          {errors.airline && <p className="text-sm text-destructive">{errors.airline}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="aircraftType">Aircraft Type *</Label>
                          <Input 
                            id="aircraftType" 
                            name="aircraftType" 
                            value={formData.aircraftType} 
                            onChange={handleInputChange} 
                            placeholder="e.g., Boeing 737-800, Airbus A320" 
                            className={errors.aircraftType ? 'border-destructive' : ''} 
                          />
                          {errors.aircraftType && <p className="text-sm text-destructive">{errors.aircraftType}</p>}
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="aircraftRegistration">Aircraft Registration</Label>
                          <Input 
                            id="aircraftRegistration" 
                            name="aircraftRegistration" 
                            value={formData.aircraftRegistration} 
                            onChange={handleInputChange} 
                            placeholder="e.g., N123AB" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Airport/Location *</Label>
                          <Input 
                            id="location" 
                            name="location" 
                            value={formData.location} 
                            onChange={handleInputChange} 
                            placeholder="e.g., JFK, Miami International" 
                            className={errors.location ? 'border-destructive' : ''} 
                          />
                          {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Parts & Urgency Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Parts & Urgency</h3>
                      <div className="space-y-2">
                        <Label htmlFor="partNumbers">Part Numbers (separated by commas or line breaks) *</Label>
                        <Textarea 
                          id="partNumbers" 
                          name="partNumbers" 
                          value={formData.partNumbers} 
                          onChange={handleInputChange} 
                          rows={3} 
                          placeholder="e.g., 123-45678, ABC-987654, DEF-111222..." 
                          className={errors.partNumbers ? 'border-destructive' : ''} 
                        />
                        {errors.partNumbers && <p className="text-sm text-destructive">{errors.partNumbers}</p>}
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="urgencyLevel">Urgency Level</Label>
                          <select 
                            id="urgencyLevel" 
                            name="urgencyLevel" 
                            value={formData.urgencyLevel} 
                            onChange={handleInputChange} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value="critical">🔴 Critical (Immediate)</option>
                            <option value="high">🟡 High (Within 4 hours)</option>
                            <option value="medium">🟢 Medium (Within 24 hours)</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="leadTime">Required Lead Time</Label>
                          <Input 
                            id="leadTime" 
                            name="leadTime" 
                            value={formData.leadTime} 
                            onChange={handleInputChange} 
                            placeholder="e.g., ASAP, 2 hours, next flight out" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Additional Information</Label>
                        <Textarea 
                          id="message" 
                          name="message" 
                          value={formData.message} 
                          onChange={handleInputChange} 
                          rows={4} 
                          placeholder="Describe the problem, any additional context, or special requirements..." 
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full rounded-md py-4 text-base bg-red-600 hover:bg-red-700" 
                      disabled={formState === 'loading'}
                    >
                      {formState === 'loading' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {formState === 'loading' ? '🚨 Sending AOG Request...' : '🚨 Send AOG Emergency Request'}
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
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our AOG Service Commitment</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">We understand the operational and financial impact of an AOG event. Our process is designed for speed, reliability, and clear communication.</p>
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