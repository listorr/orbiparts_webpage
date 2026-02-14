import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SEOHead from '@/components/SEOHead';
import { jsPDF } from 'jspdf';
import { 
  FileText, Shield, Scale, Truck, CreditCard, RotateCcw, AlertCircle, 
  ChevronRight, Calendar, Download, ChevronLeft 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const sections = [
  { 
    id: 'acceptance', 
    title: "1. Order Acceptance", 
    icon: FileText, 
    content: [
      "All orders are subject to written acceptance by OrbiParts LLC. No order shall be binding until Seller issues a formal order acknowledgment or invoice. Seller reserves the right to refuse, cancel, or allocate orders at its sole discretion."
    ]
  },
  { 
    id: 'pricing', 
    title: "2. Quotations and Pricing", 
    icon: Scale, 
    content: [
      "Written quotations are valid for thirty (30) calendar days from the date of issuance, unless otherwise stated in writing, or until the Product is sold, whichever occurs first.",
      "All prices are in U.S. Dollars (USD) and are exclusive of taxes, duties, shipping, and insurance costs, which shall be borne by the Buyer.",
      "Prices are subject to change without notice prior to order acceptance. Seller may modify or withdraw any quotation at any time before formal acceptance of an order."
    ]
  },
  { 
    id: 'payment', 
    title: "3. Payment Terms", 
    icon: CreditCard, 
    content: [
      "Unless credit terms have been expressly approved in writing by OrbiParts LLC, payment in full must be received prior to shipment.",
      "Accepted payment methods include wire transfer, ACH, or check.",
      "Returned or dishonored payments will incur additional fees and may delay fulfillment.",
      "Seller reserves the right to charge interest of 1.5% per month (18% per annum) or the maximum rate permitted by law on any overdue balance."
    ]
  },
  { 
    id: 'shipping', 
    title: "4. Shipping and Delivery", 
    icon: Truck, 
    content: [
      "Unless otherwise expressly agreed in writing, all shipments shall be made Ex Works (EXW) / FOB Doral, Florida, USA, in accordance with Incoterms® 2020.",
      "All goods shall be packaged in accordance with ASA-100 standards, suitable for the nature of the material and sufficient to protect against damage, contamination, corrosion, or deterioration during handling, storage, and transportation.",
      "Risk of loss and title to the goods shall pass to the Buyer upon Seller’s release of the goods to the carrier or freight forwarder.",
      "All delivery dates provided by Seller are estimates only. Seller shall not be liable for any delays or failure in delivery resulting from actions or omissions of carriers, customs authorities, acts of government, force majeure events, or any other causes beyond Seller’s reasonable control.",
      "Buyer shall be solely responsible for all transportation, insurance, export and import licenses, duties, taxes, customs clearance, and any other charges or costs associated with shipment of the goods."
    ]
  },
  { 
    id: 'inspection', 
    title: "5. Inspection and Acceptance", 
    icon: Shield, 
    content: [
      "Buyer shall inspect all goods within ten (10) calendar days of receipt.",
      "Any claims for shortages, defects, or non-conformities must be submitted in writing to Seller within that period.",
      "If no claim is made within ten (10) days, the Products shall be deemed accepted “as-is”, and no returns or refunds will be accepted thereafter except as permitted under warranty."
    ]
  },
  { 
    id: 'returns', 
    title: "6. Returns and Restocking", 
    icon: RotateCcw, 
    content: [
      "No Products may be returned without a Return Material Authorization (RMA) issued by Seller.",
      "Non-warranty returns are accepted only at Seller’s discretion and subject to a twenty-five percent (25%) restocking fee.",
      "Returned Products must be in their original condition and packaging, accompanied by all trace documentation and a non-use statement.",
      "Buyer is responsible for all return shipping and associated costs."
    ]
  },
  { 
    id: 'warranty', 
    title: "7. Warranty", 
    icon: Shield, 
    content: [
      "Products sold by OrbiParts LLC are covered solely by the warranty of the Original Equipment Manufacturer (OEM) or the certifying repair station, if applicable.",
      "OrbiParts LLC makes no additional warranties, express or implied, unless explicitly provided in writing.",
      "Warranty claims must comply with the original warrantor’s terms and procedures."
    ]
  },
  { 
    id: 'refund', 
    title: "8. Refund Policy", 
    icon: CreditCard, 
    content: [
      "Refunds are granted only if an RMA is requested and approved within the ten (10)-day inspection period and the return meets all applicable conditions.",
      "Requests outside this period will be handled as warranty repairs or replacements only, with no monetary refund."
    ]
  },
  { 
    id: 'liability', 
    title: "9. Limitation of Liability", 
    icon: Scale, 
    content: [
      "Seller’s total liability, whether arising in contract, tort, or otherwise, shall not exceed the purchase price of the specific Products giving rise to the claim.",
      "In no event shall Seller be liable for indirect, incidental, special, or consequential damages, including but not limited to loss of profits, loss of data, downtime, or business interruption."
    ]
  },
  { 
    id: 'export', 
    title: "10. Export Control and Compliance", 
    icon: AlertCircle, 
    content: [
      "Buyer acknowledges that all Products supplied by OrbiParts LLC may be subject to U.S. export control laws and regulations, including the Export Administration Regulations (EAR) and, where applicable, the International Traffic in Arms Regulations (ITAR).",
      "Buyer agrees to comply with all such laws and assumes sole responsibility for obtaining any export, re-export, or import licenses required for its activities.",
      "Products may not be exported, sold, or transferred to any embargoed country, restricted end user, or prohibited end use, including military or dual-use activities without proper authorization.",
      "Buyer agrees to indemnify and hold OrbiParts LLC harmless from any violation of export control regulations arising from Buyer’s actions."
    ]
  },
  { 
    id: 'force', 
    title: "11. Force Majeure", 
    icon: Shield, 
    content: [
      "OrbiParts LLC shall not be liable for any delay or failure in performance caused by events beyond its reasonable control, including but not limited to acts of God, war, terrorism, labor disputes, embargoes, shortages of materials, natural disasters, pandemics, or governmental restrictions.",
      "In such cases, Seller’s time for performance shall be extended for a period equal to the delay. Seller may also, at its discretion, cancel the affected portion of the order without liability."
    ]
  },
  { 
    id: 'law', 
    title: "12. Governing Law and Jurisdiction", 
    icon: Scale, 
    content: [
      "These Terms and all related transactions shall be governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict of law principles.",
      "Any dispute arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the state and federal courts located in Doral, Miami-Dade County, Florida, and Buyer hereby irrevocably submits to such jurisdiction."
    ]
  },
  { 
    id: 'agreement', 
    title: "13. Entire Agreement", 
    icon: FileText, 
    content: [
      "These Terms, together with Seller’s quotation or invoice, constitute the entire agreement between OrbiParts LLC and Buyer and supersede all prior oral or written communications, representations, or agreements regarding the sale of Products.",
      "No modification or waiver shall be valid unless made in writing and signed by an authorized representative of both parties."
    ]
  },
];

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const generatePDF = async () => {
    setIsGeneratingPdf(true);
    try {
      const doc = new jsPDF();
      // Use White Logo for Dark Background
      const logoUrl = 'https://fjhynjjirvcyeahmlopq.supabase.co/storage/v1/object/public/assets/b34bd64a-153f-4c75-9bed-1bba68cece2a/1756816595602.png';
      const primaryColor = [3, 19, 43]; // #03132B
      const accentColor = [37, 99, 235]; // #2563EB (Blue-600)

      // Helper to load image
      const loadImage = (url) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'Anonymous';
          img.src = url;
          img.onload = () => resolve(img);
          img.onerror = reject;
        });
      };

      // --- Header Design (Dark Blue Background) ---
      doc.setFillColor(...primaryColor);
      doc.rect(0, 0, doc.internal.pageSize.width, 40, 'F');

      try {
        const logoImg = await loadImage(logoUrl);
        const logoWidth = 25; // Significant reduction in size (was 40-50)
        const logoHeight = (logoImg.height / logoImg.width) * logoWidth;
        // Vertically center in 40px header: (40 - h) / 2
        const logoY = (40 - logoHeight) / 2;
        doc.addImage(logoImg, 'PNG', 20, logoY, logoWidth, logoHeight);
      } catch (e) {
        console.error("Could not load logo", e);
        doc.setFontSize(20);
        doc.setTextColor(255, 255, 255);
        doc.text("ORBIPARTS", 20, 28);
      }

      // Header Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20); // Slightly smaller to match elegant look
      doc.setTextColor(255, 255, 255);
      doc.text("Terms & Conditions", doc.internal.pageSize.width - 20, 18, { align: 'right' });
      
      doc.setFontSize(9);
      doc.setTextColor(200, 200, 200); 
      doc.setFont("helvetica", "normal");
      doc.text("Effective Date: February 2026", doc.internal.pageSize.width - 20, 28, { align: 'right' });

      // --- Content ---
      let yPos = 55;

      // Introduction
      doc.setFontSize(14);
      doc.setTextColor(...primaryColor);
      const introTitle = "Agreement Overview";
      doc.setFont("helvetica", "bold");
      doc.text(introTitle, 20, yPos);
      yPos += 8;

      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      doc.setFont("helvetica", "normal");
      const introText = "These Terms and Conditions (\"Terms\") govern all quotations, sales, and deliveries of aircraft parts, materials, and related products (\"Products\") by OrbiParts LLC, a company organized and existing under the laws of the State of Florida, USA (\"Seller\"), to any customer (\"Buyer\"). By placing an order with Seller, Buyer agrees to be bound by these Terms.";
      
      const splitIntro = doc.splitTextToSize(introText, doc.internal.pageSize.width - 40);
      doc.text(splitIntro, 20, yPos);
      yPos += (splitIntro.length * 5) + 12;

      // Separator
      doc.setDrawColor(220, 220, 220);
      doc.line(20, yPos - 5, doc.internal.pageSize.width - 20, yPos - 5);
      
      // Sections
      sections.forEach((section, index) => {
        // Estimate height needed for Title + First paragraph
        const firstParaLines = doc.splitTextToSize(section.content[0] || "", doc.internal.pageSize.width - 45);
        // Title (8) + paragraph (lines * 5)
        const heightNeeded = 20 + (firstParaLines.length * 5); 

        // Check if we need to add a page BEFORE starting the section title
        if (yPos + heightNeeded > doc.internal.pageSize.height - 30) {
          doc.addPage();
          yPos = 35; // Start content just below header
          
          // Add mini header on subsequent pages
          doc.setFillColor(...primaryColor);
          doc.rect(0, 0, doc.internal.pageSize.width, 20, 'F');
          doc.setFontSize(8);
          doc.setTextColor(255, 255, 255);
          doc.text("OrbiParts LLC - Terms & Conditions", 20, 12);
        }

        // Section Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(...primaryColor);
        
        // Accent square
        doc.setFillColor(...accentColor);
        doc.rect(20, yPos - 3, 3, 3, 'F');
        
        doc.text(section.title.toUpperCase(), 26, yPos);
        yPos += 8; // Move down after title

        // Content
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(50, 50, 50);

        section.content.forEach((paragraph) => {
          const splitText = doc.splitTextToSize(paragraph, doc.internal.pageSize.width - 45);
          const paraHeight = splitText.length * 5;
          
          // Check if THIS paragraph fits
          if (yPos + paraHeight > doc.internal.pageSize.height - 30) {
            doc.addPage();
            yPos = 35; // Reset Y for new page
            
            // Re-add mini header
            doc.setFillColor(...primaryColor);
            doc.rect(0, 0, doc.internal.pageSize.width, 20, 'F');
            doc.setFontSize(8);
            doc.setTextColor(255, 255, 255);
            doc.text("OrbiParts LLC - Terms & Conditions", 20, 12);
          }
          
          doc.text(splitText, 26, yPos);
          yPos += paraHeight + 4; // Space after paragraph
        });
        
        yPos += 6; // Space after section
      });

      // Footer
      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.line(20, doc.internal.pageSize.height - 20, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 20);
        doc.text(`Page ${i} of ${totalPages}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 12, { align: 'right' });
        doc.text(`OrbiParts LLC - Confidential`, 20, doc.internal.pageSize.height - 12);
      }

      doc.save('OrbiParts_Terms_and_Conditions.pdf');
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Sticky header offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <>
      <SEOHead 
        title="Terms and Conditions of Sale | OrbiParts LLC" 
        description="Comprehensive Terms and Conditions governing all quotations, sales, and deliveries of aircraft parts and materials by OrbiParts LLC."
        canonicalUrl="https://www.orbiparts.com/terms"
      />
      
      <div className="min-h-screen bg-gray-50/50">
        {/* Modern Hero Section */}
        <section className="relative bg-[#0b1c3e] text-white pt-32 pb-24 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                 <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
                 <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl"
                >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-blue-200 mb-6 backdrop-blur-sm">
                    <Calendar className="w-4 h-4" />
                    <span>Last Updated: February 2026</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
                    Terms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Conditions</span>
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                    These terms govern all quotations, sales, and deliveries of aircraft parts, materials, and related products by OrbiParts LLC.
                </p>
                </motion.div>
            </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-24 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Sidebar Navigation - Sticky */}
            <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                  <div className="p-4 bg-gray-50 border-b border-gray-100 font-semibold text-gray-900 flex items-center justify-between">
                    <span>Table of Contents</span>
                  </div>
                  <nav className="p-2 max-h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all flex items-center justify-between group ${
                          activeSection === section.id 
                            ? 'bg-blue-50 text-blue-700 font-medium' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <span className="truncate mr-2">{section.title.split('. ')[1]}</span>
                        {activeSection === section.id && (
                          <ChevronRight className="w-3.5 h-3.5 text-blue-600" />
                        )}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-lg text-white">
                  <h3 className="font-bold text-lg mb-2">Need Help?</h3>
                  <p className="text-blue-100 text-sm mb-4 leading-relaxed">
                    Have questions about our terms? Our legal team is here to help.
                  </p>
                  <Button variant="secondary" className="w-full bg-white text-blue-900 hover:bg-blue-50 border-0">
                    Contact Legal Support
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-6">
              {/* Introduction Card */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-2xl shadow-lg shadow-gray-200/40 border border-gray-100"
              >
                <div className="flex items-start gap-5">
                  <div className="p-3.5 bg-blue-50 rounded-2xl shrink-0">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900">Legal Agreement</h2>
                    <p className="text-gray-600 leading-relaxed">
                      These Terms and Conditions (“Terms”) govern all quotations, sales, and deliveries of
                      aircraft parts, materials, and related products (“Products”) by OrbiParts LLC, a
                      company organized and existing under the laws of the State of Florida, USA (“Seller”),
                      to any customer (“Buyer”). By placing an order with Seller, Buyer agrees to be bound
                      by these Terms, which supersede any other terms or conditions contained in Buyer’s
                      documents unless expressly accepted in writing by an authorized representative of
                      Seller.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Sections */}
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    onViewportEnter={() => setActiveSection(section.id)}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-300 overflow-hidden group scroll-mt-28"
                  >
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 group-hover:bg-blue-50 flex items-center justify-center text-gray-400 group-hover:text-blue-600 transition-colors duration-300">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors">{section.title}</h2>
                      </div>
                      <div className="space-y-4 leading-relaxed pl-16 text-gray-600">
                      {section.content.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Download PDF CTA - Minimalist Version */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8 bg-white border border-gray-200 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-900">Download PDF Version</h3>
                    <p className="text-sm text-gray-500">Save a copy for your records</p>
                  </div>
                </div>

                <Button 
                  onClick={generatePDF}
                  disabled={isGeneratingPdf}
                  variant="outline"
                  className="shrink-0 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 min-w-[140px]"
                >
                  {isGeneratingPdf ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </span>
                  )}
                </Button>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions;
