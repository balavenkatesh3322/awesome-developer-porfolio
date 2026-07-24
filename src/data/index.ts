import aiDataScience from './categories/ai_data_science.json';
import fullStack from './categories/full_stack.json';
import softwareEngineer from './categories/software_engineer.json';
import frontend from './categories/frontend.json';
import mobileAppDev from './categories/mobile_app_dev.json';
import uiUxDesign from './categories/ui_ux_design.json';
import backendCloud from './categories/backend_cloud.json';
import { Portfolio } from '../types';

export const portfoliosByCategory: Record<string, Portfolio[]> = {
  'AI / Data Science': aiDataScience as Portfolio[],
  'Full Stack': fullStack as Portfolio[],
  'Software Engineer': softwareEngineer as Portfolio[],
  'Frontend': frontend as Portfolio[],
  'Mobile App Dev': mobileAppDev as Portfolio[],
  'UI/UX & Design': uiUxDesign as Portfolio[],
  'Backend & Cloud': backendCloud as Portfolio[],
};

export const ALL_PORTFOLIOS: Portfolio[] = [
  ...(aiDataScience as Portfolio[]),
  ...(fullStack as Portfolio[]),
  ...(softwareEngineer as Portfolio[]),
  ...(frontend as Portfolio[]),
  ...(mobileAppDev as Portfolio[]),
  ...(uiUxDesign as Portfolio[]),
  ...(backendCloud as Portfolio[]),
];
