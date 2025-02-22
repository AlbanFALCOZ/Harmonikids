import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { ColorService } from 'src/services/color-service.service';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
