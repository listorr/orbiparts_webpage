const SUPABASE_MEDIA_BASE_URL = 'https://fjhynjjirvcyeahmlopq.supabase.co/storage/v1/object/public/blog-media';

const supabaseEnabled = typeof import.meta !== 'undefined'
	&& import.meta.env
	&& import.meta.env.VITE_USE_SUPABASE_MEDIA === 'true';

export const supabaseImage = (path) => `${SUPABASE_MEDIA_BASE_URL}/${path}`;

// Returns a string URL for the image when Supabase media is enabled.
// If media is disabled or path is falsy, return null so React does not render a src attribute.
export const getMediaSrc = (path/*, fallbackUrl intentionally ignored */) => {
	if (supabaseEnabled && path) return supabaseImage(path);
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
