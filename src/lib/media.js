const SUPABASE_MEDIA_BASE_URL = 'https://fjhynjjirvcyeahmlopq.supabase.co/storage/v1/object/public/blog-media';

const supabaseEnabled = typeof import.meta !== 'undefined'
	&& import.meta.env
	&& import.meta.env.VITE_USE_SUPABASE_MEDIA === 'true';

export const supabaseImage = (path) => `${SUPABASE_MEDIA_BASE_URL}/${path}`;

export const getMediaSrc = (path, fallbackUrl) => {
	if (supabaseEnabled && path) {
		return supabaseImage(path);
	}

	return fallbackUrl;
};

export const createOnErrorHandler = (fallbackUrl) => (event) => {
	if (!fallbackUrl || !event?.currentTarget) return;

	const img = event.currentTarget;
	img.onerror = null;
	img.src = fallbackUrl;
};
