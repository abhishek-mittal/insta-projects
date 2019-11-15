import { JourneyDetails } from './JourneyWizard';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  journeys: Array<JourneyDetails>;
}
