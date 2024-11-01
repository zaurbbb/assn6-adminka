import { lazy } from "react";

const LoginPage = lazy(() => import("../pages/LoginPage.tsx"));
const HomePage = lazy(() => import("../pages/HomePage.tsx"));
const UsersPage = lazy(() => import("../pages/UsersPage.tsx"));
const ProfileSectionsPage = lazy(() => import("../pages/ProfileSectionsPage.tsx"));
const ContactsPage = lazy(() => import("../pages/ContactsPage.tsx"));
const OrdersPage = lazy(() => import("../pages/OrdersPage.tsx"));
const ProductsPage = lazy(() => import("../pages/ProductsPage.tsx"));
const AppointmentsPage = lazy(() => import("../pages/AppointmentsPage.tsx"));
const CategoriesPage = lazy(() => import("../pages/CategoriesPage.tsx"));
const SubCategoriesPage = lazy(() => import("../pages/SubCategoriesPage.tsx"));
const BrandsPage = lazy(() => import("../pages/BrandsPage.tsx"));
const CharacteristicsPage = lazy(() => import("../pages/CharacteristicsPage.tsx"));
const AttributesPage = lazy(() => import("../pages/AttributesPage.tsx"));
const ServicesPage = lazy(() => import("../pages/ServicesPage.tsx"));
const SubServicesPage = lazy(() => import("../pages/SubServicesPage.tsx"));
const ServiceItemsPage = lazy(() => import("../pages/ServiceItemsPage.tsx"));
const StaffPage = lazy(() => import("../pages/StaffPage.tsx"));
const FAQPage = lazy(() => import("../pages/FaqPage.tsx"));
const ServiceAddressesPage = lazy(() => import("../pages/ServiceAddressesPage.tsx"));
const CountriesPage = lazy(() => import("../pages/CountriesPage.tsx"));
const CitiesPage = lazy(() => import("../pages/CitiesPage.tsx"));
const FilialAddressesPage = lazy(() => import("../pages/FilialAddressesPage.tsx"));
const PersonalAddressesPage = lazy(() => import("../pages/PersonalAddressesPage.tsx"));

const NotFoundPage = lazy(() => import("../pages/NotFoundPage.tsx"));

export const publicRoutes = [
  { path: "/login", element: <LoginPage /> },
];

export const privateRoutes = [
  // home
  { path: "/home", element: <HomePage /> },

  // users
  { path: "/users", element: <UsersPage /> },

  // profile sections
  { path: "/profileSections", element: <ProfileSectionsPage /> },

  // contacts
  { path: "/contacts", element: <ContactsPage/> },


  // orders
  { path: "/orders", element: <OrdersPage /> },
  // products
  { path: "/products", element: <ProductsPage /> },

  // discounts
  { path: "/notFound", element: <NotFoundPage /> },

  // categories
  { path: "/categories", element: <CategoriesPage /> },
  // categories -> subCategories by categoryId
  { path: "/categories/:categoryId/subCategories", element: <SubCategoriesPage /> },
  // categories -> subCategories -> products by subCategoryId
  { path: "/categories/:categoryId/subCategories/:subCategoryId/products", element: <ProductsPage /> },
  // categories -> subCategories -> characteristics by subCategoryId
  { path: "/categories/:categoryId/subCategories/:subCategoryId/characteristics", element: <CharacteristicsPage /> },

  // brands
  { path: "/brands", element: <BrandsPage /> },
  // brands -> products by brandId
  { path: "/brands/:brandId/products", element: <ProductsPage /> },

  // characteristics
  { path: "/characteristics", element: <CharacteristicsPage /> },
  // characteristics -> attributes by characteristicId
  { path: "/characteristics/:characteristicId/attributes", element: <AttributesPage /> },

  // attributes
  { path: "/attributes", element: <AttributesPage /> },

  // brands
  { path: "/characteristics", element: <BrandsPage /> },
  // brands -> products by brandId
  { path: "/brands/:brandId/products", element: <ProductsPage /> },

  // deliveryAddresses
  { path: "/deliveryAddresses", element: <NotFoundPage /> },

  // appointments
  { path: "/appointments", element: <AppointmentsPage /> },

  // services
  { path: "/services", element: <ServicesPage /> },
  // services -> subServices by serviceId
  { path: "/services/:serviceId/subServices", element: <SubServicesPage /> },
  // services -> subServices -> serviceItems by subServiceId
  { path: "/services/:serviceId/subServices/:subServiceId/serviceItems", element: <ServiceItemsPage /> },
  // services -> staff
  { path: "/services/:serviceId/staff", element: <StaffPage /> },
  // serviceAddresses
  { path: "/serviceAddresses", element: <ServiceAddressesPage /> },
  // serviceAddresses -> staff by serviceAddressId
  { path: "/serviceAddresses/:serviceAddressId/staff", element: <StaffPage /> },

  // serviceItems
  { path: "/serviceItems", element: <ServiceItemsPage /> },
  // serviceItems by subServiceId
  { path: "/serviceItems/:subServiceId", element: <ServiceItemsPage /> },

  // staff
  { path: "/staff", element: <StaffPage /> },
  // staff -> appointments by staffId
  { path: "/appointments/:staffId", element: <AppointmentsPage /> },

  // faq
  { path: "/faq", element: <FAQPage /> },

  // countries
  { path: "/countries", element: <CountriesPage /> },

  // cities
  { path: "/cities", element: <CitiesPage /> },

  // filial addresses
  { path: "/filialAddresses", element: <FilialAddressesPage /> },

  // personal addresses
  { path: "/personalAddresses", element: <PersonalAddressesPage /> },

];

