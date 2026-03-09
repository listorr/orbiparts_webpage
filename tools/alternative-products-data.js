// Productos alternativos conocidos para lubricantes EASTMAN
// Basado en especificaciones MIL-PRF y compatibilidades de la industria

export const alternativeProducts = {
  // TURBINE OIL 2197 (MIL-PRF-23699 HTS)
  '35914': ['2197-QT', '2380-55GL', '2380-QT', '2389-55GL'], // 2197-55GL alternatives
  '79614': ['2197-55GL', '2380-QT', '2389-QT'], // 2197-QT alternatives
  
  // TURBINE OIL 2380 (MIL-PRF-23699G-STD)
  '19310': ['2380-QT', '2380-5GL', '2197-55GL'], // 2380-55GL alternatives
  '26526': ['2380-55GL', '2380-QT', '2197-QT'], // 2380-5GL alternatives
  '37935': ['2380-55GL', '2380-5GL', '2197-QT', '2389-QT'], // 2380-QT alternatives
  
  // TURBINE OIL 2389 (MIL-PRF-7808L GR 3)
  '67709': ['2389-QT', '2197-55GL', '2380-55GL'], // 2389-55GL alternatives
  '55983': ['2389-55GL', '2197-QT', '2380-QT'], // 2389-QT alternatives
  
  // TURBINE OIL 25
  '194462': ['2197-QT', '2380-QT', '2389-QT'], // 25-QT alternatives
  
  // SKYDROL 500B4 (HYDRAULIC FLUID)
  '17969': ['500B4-QT', '500B4-GL', 'LD4-55GL'], // 500B4-55GL alternatives
  '18330': ['500B4-55GL', '500B4-QT', 'LD4-5GL'], // 500B4-5GL alternatives
  '33646': ['500B4-55GL', '500B4-QT', 'LD4-GL'], // 500B4-GL alternatives
  '18063': ['500B4-55GL', '500B4-GL', 'LD4-QT'], // 500B4-QT alternatives
  
  // LD4 HYDRAULIC FLUID (MIL-PRF-83282D)
  '80646': ['LD4-QT', 'LD4-GL', 'PE5-55GL'], // LD4-55GL alternatives
  '187581': [], // EMN2380MC-1L (decal, no alternatives)
  '187580': [], // EMN2380MC-1S (adhesive)
  '19311': ['LD4-55GL', 'LD4-QT', 'PE5-5GL'], // LD4-5GL alternatives
  '18993': ['LD4-55GL', 'LD4-5GL', 'PE5-GL'], // LD4-GL alternatives
  
  // MCS352B (SPECIALTY)
  '28839': ['MCS352B-QT'], // MCS352B-5.4OZ alternatives
  '28800': ['MCS352B-5.4OZ'], // MCS352B-QT alternatives
  
  // PE5 HYDRAULIC FLUID (MIL-PRF-87257E)
  '26412': ['PE5-QT', 'PE5-GL', 'SKY5-55GL'], // PE5-55GL alternatives
  '163380': ['PE5-55GL', 'PE5-QT', 'SKY5-5GL'], // PE5-5GL alternatives
  '79958': ['PE5-55GL', 'PE5-5GL', 'SKY5-GL'], // PE5-GL alternatives
  '81697': ['PE5-55GL', 'PE5-GL', 'SKY5-QT'], // PE5-QT alternatives
  
  // REFERENCE OIL 300
  '121335': [], // No common alternatives
  
  // SK1000 (SPECIALTY)
  '60598': ['SK1000-5GL', 'SK2000-QT'], // SK1000-16OZ alternatives
  '33461': ['SK1000-16OZ', 'SK2000-QT'], // SK1000-5GL alternatives
  
  // SK2000 (SPECIALTY)
  '30311': ['SK1000-16OZ', 'SK1000-5GL'], // SK2000-QT alternatives
  
  // SKYDROL 5 HYDRAULIC FLUID
  '171867': [], // Need to research
  '27952': ['SKY5-GL', 'SKY5-QT', 'PE5-5GL'], // SKY5-5GL alternatives
  '57217': ['SKY5-5GL', 'SKY5-QT', 'PE5-GL'], // SKY5-GL alternatives
  '190037': ['SKY5-5GL', 'SKY5-GL', 'PE5-QT'], // SKY5-QT alternatives
  '21797': ['500B4-QT', 'PE5-QT', 'SKY5-QT'] // LD4-QT alternatives
};

// Función para obtener alternativos con más información
export function getAlternativesForProduct(skuNumber) {
  const alts = alternativeProducts[skuNumber] || [];
  return alts.map(partNumber => ({
    partNumber,
    manufacturer: 'EASTMAN'
  }));
}
