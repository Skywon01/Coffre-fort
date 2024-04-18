import {Routes} from '@angular/router';
import {WelcomeComponent} from './welcome.component';
import {RhComponent} from "../rh/rh.component";
import {MyFileComponent} from "../my-file/my-file.component";
import {NotfoundComponent} from "../404/notfound/notfound.component";
import {NotificationComponent} from "../notification/notification.component";
import {DeviceComponent} from "../device/device.component";
import {ProfilComponent} from "../profil/profil.component";
import {ProfilUpdateComponent} from "../../components/profil-update/profil-update.component";
import {
    SingleEmployeeDisplayerComponent
} from "../../components/single-employee-displayer/single-employee-displayer.component";

export const WELCOME_ROUTES: Routes = [
    {path: '', component: WelcomeComponent},
    {
        path: 'files',
        component: MyFileComponent,
        title: "Mes fichiers"
    },
    {
        path: 'notification',
        component: NotificationComponent,
        title: "Notifications"
    },
    {
        path: 'materiel',
        component: DeviceComponent,
        title: 'Matériel'
    },
    {
        path: 'rh',
        component: RhComponent,
        title: "Accueil RH"
    },
    {
        path: 'profil',
        component: ProfilComponent,
        title: "Mon profil"
    },
    {
        path: 'update-profil',
        component: ProfilUpdateComponent,
        title: "Mon profil"
    },
    {
        path:'user/:id',
        component: SingleEmployeeDisplayerComponent,
        title: "Utilisateur"
    },


    {
        path: '**',
        component: NotfoundComponent,
        title: "Page introuvable"
    }
];
