import React, { useState, useEffect, useRef } from 'react';
  import { Helmet } from 'react-helmet';
  import { motion } from 'framer-motion';
  import { Copy, Upload, Loader2, Trash2 } from 'lucide-react';
  import { Button } from '@/components/ui/button';
  import { Card, CardContent } from '@/components/ui/card';
  import { toast } from '@/components/ui/use-toast';
  import { supabase } from '@/lib/customSupabaseClient';
  import { useAuth } from '@/contexts/SupabaseAuthContext';

  const AssetLibrary = () => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);
    const { user } = useAuth();

    const fetchAssets = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error al cargar los recursos",
          description: error.message,
        });
      } else {
        setAssets(data);
      }
      setLoading(false);
    };
    
    useEffect(() => {
      fetchAssets();
    }, []);

    const handleCopyToClipboard = (path) => {
      const publicURL = supabase.storage.from('assets').getPublicUrl(path).data.publicUrl;
      navigator.clipboard.writeText(publicURL);
      toast({
        title: "¡Copiado!",
        description: "URL pública de la imagen copiada al portapapeles.",
      });
    };
    
    const handleUploadClick = () => {
      fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      setUploading(true);

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('assets')
        .upload(fileName, file);

      if (uploadError) {
        toast({
          variant: "destructive",
          title: "Error al subir el archivo",
          description: uploadError.message,
        });
        setUploading(false);
        return;
      }

      // Insert record into 'assets' table
      const { error: dbError } = await supabase
        .from('assets')
        .insert({
          file_name: file.name,
          file_path: fileName,
          file_type: file.type,
          file_size: file.size,
          uploader_id: user.id,
          alt_text: file.name,
          usage_tag: 'Unassigned',
        });

      if (dbError) {
        toast({
          variant: "destructive",
          title: "Error al guardar en la base de datos",
          description: dbError.message,
        });
      } else {
        toast({
          title: "¡Subida con éxito!",
          description: `El archivo ${file.name} se ha subido correctamente.`,
        });
        fetchAssets(); // Refresh the asset list
      }
      
      setUploading(false);
    };

    return (
      <>
        <Helmet>
          <title>Asset Library | ORBIPARTS</title>
          <meta name="description" content="A central repository of all visual assets used on the ORBIPARTS website." />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <div className="min-h-screen pt-16">
          <section className="py-20 gradient-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Asset Library (Admin)</h1>
                <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
                  Repositorio central de todos los recursos visuales del sitio web.
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-end mb-8">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/png, image/jpeg, image/webp, image/svg+xml"
                />
                <Button onClick={handleUploadClick} disabled={uploading}>
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Subiendo...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" /> Subir Nuevo Recurso
                    </>
                  )}
                </Button>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
                  <p className="mt-4 text-gray-500">Cargando recursos...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {assets.map((asset, index) => (
                    <motion.div key={asset.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                      <Card className="hover-lift overflow-hidden">
                        <div className="aspect-video bg-gray-100">
                          <img 
                            src={supabase.storage.from('assets').getPublicUrl(asset.file_path).data.publicUrl} 
                            alt={asset.alt_text} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <CardContent className="p-4">
                          <p className="text-sm text-gray-800 font-medium truncate" title={asset.alt_text}>{asset.alt_text}</p>
                          <p className="text-xs text-gray-500 mb-4">Uso: {asset.usage_tag}</p>
                          <Button variant="outline" size="sm" className="w-full" onClick={() => handleCopyToClipboard(asset.file_path)}>
                            <Copy className="mr-2 h-3 w-3" /> Copiar URL
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
              {assets.length === 0 && !loading && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No hay recursos en la librería.</p>
                  <p className="text-gray-400 mt-2">¡Sube tu primer archivo para empezar!</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </>
    );
  };

  export default AssetLibrary;