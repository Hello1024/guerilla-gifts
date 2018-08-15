import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, storage: Storage) {
    platform.ready().then(async () => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      // set a uuid if one doesn't exist.
      let query_uuid = platform.getQueryParam('uuid');
      let uuid = await storage.set('uuid', await storage.get('uuid') || query_uuid || uuidv4());

      if (query_uuid && uuid != query_uuid) {
        // ignore errors and response
        try {
          await fetch('https://erraticpacket.com/api/linkuuid?a='+query_uuid+'&b='+uuid);
        }catch(e){}
      }

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}


function uuidv4() {
  // @ts-ignore: javascript type crazyness which works...
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}
