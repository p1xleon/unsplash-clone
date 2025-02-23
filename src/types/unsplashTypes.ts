interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
    raw: string;
  };
  user: UnsplashUser;
  tags: { title: string }[];
  links: {
    html: string;
    download: string;
  };
  created_at: string;
  downloads: string;
  description: string;
  exif: { name: string }[];
  location: {
    city: string;
    country: string;
  };
  related_collections?: {
    results: {
      id: string;
      cover_photo: {
        urls: {
          small: string;
          regular: string;
        };
      };
    }[];
  };
}


interface UnsplashUser {
  id: string;
  name: string;
  profile_image: {
    medium: string;
  };
  username: string;
  links: {
    html: string;
  };
}
