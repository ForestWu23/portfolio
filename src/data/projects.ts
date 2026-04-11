export interface Project {
  id: string
  title: string
  subtitle: string
  thumbnail: string
  detailPath?: string
  comingSoon?: boolean
}

export const projects: Project[] = [
  {
    id: 'ridgeline-homes',
    title: 'Ridgeline Homes',
    subtitle: 'Immersive Web Design For Modern Construction',
    thumbnail: 'images/builder/pool.jpg',
    detailPath: '/projects/builder',
  },
  {
    id: 'buyerfolio',
    title: 'BuyerFolio',
    subtitle: 'Mobile Product Design For the Home-Selling Journey',
    thumbnail: 'images/covers/buyerfolio.jpg',
  },
  {
    id: 'kindle',
    title: 'Kindle',
    subtitle: 'Mobile Product Redesign For Digital Reading',
    thumbnail: 'images/covers/kindle.png',
  },
  {
    id: 'green-apple',
    title: 'Green Apple Art Center',
    subtitle: 'Website Redesign For an Art Education Platform',
    thumbnail: 'images/covers/green-apple.jpg',
    detailPath: '/projects/greenapple',
  },
  {
    id: 'micro-ingredients',
    title: 'Micro Ingredients',
    subtitle: 'Amazon Landing Page For Conversion and Brand Storytelling',
    thumbnail: 'images/covers/kindle.png',
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
    thumbnail: 'images/covers/kindle.png',
  },
  {
    id: 'nutribites',
    title: 'NutriBites',
    subtitle: 'Website Design For a Pet Nutrition Brand',
    thumbnail: 'images/covers/nutribites.png',
    detailPath: '/projects/nutribites',
  },
  {
    id: 'solara',
    title: 'Solara Wellness',
    subtitle: 'Brand Identity and App Design For a Wellness Platform',
    thumbnail: '',
    comingSoon: true,
  },
  {
    id: 'nova-finance',
    title: 'Nova Finance',
    subtitle: 'Dashboard Design For Personal Finance Management',
    thumbnail: '',
    comingSoon: true,
  },
]
