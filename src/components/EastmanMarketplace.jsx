import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, FileText, CheckCircle, Search, Filter, X, Download, 
  ChevronRight, Award, Droplet, Layers, ShoppingCart
} from 'lucide-react';
import lubricantsData from '../data/lubricants-data.json';
import { useCart } from '@/contexts/CartContext';
import FloatingCart from '@/components/FloatingCart';

const EastmanMarketplace = () => {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  
  const products = lubricantsData.products;
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
    const matchesStock = !inStockOnly || product.inStock;
    return matchesSearch && matchesCategory && matchesBrand && matchesStock;
  });

  const getProductImage = (product) => {
    // Usa la ruta de imagen del producto si existe, sino usa el nombre del producto
    return product.image || `/images/lubricants/${product.name}.png`;
  };

  const downloadPDF = (datasheet) => {
    window.open(datasheet.url, '_blank');
  };

  const stats = {
    totalProducts: products.length,
    inStock: products.filter(p => p.inStock).length,
    withDocs: products.filter(p => p.datasheets?.length > 0).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-[1600px] mx-auto px-6 py-8 pt-28">
        <div className="flex gap-8">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 space-y-6">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Buscar Producto</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input type="text" placeholder="Part number, descripción..." value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Filter className="h-4 w-4" /> Categorías
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'all', label: 'Todos los productos' },
                    { id: 'TURBINE ENGINE OIL', label: 'Turbine Engine Oil' },
                    { id: 'HYDRAULIC FLUID', label: 'Hydraulic Fluid' },
                    { id: 'PISTON ENGINE OIL', label: 'Piston Engine Oil' },
                    { id: 'GREASES', label: 'Greases' },
                    { id: 'SPECIALTY', label: 'Specialty' },
                    { id: 'EXPENDABLES', label: 'Expendables' },
                    { id: 'NON-AVIATION', label: 'Non-Aviation' }
                  ].map(cat => (
                    <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${
                        selectedCategory === cat.id 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md' 
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">
                          {cat.label}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {products.filter(p => cat.id === 'all' || p.category === cat.id).length}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-3 block">Disponibilidad</label>
                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">Solo en stock</span>
                  </div>
                </label>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-semibold text-gray-700 mb-3">Estadísticas</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total productos:</span>
                    <span className="font-semibold text-gray-900">{stats.totalProducts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">En stock:</span>
                    <span className="font-semibold text-green-600">{stats.inStock}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Con documentos:</span>
                    <span className="font-semibold text-blue-600">{stats.withDocs}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }} onClick={() => setSelectedProduct(product)}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all cursor-pointer group">
                    <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                      <img src={getProductImage(product)} alt={product.displayName || product.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => { 
                          e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%23f3f4f6' width='400' height='300'/%3E%3Cg transform='translate(200,120)'%3E%3Ccircle cx='0' cy='0' r='50' fill='%239ca3af' opacity='0.3'/%3E%3Cpath d='M-20,-40 L-20,40 L20,40 L20,-40 Z' fill='%239ca3af' opacity='0.5'/%3E%3Ccircle cx='0' cy='-30' r='8' fill='%236b7280'/%3E%3C/g%3E%3Ctext fill='%236b7280' font-family='Arial' font-size='14' font-weight='600' x='50%25' y='85%25' text-anchor='middle'%3E${encodeURIComponent(product.displayName || product.name)}%3C/text%3E%3C/svg%3E`; 
                        }} />
                      {product.inStock && (
                        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                          <CheckCircle className="h-3 w-3" /> En Stock
                        </div>
                      )}
                      {product.datasheets?.length > 0 && (
                        <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                          <FileText className="h-3 w-3" /> {product.datasheets.length} docs
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="mb-3">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {product.displayName || product.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-gray-500 uppercase tracking-wide">{product.brand}</p>
                          <span className="text-gray-300">•</span>
                          <p className="text-xs text-blue-600 font-medium">{product.category}</p>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                      {product.specifications?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.specifications.slice(0, 2).map((spec, idx) => (
                            <span key={idx} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">{spec}</span>
                          ))}
                          {product.specifications.length > 2 && (
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                              +{product.specifications.length - 2} más
                            </span>
                          )}
                        </div>
                      )}

                      <div className="pt-4 border-t border-gray-100 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            {product.price > 0 ? (
                              <p className="text-xl font-bold text-red-600">${product.price.toFixed(2)}</p>
                            ) : (
                              <p className="text-sm text-gray-500 font-medium">Consultar precio</p>
                            )}
                          </div>
                          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
                            Ver detalles <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                        <button 
                          onClick={() => addToCart(product)}
                          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-1.5 text-sm rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
                        >
                          <ShoppingCart className="h-3.5 w-3.5" />
                          Agregar a Cotización
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Package className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No se encontraron productos</h3>
                <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b z-10 px-8 py-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-lg">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedProduct.displayName || selectedProduct.name}
                    </h2>
                    <p className="text-sm text-gray-500">{selectedProduct.brand}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedProduct(null)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>

              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 flex items-center justify-center">
                    <img src={getProductImage(selectedProduct)} alt={selectedProduct.name} className="max-h-80 object-contain"
                      onError={(e) => { e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23f3f4f6' width='400' height='300'/%3E%3Ctext fill='%239ca3af' font-family='Arial' font-size='16' x='50%25' y='50%25' text-anchor='middle'%3E${selectedProduct.name}%3C/text%3E%3C/svg%3E`; }} />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h3>
                      <p className="text-gray-600">{selectedProduct.description}</p>
                    </div>

                    {/* Especificaciones Técnicas Completas */}
                    {selectedProduct.specifications && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Especificaciones Técnicas</h3>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                          {selectedProduct.specifications.manufacturer && (
                            <div className="flex justify-between py-2 border-b border-gray-200">
                              <span className="text-gray-600 font-medium">Fabricante:</span>
                              <span className="text-gray-900">{selectedProduct.specifications.manufacturer}</span>
                            </div>
                          )}
                          {selectedProduct.specifications.partType && (
                            <div className="flex justify-between py-2 border-b border-gray-200">
                              <span className="text-gray-600 font-medium">Tipo:</span>
                              <span className="text-gray-900">{selectedProduct.specifications.partType}</span>
                            </div>
                          )}
                          {selectedProduct.specifications.units && (
                            <div className="flex justify-between py-2 border-b border-gray-200">
                              <span className="text-gray-600 font-medium">Unidades:</span>
                              <span className="text-gray-900">{selectedProduct.specifications.units}</span>
                            </div>
                          )}
                          {selectedProduct.specifications.nationalStockNumber && (
                            <div className="flex justify-between py-2 border-b border-gray-200">
                              <span className="text-gray-600 font-medium">National Stock #:</span>
                              <span className="text-gray-900 font-mono text-sm">{selectedProduct.specifications.nationalStockNumber}</span>
                            </div>
                          )}
                          {selectedProduct.specifications.groupCode && (
                            <div className="flex justify-between py-2 border-b border-gray-200">
                              <span className="text-gray-600 font-medium">Group Code:</span>
                              <span className="text-gray-900">{selectedProduct.specifications.groupCode}</span>
                            </div>
                          )}
                          {selectedProduct.specifications.application && selectedProduct.specifications.application !== 'No Application Specified' && (
                            <div className="flex justify-between py-2 border-b border-gray-200">
                              <span className="text-gray-600 font-medium">Aplicación:</span>
                              <span className="text-gray-900">{selectedProduct.specifications.application}</span>
                            </div>
                          )}
                          {selectedProduct.specifications.shelfLife && (
                            <div className="flex justify-between py-2 border-b border-gray-200">
                              <span className="text-gray-600 font-medium">Vida Útil:</span>
                              <span className="text-gray-900">{selectedProduct.specifications.shelfLife}</span>
                            </div>
                          )}
                          {selectedProduct.specifications.limitedShelfLife && (
                            <div className="flex justify-between py-2 border-b border-gray-200">
                              <span className="text-gray-600 font-medium">Vida Útil Limitada:</span>
                              <span className={`font-semibold ${selectedProduct.specifications.limitedShelfLife === 'Yes' ? 'text-orange-600' : 'text-green-600'}`}>
                                {selectedProduct.specifications.limitedShelfLife}
                              </span>
                            </div>
                          )}
                          {selectedProduct.specifications.hazardousMaterial && (
                            <div className="flex justify-between py-2 border-b border-gray-200">
                              <span className="text-gray-600 font-medium">Material Peligroso:</span>
                              <span className={`font-semibold ${selectedProduct.specifications.hazardousMaterial === 'Yes' ? 'text-red-600' : 'text-green-600'}`}>
                                {selectedProduct.specifications.hazardousMaterial}
                              </span>
                            </div>
                          )}
                          {selectedProduct.specifications.class && (
                            <div className="flex justify-between py-2 border-b border-gray-200">
                              <span className="text-gray-600 font-medium">Class:</span>
                              <span className="text-gray-900">{selectedProduct.specifications.class}</span>
                            </div>
                          )}
                          {selectedProduct.specifications.unNumber && (
                            <div className="flex justify-between py-2">
                              <span className="text-gray-600 font-medium">UN #:</span>
                              <span className="text-gray-900 font-mono text-sm">{selectedProduct.specifications.unNumber}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {selectedProduct.features?.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Características</h3>
                        <ul className="space-y-2">
                          {selectedProduct.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-600">
                              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedProduct.certifications?.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Certificaciones</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct.certifications.map((cert, idx) => (
                            <span key={idx} className="bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-sm flex items-center gap-2">
                              <Award className="h-4 w-4" /> {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-4 pt-4 border-t">
                      {selectedProduct.inStock && (
                        <span className="bg-green-100 text-green-800 px-4 py-2 rounded-lg flex items-center gap-2">
                          <CheckCircle className="h-5 w-5" /> En Stock
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {selectedProduct.datasheets?.length > 0 && (
                  <div className="border-t pt-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <FileText className="h-6 w-6 text-red-600" />
                      Documentación Técnica ({selectedProduct.datasheets.length})
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedProduct.datasheets.map((datasheet, idx) => (
                        <motion.div key={idx} whileHover={{ scale: 1.02 }}
                          className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-5 hover:border-red-500 transition-all cursor-pointer"
                          onClick={() => downloadPDF(datasheet)}>
                          <div className="flex items-start gap-4">
                            <div className="bg-red-100 p-3 rounded-lg">
                              <FileText className="h-6 w-6 text-red-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 mb-1">
                                {datasheet.name || datasheet.displayName || datasheet.realFilename || `Documento ${idx + 1}`}
                              </h4>
                              <p className="text-xs text-gray-500 mb-2">
                                {datasheet.type || datasheet.docType || 'PDF'}
                              </p>
                              {datasheet.url && (
                                <p className="text-xs text-gray-400 truncate">Haz click para descargar</p>
                              )}
                            </div>
                            <Download className="h-5 w-5 text-gray-400 flex-shrink-0" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t pt-8 mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Layers className="h-6 w-6 text-red-600" /> Productos Alternativos
                  </h3>
                  {selectedProduct.alternativeProducts && selectedProduct.alternativeProducts.length > 0 ? (
                    <div className="space-y-3">
                      <p className="text-gray-600 text-sm mb-4">
                        Productos equivalentes y alternativas compatibles
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {selectedProduct.alternativeProducts.map((alt, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-gray-50 rounded-lg border border-blue-200">
                            <div className="bg-blue-100 p-2 rounded-lg">
                              <Layers className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900">{alt.partNumber || alt.name}</p>
                              {alt.manufacturer && (
                                <p className="text-xs text-gray-500">{alt.manufacturer}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      Próximamente: Productos equivalentes y alternativas compatibles
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FloatingCart />
    </div>
  );
};

export default EastmanMarketplace;
