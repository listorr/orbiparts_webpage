import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Mail, Building2, User, Phone, MapPin, Package } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const QuoteRequestModal = ({ isOpen, onClose, cartItems, onSuccess }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    country: '',
    city: '',
    destination: '',
    comments: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your full name",
        variant: "destructive"
      });
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return false;
    }
    if (!formData.company.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your company name",
        variant: "destructive"
      });
      return false;
    }
    if (!formData.destination.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter the shipping destination",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const sendQuoteRequest = async () => {
    if (!validateForm()) return;
    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before requesting a quote",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Prepare email content
      const productsHtml = cartItems.map(item => `
        <tr>
          <td style="padding: 12px; border: 1px solid #e5e7eb;">${item.name}</td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;">${item.partNumber || item.nsn || 'N/A'}</td>
          <td style="padding: 12px; border: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;">${item.units || 'Unit'}</td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;">${item.price ? `$${item.price.toFixed(2)}` : 'Request Quote'}</td>
        </tr>
      `).join('');

      const totalEstimate = cartItems.reduce((sum, item) => {
        return sum + ((item.price || 0) * item.quantity);
      }, 0);

      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Quote Request from ORBIPARTS Website</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">🛒 New Quote Request</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">ORBIPARTS Lubricants Marketplace</p>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-left: 3px solid #dc2626; border-right: 3px solid #dc2626;">
            <h2 style="color: #dc2626; margin-top: 0; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">Customer Information</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 150px;">👤 Full Name:</td>
                <td style="padding: 8px 0;">${formData.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">📧 Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${formData.email}" style="color: #dc2626;">${formData.email}</a></td>
              </tr>
              ${formData.phone ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">📱 Phone:</td>
                <td style="padding: 8px 0;">${formData.phone}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">🏢 Company:</td>
                <td style="padding: 8px 0;">${formData.company}</td>
              </tr>
              ${formData.position ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">💼 Position:</td>
                <td style="padding: 8px 0;">${formData.position}</td>
              </tr>
              ` : ''}
              ${formData.country ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">🌍 Country:</td>
                <td style="padding: 8px 0;">${formData.country}</td>
              </tr>
              ` : ''}
              ${formData.city ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">📍 City:</td>
                <td style="padding: 8px 0;">${formData.city}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">🚚 Shipping Destination:</td>
                <td style="padding: 8px 0; color: #dc2626; font-weight: 600;">${formData.destination}</td>
              </tr>
            </table>

            <h2 style="color: #dc2626; margin-top: 30px; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">📦 Requested Products (${cartItems.length} items)</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <thead>
                <tr style="background: #dc2626; color: white;">
                  <th style="padding: 12px; text-align: left; border: 1px solid #dc2626;">Product Name</th>
                  <th style="padding: 12px; text-align: left; border: 1px solid #dc2626;">Part Number</th>
                  <th style="padding: 12px; text-align: center; border: 1px solid #dc2626;">Quantity</th>
                  <th style="padding: 12px; text-align: left; border: 1px solid #dc2626;">Unit</th>
                  <th style="padding: 12px; text-align: left; border: 1px solid #dc2626;">Unit Price</th>
                </tr>
              </thead>
              <tbody>
                ${productsHtml}
              </tbody>
            </table>

            ${totalEstimate > 0 ? `
            <div style="margin-top: 20px; padding: 15px; background: white; border-left: 4px solid #dc2626; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <p style="margin: 0; font-size: 18px;"><strong>Estimated Total:</strong> <span style="color: #dc2626; font-size: 24px; font-weight: bold;">$${totalEstimate.toFixed(2)}</span></p>
              <p style="margin: 5px 0 0 0; font-size: 12px; color: #6b7280;">* Final pricing subject to confirmation</p>
            </div>
            ` : ''}

            ${formData.comments ? `
            <h2 style="color: #dc2626; margin-top: 30px; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">💬 Additional Comments</h2>
            <div style="background: white; padding: 15px; border-radius: 5px; margin-top: 15px; white-space: pre-wrap; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              ${formData.comments}
            </div>
            ` : ''}
          </div>

          <div style="background: #1f2937; color: white; padding: 20px; border-radius: 0 0 10px 10px; text-align: center;">
            <p style="margin: 0; font-size: 14px;">📅 Request submitted on ${new Date().toLocaleString()}</p>
            <p style="margin: 10px 0 0 0; font-size: 12px; opacity: 0.8;">ORBIPARTS - Your Trusted Aviation Parts Supplier</p>
          </div>
        </body>
        </html>
      `;

      // Send email using Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: 'sales@orbiparts.com',
          subject: `🛒 New Quote Request from ${formData.company} - ${cartItems.length} items`,
          html: emailHtml,
          replyTo: formData.email
        }
      });

      if (error) throw error;

      toast({
        title: "Quote Request Sent! ✅",
        description: "Our sales team will contact you within 24 hours",
      });

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        position: '',
        country: '',
        city: '',
        destination: '',
        comments: ''
      });

      if (onSuccess) onSuccess();
      onClose();

    } catch (error) {
      console.error('Error sending quote request:', error);
      toast({
        title: "Error Sending Request",
        description: error.message || "Please try again or contact us directly at sales@orbiparts.com",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-red-600 flex items-center gap-2">
            <Mail className="w-6 h-6" />
            Request Quote
          </DialogTitle>
          <DialogDescription>
            Fill out your contact information and we'll send you a detailed quote for {cartItems.length} product{cartItems.length !== 1 ? 's' : ''}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-red-600" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@company.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Purchasing Manager"
                />
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Building2 className="w-5 h-5 text-red-600" />
              Company Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="ABC Aviation Services"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="United States"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Miami"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="destination">Shipping Destination *</Label>
                <Input
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="Airport, City, Country (e.g., MIA - Miami International Airport, USA)"
                  required
                />
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Package className="w-5 h-5 text-red-600" />
              Order Summary ({cartItems.length} items)
            </h3>
            
            <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between items-start py-2 border-b border-gray-200 last:border-0">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity} × {item.units || 'Unit'}</p>
                  </div>
                  {item.price && (
                    <p className="font-semibold text-red-600">${(item.price * item.quantity).toFixed(2)}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Additional Comments */}
          <div className="space-y-2">
            <Label htmlFor="comments">Additional Comments</Label>
            <Textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              placeholder="Please specify delivery requirements, preferred lead times, or any special requests..."
              rows={4}
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button 
            onClick={sendQuoteRequest} 
            disabled={loading}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending Request...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Send Quote Request
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteRequestModal;
