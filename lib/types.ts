export type Currency = 'KWD' | 'AED' | 'SAR' | 'BHD' | 'OMR' | 'QAR';

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  currency: Currency;
  mileage: number;
  color: string;
  transmission: string;
  fuelType: string;
  engineSize: string;
  horsepower: number;
  features: string[];
  image: string;
  images: string[];
  description: string;
  status: 'available' | 'sold' | 'pending';
  createdAt: string;
  updatedAt: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
}

export const CURRENCIES: { code: Currency; name: string; symbol: string }[] = [
  { code: 'KWD', name: 'الدينار الكويتي', symbol: 'د.ك' },
  { code: 'AED', name: 'درهم إماراتي', symbol: 'د.إ' },
  { code: 'SAR', name: 'ريال سعودي', symbol: 'ر.س' },
  { code: 'BHD', name: 'دينار بحريني', symbol: 'د.ب' },
  { code: 'OMR', name: 'ريال عماني', symbol: 'ر.ع' },
  { code: 'QAR', name: 'ريال قطري', symbol: 'ر.ق' },
];

export const AR_TRANSLATIONS = {
  // Header
  home: 'الرئيسية',
  cars: 'السيارات',
  admin: 'إدارة',
  logout: 'تسجيل خروج',
  
  // Home
  welcomeToSwiftMotors: 'أهلا بك في سويفت موتورز',
  experienceLuxury: 'اختبر الفخامة والأداء العالي',
  discover: 'اكتشف مجموعتنا الحصرية من السيارات الفاخرة',
  browseInventory: 'استعرض المخزون',
  viewFeaturedCars: 'شاهد السيارات المميزة',
  featuredVehicles: 'السيارات المميزة',
  exploreOurCollection: 'اكتشف مجموعتنا المختارة من السيارات الفاخرة',
  premiumSelection: 'اختيار متميز',
  handpicked: 'سيارات مختارة بعناية من أبرز الشركات المصنعة',
  guaranteedQuality: 'جودة مضمونة',
  qualityGuarantee: 'تأتي كل سيارة مع فحوصات شاملة وضمان الحماية',
  fastService: 'خدمة سريعة',
  expertSupport: 'دعم متخصص ومعالجة سريعة للحصول على سيارتك',
  readyToFind: 'هل أنت مستعد للعثور على سيارتك المثالية؟',
  ourTeam: 'فريقنا المتخصص هنا لمساعدتك في العثور على السيارة المناسبة',
  getStartedNow: 'ابدأ الآن',
  
  // Cars Listing
  allVehicles: 'جميع السيارات',
  browseOurFullInventory: 'استعرض مخزوننا الكامل من السيارات الفاخرة',
  search: 'بحث',
  filter: 'تصفية',
  noResults: 'لم يتم العثور على نتائج',
  
  // Car Details
  specifications: 'المواصفات',
  year: 'السنة',
  color: 'اللون',
  transmission: 'ناقل الحركة',
  fuelType: 'نوع الوقود',
  engineSize: 'حجم المحرك',
  horsepower: 'قوة الحصان',
  mileage: 'المسافة المقطوعة',
  features: 'الميزات',
  inquireNow: 'استفسر الآن',
  
  // Admin
  adminDashboard: 'لوحة التحكم',
  login: 'تسجيل الدخول',
  username: 'اسم المستخدم',
  password: 'كلمة المرور',
  signIn: 'تسجيل الدخول',
  invalidCredentials: 'بيانات الدخول غير صحيحة',
  manageCars: 'إدارة السيارات',
  addNewCar: 'إضافة سيارة جديدة',
  editCar: 'تعديل السيارة',
  deleteCar: 'حذف السيارة',
  save: 'حفظ',
  cancel: 'إلغاء',
  delete: 'حذف',
  edit: 'تعديل',
  create: 'إنشاء',
  carAdded: 'تم إضافة السيارة بنجاح',
  carUpdated: 'تم تحديث السيارة بنجاح',
  carDeleted: 'تم حذف السيارة بنجاح',
  selectCurrency: 'اختر العملة',
  price: 'السعر',
  make: 'الصانع',
  model: 'الموديل',
};
