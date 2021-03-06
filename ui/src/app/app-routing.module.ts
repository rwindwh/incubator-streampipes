/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/components/login/login.component";
import {SetupComponent} from "./login/components/setup/setup.component";
import {StreampipesComponent} from "./core/components/streampipes/streampipes.component";
import {PipelineDetailsComponent} from "./pipeline-details/pipeline-details.component";
import {StandaloneDashboardComponent} from "./dashboard/components/standalone/standalone-dashboard.component";
import {AuthCanActivateChildrenGuard} from "./_guards/auth.can-activate-children.guard";
import {ConfiguredCanActivateGuard} from "./_guards/configured.can-activate.guard";
import {StartupComponent} from "./login/components/startup/startup.component";
import {AlreadyConfiguredCanActivateGuard} from "./_guards/already-configured.can-activate.guard";
import {LoggedInCanActivateGuard} from "./_guards/logged-in.can-activate.guard";
import {InfoComponent} from "./info/info.component";
import {NotificationsComponent} from "./notifications/notifications.component";
import {ProfileComponent} from "./profile/profile.component";
import {ApidocsComponent} from "./apidocs/apidocs.component";

import { EditorComponent } from './editor/editor.component';
import { PipelinesComponent } from './pipelines/pipelines.component';
import { ConnectComponent } from './connect/connect.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataExplorerComponent } from './data-explorer/data-explorer.component';
import { AppOverviewComponent } from './app-overview/app-overview.component';
import { AddComponent } from './add/add.component';
import { FilesComponent } from './files/files.component';
import { ConfigurationComponent } from './configuration/configuration.component';

const routes: Routes = [
  { path: 'apidocs', component: ApidocsComponent, canActivate: [ConfiguredCanActivateGuard]},
  { path: 'login', component: LoginComponent, canActivate: [ConfiguredCanActivateGuard, LoggedInCanActivateGuard],
  data: {animation: 'LoginPage'}},
  { path: 'setup', component: SetupComponent, canActivate: [AlreadyConfiguredCanActivateGuard] },
  { path: 'startup', component: StartupComponent },
  { path: 'standalone/:dashboardId', component: StandaloneDashboardComponent },
  { path: '', component: StreampipesComponent, children: [
      { path: '', component: HomeComponent, canActivate: [ConfiguredCanActivateGuard] },
      { path: 'editor', component: EditorComponent },
      { path: 'pipelines', component: PipelinesComponent },
      { path: 'connect', component: ConnectComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'dataexplorer', component: DataExplorerComponent },
      { path: 'app-overview', component: AppOverviewComponent },
      { path: 'add', component: AddComponent },
      { path: 'files', component: FilesComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'info', component: InfoComponent },
      { path: 'pipeline-details', component: PipelineDetailsComponent },
      { path: 'profile', component: ProfileComponent},
    ], canActivateChild: [AuthCanActivateChildrenGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: [
      AuthCanActivateChildrenGuard,
      AlreadyConfiguredCanActivateGuard,
      ConfiguredCanActivateGuard,
      LoggedInCanActivateGuard
  ]
})
export class AppRoutingModule { }
