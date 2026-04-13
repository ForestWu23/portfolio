export interface Project {
  id: string
  title: string
  subtitle: string
  thumbnail: string
  detailPath?: string
  comingSoon?: boolean
  passwordProtected?: boolean
}

export const projects: Project[] = [
  {
    id: 'buyerfolio',
    title: 'BuyerFolio',
    subtitle: 'Mobile Product Design For the Home-Selling Journey',
    thumbnail: 'images/covers/buyerfolio.jpg',
    detailPath: '/projects/buyerfolio',
  },
  {
    id: 'kindle',
    title: 'Kindle',
    subtitle: 'Mobile Product Redesign For Digital Reading',
    thumbnail: 'images/covers/kindle.png',
    detailPath: '/projects/kindle',
  },
  {
    id: 'green-apple',
    title: 'Green Apple Art Center',
    subtitle: 'Website Redesign For an Art Education Platform',
    thumbnail: 'images/covers/green-apple.jpg',
    detailPath: '/projects/greenapple',
  },
  {
    id: 'amazon-landing',
    title: 'Amazon Product Landing Page',
    subtitle: 'Designing a High-Converting Amazon Product Experience for Micro Ingredient',
    thumbnail: 'images/covers/amazon-landing.jpg',
    passwordProtected: true,
  },
  {
    id: 'micro-ingredients',
    title: 'Micro Ingredients',
    subtitle: 'Creative Direction for High-Impact TikTok Product Content',
    thumbnail: 'images/covers/micro-ingredients.png',
    passwordProtected: true,
  },
  {
    id: 'nutribites',
    title: 'NutriBites',
    subtitle: 'Website Design For a Pet Nutrition Brand',
    thumbnail: 'images/covers/nutribites.png',
    detailPath: '/projects/nutribites',
  },
  {
    id: 'ridgeline-homes',
    title: 'Ridgeline Homes',
    subtitle: 'Immersive Web Design For Modern Construction',
    thumbnail: 'images/covers/ridgeline-homes.png',
    detailPath: '/projects/builder',
  },
  {
    id: 'huagen',
    title: 'Huagen Culture Center',
    subtitle: 'Brand System and Website Design For a Cultural Organization',
    thumbnail: 'images/covers/huagen.png',
  },
  {
    id: 'velvety',
    title: 'Velvety Design',
    subtitle: 'Website Design For a Creative Design Studio',
    thumbnail: 'images/covers/velvety.png',
    comingSoon: true,
  },
]
