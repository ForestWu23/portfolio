export interface Project {
  id: string
  title: string
  subtitle: string
  thumbnail: string
  comingSoon?: boolean
}

export const projects: Project[] = [
  {
    id: 'buyerfolio',
    title: 'BuyerFolio',
    subtitle: 'Mobile Product Design For the Home-Selling Journey',
    thumbnail: 'images/KindleCoverPage.png',
  },
  {
    id: 'kindle',
    title: 'Kindle',
    subtitle: 'Mobile Product Redesign For Digital Reading',
    thumbnail: 'images/KindleCoverPage.png',
  },
  {
    id: 'green-apple',
    title: 'Green Apple Art Center',
    subtitle: 'Website Redesign For an Art Education Platform',
    thumbnail: 'images/KindleCoverPage.png',
  },
  {
    id: 'micro-ingredients',
    title: 'Micro Ingredients',
    subtitle: 'Amazon Landing Page For Conversion and Brand Storytelling',
    thumbnail: 'images/KindleCoverPage.png',
  },
  {
    id: 'huagen',
    title: 'Huagen Culture Center',
    subtitle: 'Brand System and Website Design For a Cultural Organization',
    thumbnail: 'images/KindleCoverPage.png',
  },
  {
    id: 'velvety',
    title: 'Velvety Design',
    subtitle: 'Website Design For a Creative Design Studio',
    thumbnail: 'images/KindleCoverPage.png',
  },
  {
    id: 'nutribites',
    title: 'NutriBites',
    subtitle: 'Website Design For a Pet Nutrition Brand',
    thumbnail: 'images/KindleCoverPage.png',
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
  {
    id: 'wanderlust',
    title: 'Wanderlust',
    subtitle: 'Mobile Experience Design For Travel Discovery',
    thumbnail: '',
    comingSoon: true,
  },
]
