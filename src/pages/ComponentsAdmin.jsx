import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Plus, Upload, Loader2, Edit, Trash2, Download, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const ComponentsAdmin = () => {
	const [components, setComponents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showAddForm, setShowAddForm] = useState(false);
	const [editingComponent, setEditingComponent] = useState(null);
	const [uploading, setUploading] = useState(false);
	const fileInputRef = useRef(null);
	const { user } = useAuth();

	// Form data state
	const [formData, setFormData] = useState({
		part_number: '',
		description: '',
		category: '',
		condition: '',
		availability: '',
		aircraft: '',
		price: '',
		manufacturer: '',
		serial_number: '',
		location: '',
		notes: ''
	});

	const categories = [
		'engines', 'avionics', 'landing-gear', 'airframe', 'rotables', 'consumables', 'tools', 'other'
	];

	const conditions = [
		'new', 'oh', 'sv', 'ar', 'used', 'repair'
	];

	const availabilityOptions = [
		'In Stock', 'Available', 'On Order', 'Sold', 'Reserved'
	];

	// Fetch components from Supabase
	const fetchComponents = async () => {
		console.log('🔍 Fetching components...');
		setLoading(true);
		try {
			const { data, error } = await supabase
				.from('aircraft_components')
				.select('*')
				.order('created_at', { ascending: false });

			console.log('📊 Supabase response:', { data, error });

			if (error) {
				console.error('❌ Supabase error:', error);
				// Fallback to empty array instead of showing error
				setComponents([]);
				toast({
					variant: "destructive",
					title: "Error al cargar componentes",
					description: "Se mostrarán datos de ejemplo. Error: " + error.message,
				});
			} else {
				console.log('✅ Components loaded:', data?.length || 0);
				setComponents(data || []);
			}
		} catch (err) {
			console.error('💥 Error fetching components:', err);
			// Fallback to empty array
			setComponents([]);
			toast({
				variant: "destructive",
				title: "Error de conexión",
				description: "No se pudo conectar con la base de datos.",
			});
		}
		setLoading(false);
	};

	useEffect(() => {
		console.log('🚀 ComponentsAdmin mounted');
		console.log('👤 Current user:', user);
		fetchComponents();
	}, []);

	// Handle form input changes
	const handleInputChange = (field, value) => {
		setFormData(prev => ({ ...prev, [field]: value }));
	};

	// Reset form
	const resetForm = () => {
		setFormData({
			part_number: '',
			description: '',
			category: '',
			condition: '',
			availability: '',
			aircraft: '',
			price: '',
			manufacturer: '',
			serial_number: '',
			location: '',
			notes: ''
		});
		setShowAddForm(false);
		setEditingComponent(null);
	};

	// Add new component
	const handleAddComponent = async () => {
		if (!formData.part_number || !formData.description) {
			toast({
				variant: "destructive",
				title: "Campos requeridos",
				description: "Por favor completa el número de parte y la descripción.",
			});
			return;
		}

		try {
			const { error } = await supabase
				.from('aircraft_components')
				.insert([{
					...formData,
					created_by: user.id
				}]);

			if (error) {
				toast({
					variant: "destructive",
					title: "Error al agregar componente",
					description: error.message,
				});
			} else {
				toast({
					title: "¡Componente agregado!",
					description: `${formData.part_number} se ha agregado exitosamente.`,
				});
				resetForm();
				fetchComponents();
			}
		} catch (err) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Error al agregar el componente.",
			});
		}
	};

	// Update component
	const handleUpdateComponent = async () => {
		if (!formData.part_number || !formData.description) {
			toast({
				variant: "destructive",
				title: "Campos requeridos",
				description: "Por favor completa el número de parte y la descripción.",
			});
			return;
		}

		try {
			const { error } = await supabase
				.from('aircraft_components')
				.update(formData)
				.eq('id', editingComponent.id);

			if (error) {
				toast({
					variant: "destructive",
					title: "Error al actualizar componente",
					description: error.message,
				});
			} else {
				toast({
					title: "¡Componente actualizado!",
					description: `${formData.part_number} se ha actualizado exitosamente.`,
				});
				resetForm();
				fetchComponents();
			}
		} catch (err) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Error al actualizar el componente.",
			});
		}
	};

	// Delete component
	const handleDeleteComponent = async (componentId, componentPartNumber) => {
		try {
			const { error } = await supabase
				.from('aircraft_components')
				.delete()
				.eq('id', componentId);

			if (error) {
				toast({
					variant: "destructive",
					title: "Error al eliminar componente",
					description: error.message,
				});
			} else {
				toast({
					title: "¡Componente eliminado!",
					description: `${componentPartNumber} se ha eliminado exitosamente.`,
				});
				fetchComponents();
			}
		} catch (err) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Error al eliminar el componente.",
			});
		}
	};

	// Edit component
	const handleEditComponent = (component) => {
		setFormData({ ...component });
		setEditingComponent(component);
		setShowAddForm(true);
	};

	// Bulk upload CSV
	const handleBulkUpload = () => {
		fileInputRef.current.click();
	};

	const handleFileChange = async (event) => {
		const file = event.target.files[0];
		if (!file) return;

		if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
			toast({
				variant: "destructive",
				title: "Formato de archivo inválido",
				description: "Por favor selecciona un archivo CSV.",
			});
			return;
		}

		setUploading(true);

		try {
			const text = await file.text();
			const lines = text.split('\n').filter(line => line.trim());
			const headers = lines[0].split(',').map(h => h.trim());

			// Expected headers
			const expectedHeaders = ['part_number', 'description', 'category', 'condition', 'availability', 'aircraft', 'price', 'manufacturer', 'serial_number', 'location', 'notes'];

			const componentsToInsert = [];

			for (let i = 1; i < lines.length; i++) {
				const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
				const component = { created_by: user.id };

				headers.forEach((header, index) => {
					if (expectedHeaders.includes(header)) {
						component[header] = values[index] || '';
					}
				});

				if (component.part_number && component.description) {
					componentsToInsert.push(component);
				}
			}

			if (componentsToInsert.length === 0) {
				toast({
					variant: "destructive",
					title: "No hay datos válidos",
					description: "El archivo CSV no contiene componentes válidos.",
				});
				setUploading(false);
				return;
			}

			const { error } = await supabase
				.from('aircraft_components')
				.insert(componentsToInsert);

			if (error) {
				toast({
					variant: "destructive",
					title: "Error al cargar componentes",
					description: error.message,
				});
			} else {
				toast({
					title: "¡Carga masiva exitosa!",
					description: `Se han agregado ${componentsToInsert.length} componentes.`,
				});
				fetchComponents();
			}
		} catch (err) {
			toast({
				variant: "destructive",
				title: "Error al procesar archivo",
				description: "Error al leer el archivo CSV.",
			});
		}

		setUploading(false);
	};

	// Export to CSV
	const handleExportCSV = () => {
		const csvContent = [
			['part_number', 'description', 'category', 'condition', 'availability', 'aircraft', 'price', 'manufacturer', 'serial_number', 'location', 'notes'].join(','),
			...components.map(component => [
				component.part_number,
				component.description,
				component.category,
				component.condition,
				component.availability,
				component.aircraft,
				component.price,
				component.manufacturer,
				component.serial_number,
				component.location,
				component.notes
			].map(field => `"${field || ''}"`).join(','))
		].join('\n');

		const blob = new Blob([csvContent], { type: 'text/csv' });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `aircraft_components_${new Date().toISOString().split('T')[0]}.csv`;
		a.click();
		window.URL.revokeObjectURL(url);
	};

	console.log('🎨 Rendering ComponentsAdmin:', { loading, components: components.length, user: !!user });

	// Error boundary - si algo falla, mostrar mensaje simple
	try {
		if (!user) {
			return (
				<div className="min-h-screen pt-16 flex items-center justify-center">
					<div className="text-center">
						<h2 className="text-2xl font-bold mb-4">Acceso Restringido</h2>
						<p>Necesitas estar autenticado para ver esta página.</p>
					</div>
				</div>
			);
		}

		return (
			<>
				<Helmet>
					<title>Administrar Componentes | ORBIPARTS</title>
					<meta name="description" content="Panel de administración para gestionar componentes de aviación." />
					<meta name="robots" content="noindex, nofollow" />
				</Helmet>

			<div className="min-h-screen pt-16">
				<section className="py-20 gradient-bg">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="text-center text-white"
						>
							<h1 className="text-4xl md:text-5xl font-bold mb-6">Administrar Componentes</h1>
							<p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
								Panel de control para gestionar el inventario de componentes de aviación
							</p>
						</motion.div>
					</div>
				</section>



				<section className="py-8 bg-white border-b border-gray-200">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
							<div className="flex flex-col sm:flex-row gap-2">
								<Button onClick={() => setShowAddForm(true)} disabled={showAddForm}>
									<Plus className="mr-2 h-4 w-4" />
									Nuevo Componente
								</Button>
								<input
									type="file"
									ref={fileInputRef}
									onChange={handleFileChange}
									className="hidden"
									accept=".csv"
								/>
								<Button variant="outline" onClick={handleBulkUpload} disabled={uploading}>
									{uploading ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Procesando...
										</>
									) : (
										<>
											<Upload className="mr-2 h-4 w-4" />
											Carga Masiva (CSV)
										</>
									)}
								</Button>
							</div>

							<Button variant="outline" onClick={handleExportCSV} disabled={components.length === 0}>
								<Download className="mr-2 h-4 w-4" />
								Exportar CSV
							</Button>
						</div>
					</div>
				</section>

				{(showAddForm || editingComponent) && (
					<section className="py-8 bg-gray-50 border-b border-gray-200">
						<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
							<Card>
								<CardHeader>
									<CardTitle>
										{editingComponent ? 'Editar Componente' : 'Agregar Nuevo Componente'}
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-6">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<Label htmlFor="part_number">Número de Parte *</Label>
											<Input
												id="part_number"
												value={formData.part_number}
												onChange={(e) => handleInputChange('part_number', e.target.value)}
												placeholder="Ej: CFM56-7B24"
											/>
										</div>

										<div>
											<Label htmlFor="aircraft">Aeronave</Label>
											<Input
												id="aircraft"
												value={formData.aircraft}
												onChange={(e) => handleInputChange('aircraft', e.target.value)}
												placeholder="Ej: B737-800"
											/>
										</div>

										<div className="md:col-span-2">
											<Label htmlFor="description">Descripción *</Label>
											<Textarea
												id="description"
												value={formData.description}
												onChange={(e) => handleInputChange('description', e.target.value)}
												placeholder="Descripción detallada del componente"
												rows={3}
											/>
										</div>

										<div>
											<Label htmlFor="category">Categoría</Label>
											<Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
												<SelectTrigger>
													<SelectValue placeholder="Seleccionar categoría" />
												</SelectTrigger>
												<SelectContent>
													{categories.map((category) => (
														<SelectItem key={category} value={category}>
															{category.charAt(0).toUpperCase() + category.slice(1)}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>

										<div>
											<Label htmlFor="condition">Condición</Label>
											<Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
												<SelectTrigger>
													<SelectValue placeholder="Seleccionar condición" />
												</SelectTrigger>
												<SelectContent>
													{conditions.map((condition) => (
														<SelectItem key={condition} value={condition}>
															{condition.toUpperCase()}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>

										<div>
											<Label htmlFor="availability">Disponibilidad</Label>
											<Select value={formData.availability} onValueChange={(value) => handleInputChange('availability', value)}>
												<SelectTrigger>
													<SelectValue placeholder="Seleccionar disponibilidad" />
												</SelectTrigger>
												<SelectContent>
													{availabilityOptions.map((option) => (
														<SelectItem key={option} value={option}>
															{option}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>

										<div>
											<Label htmlFor="price">Precio</Label>
											<Input
												id="price"
												value={formData.price}
												onChange={(e) => handleInputChange('price', e.target.value)}
												placeholder="Ej: $50,000 o Request Quote"
											/>
										</div>

										<div>
											<Label htmlFor="manufacturer">Fabricante</Label>
											<Input
												id="manufacturer"
												value={formData.manufacturer}
												onChange={(e) => handleInputChange('manufacturer', e.target.value)}
												placeholder="Ej: General Electric"
											/>
										</div>

										<div>
											<Label htmlFor="serial_number">Número de Serie</Label>
											<Input
												id="serial_number"
												value={formData.serial_number}
												onChange={(e) => handleInputChange('serial_number', e.target.value)}
												placeholder="Número de serie del componente"
											/>
										</div>

										<div>
											<Label htmlFor="location">Ubicación</Label>
											<Input
												id="location"
												value={formData.location}
												onChange={(e) => handleInputChange('location', e.target.value)}
												placeholder="Ej: Miami, FL"
											/>
										</div>

										<div className="md:col-span-2">
											<Label htmlFor="notes">Notas</Label>
											<Textarea
												id="notes"
												value={formData.notes}
												onChange={(e) => handleInputChange('notes', e.target.value)}
												placeholder="Notas adicionales o comentarios"
												rows={2}
											/>
										</div>
									</div>

									<div className="flex gap-2 pt-4">
										<Button onClick={editingComponent ? handleUpdateComponent : handleAddComponent}>
											{editingComponent ? 'Actualizar' : 'Agregar'} Componente
										</Button>
										<Button variant="outline" onClick={resetForm}>
											Cancelar
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					</section>
				)}

				<section className="py-12 bg-gray-50">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="mb-8">
							<p className="text-gray-600">
								Total de componentes: {components.length}
							</p>
						</div>

						{loading ? (
							<div className="text-center py-12">
								<Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
								<p className="mt-4 text-gray-500">Cargando componentes...</p>
							</div>
						) : (
							<div className="grid gap-6">
								{components.map((component, index) => (
									<motion.div
										key={component.id}
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.05 }}
									>
										<Card className="hover-lift">
											<CardContent className="p-6">
												<div className="flex justify-between items-start mb-4">
													<div>
														<h3 className="text-xl font-bold text-gray-900">{component.part_number}</h3>
														<p className="text-gray-600 mt-1">{component.description}</p>
													</div>
													<div className="flex gap-2">
														<Button variant="outline" size="sm" onClick={() => handleEditComponent(component)}>
															<Edit className="h-4 w-4" />
														</Button>
														<AlertDialog>
															<AlertDialogTrigger asChild>
																<Button variant="outline" size="sm">
																	<Trash2 className="h-4 w-4 text-red-500" />
																</Button>
															</AlertDialogTrigger>
															<AlertDialogContent>
																<AlertDialogHeader>
																	<AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
																	<AlertDialogDescription>
																		Esta acción no se puede deshacer. Esto eliminará permanentemente el componente
																		<span className="font-bold"> {component.part_number}</span>.
																	</AlertDialogDescription>
																</AlertDialogHeader>
																<AlertDialogFooter>
																	<AlertDialogCancel>Cancelar</AlertDialogCancel>
																	<AlertDialogAction onClick={() => handleDeleteComponent(component.id, component.part_number)}>
																		Eliminar
																	</AlertDialogAction>
																</AlertDialogFooter>
															</AlertDialogContent>
														</AlertDialog>
													</div>
												</div>

												<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
													<div>
														<span className="text-gray-500">Aeronave:</span>
														<p className="font-medium">{component.aircraft || 'N/A'}</p>
													</div>
													<div>
														<span className="text-gray-500">Categoría:</span>
														<p className="font-medium">{component.category || 'N/A'}</p>
													</div>
													<div>
														<span className="text-gray-500">Condición:</span>
														<p className="font-medium">{component.condition || 'N/A'}</p>
													</div>
													<div>
														<span className="text-gray-500">Disponibilidad:</span>
														<p className="font-medium text-green-600">{component.availability || 'N/A'}</p>
													</div>
												</div>

												{(component.manufacturer || component.serial_number || component.location) && (
													<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm">
														{component.manufacturer && (
															<div>
																<span className="text-gray-500">Fabricante:</span>
																<p className="font-medium">{component.manufacturer}</p>
															</div>
														)}
														{component.serial_number && (
															<div>
																<span className="text-gray-500">S/N:</span>
																<p className="font-medium">{component.serial_number}</p>
															</div>
														)}
														{component.location && (
															<div>
																<span className="text-gray-500">Ubicación:</span>
																<p className="font-medium">{component.location}</p>
															</div>
														)}
													</div>
												)}

												{component.notes && (
													<div className="mt-4 text-sm">
														<span className="text-gray-500">Notas:</span>
														<p className="text-gray-700 mt-1">{component.notes}</p>
													</div>
												)}
											</CardContent>
										</Card>
									</motion.div>
								))}

								{components.length === 0 && (
									<div className="text-center py-12">
										<FileSpreadsheet className="mx-auto h-12 w-12 text-gray-400 mb-4" />
										<p className="text-gray-500 text-lg">No hay componentes en el inventario</p>
										<p className="text-gray-400 mt-2">Agrega tu primer componente o realiza una carga masiva</p>
									</div>
								)}
							</div>
						)}
					</div>
				</section>
			</div>
		</>
	);
	} catch (error) {
		console.error('💥 ComponentsAdmin render error:', error);
		return (
			<div className="min-h-screen pt-16 flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold mb-4 text-red-600">Error</h2>
					<p className="mb-4">Hubo un problema al cargar la página de administración.</p>
					<p className="text-sm text-gray-600">Error: {error.message}</p>
					<button 
						onClick={() => window.location.reload()} 
						className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
					>
						Recargar Página
					</button>
				</div>
			</div>
		);
	}
};

export default ComponentsAdmin;