import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FloatingQuoteButton = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+19292299520";
    const message = "Hi ORBIPARTS team, I need help with some components.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      className="floating-button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Button
        onClick={handleWhatsAppClick}
        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </motion.div>
  );
};

export default FloatingQuoteButton;