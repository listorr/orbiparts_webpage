const SUPABASE_MEDIA_BASE_URL = 'https://fjhynjjirvcyeahmlopq.supabase.co/storage/v1/object/public/blog-media';

// Always enable Supabase media (was previously conditional based on env var)
const supabaseEnabled = true;

export const supabaseImage = (path) => `${SUPABASE_MEDIA_BASE_URL}/${path}`;

// Returns a string URL for the image. First tries local public/, then Supabase.
// If path is falsy, return null so React does not render a src attribute.
export const getMediaSrc = (path/*, fallbackUrl intentionally ignored */) => {
	if (!path) return null;
	
	// Blog hero images are stored locally in public/ folder
	const blogHeroImages = [
		'future-of-legacy-aircraft-hero.jpg',
		'top-10-aircraft-parts-suppliers-2025-hero.jpg',
		'miami-aviation-logistics-hero.jpg',
		'aog-response-strategies-hero.jpg',
		'sustainable-aviation-component-trading-hero.jpg',
		'global-aircraft-parts-supply-chains-hero.jpg',
		'technology-trends-component-management-hero.jpg'
	];
	
	// Check if this is a blog hero image
	if (blogHeroImages.includes(path)) {
		return `/${path}`;
	}
	
	// Otherwise use Supabase
	if (supabaseEnabled) return supabaseImage(path);
	return null;
};

// If an image fails to load, hide it instead of swapping in a fallback image.
export const createOnErrorHandler = () => (event) => {
	if (!event?.currentTarget) return;
	const img = event.currentTarget;
	img.onerror = null;
	// hide the broken image so nothing irrelevant appears
	img.style.display = 'none';
};
