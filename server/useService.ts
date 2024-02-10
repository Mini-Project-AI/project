// ** JWT Service Import
import serverService from './service';

// ** Export Service as useJwt
export default function webService(jwtOverrideConfig?: any) {
  return new serverService(jwtOverrideConfig);
}
