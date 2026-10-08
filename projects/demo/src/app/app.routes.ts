import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ComponentsPageComponent } from './pages/components/components.component';
import { ButtonDemoComponent } from './pages/components/button-demo.component';
import { IconDemoComponent } from './pages/components/icon-demo.component';
import { TableDemoComponent } from './pages/components/table-demo.component';
import { CardDemoComponent } from './pages/components/card-demo.component';
import { AlertDemoComponent } from './pages/components/alert-demo.component';
import { AccordionDemoComponent } from './pages/components/accordion-demo.component';
import { DropdownDemoComponent } from './pages/components/dropdown-demo.component';
import { ToastDemoComponent } from './pages/components/toast-demo.component';
import { InputDemoComponent } from './pages/components/input-demo.component';
import { DialogDemoComponent } from './pages/components/dialog-demo.component';
import { TooltipDemoComponent } from './pages/components/tooltip-demo.component';
import { CheckboxDemoComponent } from './pages/components/checkbox-demo.component';
import { PanelDemoComponent } from './pages/components/panel-demo.component';
import { StepperDemoComponent } from './pages/components/stepper-demo.component';
import { SidebarDemoComponent } from './pages/components/sidebar-demo.component';
import { BadgeDemoComponent } from './pages/components/badge-demo.component';
import { BreadcrumbDemoComponent } from './pages/components/breadcrumb-demo.component';
import { ToolbarDemoComponent } from './pages/components/toolbar-demo.component';
import { TabsDemoComponent } from './pages/components/tabs-demo.component';
import { PlaceholderDemoComponent } from './pages/components/placeholder-demo.component';
import { PaginatorDemoComponent } from './pages/components/paginator-demo.component';
import { MenubarDemoComponent } from './pages/components/menubar-demo.component';
import { DividerDemoComponent } from './pages/components/divider-demo.component';
import { FieldsetDemoComponent } from './pages/components/fieldset-demo.component';
import { PasswordDemoComponent } from './pages/components/password-demo.component';
import { DateDemoComponent } from './pages/components/date-demo.component';
import { OtpDemoComponent } from './pages/components/otp-demo.component';
import { RadioDemoComponent } from './pages/components/radio-demo.component';
import { RatingDemoComponent } from './pages/components/rating-demo.component';
import { TextareaDemoComponent } from './pages/components/textarea-demo.component';
import { SliderDemoComponent } from './pages/components/slider-demo.component';
import { KnobDemoComponent } from './pages/components/knob-demo.component';
import { InputSwitchDemoComponent } from './pages/components/input-switch-demo.component';
import { DatePickerDemoComponent } from './pages/components/datepicker-demo.component';
import { SkeletonDemoComponent } from './pages/components/skeleton-demo.component';
import { ConfirmDemoComponent } from './pages/components/confirm-demo.component';
import { MultiSelectDemoComponent } from './pages/components/multi-select-demo.component';
import { AutoCompleteDemoComponent } from './pages/components/autocomplete-demo.component';
import { InputMaskDemoComponent } from './pages/components/input-mask-demo.component';
import { FileUploadDemoComponent } from './pages/components/file-upload-demo.component';
import { OverlaysDemoComponent } from './pages/components/overlays-demo.component';
import { FeedbackDemoComponent } from './pages/components/feedback-demo.component';
import { AdvancedDemoComponent } from './pages/components/advanced-demo.component';
import { ChipsDemoComponent } from './pages/components/chips-demo.component';
import { SelectButtonDemoComponent } from './pages/components/select-button-demo.component';
import { ImageDemoComponent } from './pages/components/image-demo.component';
import { CarouselDemoComponent } from './pages/components/carousel-demo.component';
import { GalleriaDemoComponent } from './pages/components/galleria-demo.component';
import { SpeedDialDemoComponent } from './pages/components/speed-dial-demo.component';
import { TreeTableDemoComponent } from './pages/components/tree-table-demo.component';
import { TreeDemoComponent } from './pages/components/tree-demo.component';
import { PanelMenuDemoComponent } from './pages/components/panel-menu-demo.component';
import { UtilitiesPageComponent } from './pages/utilities/utilities.component';
import { OverviewUtilityDemoComponent } from './pages/utilities/overview-utility-demo.component';
import { GridUtilityDemoComponent } from './pages/utilities/grid-utility-demo.component';
import { FlexUtilityDemoComponent } from './pages/utilities/flex-utility-demo.component';
import { SpacingUtilityDemoComponent } from './pages/utilities/spacing-utility-demo.component';
import { TypographyUtilityDemoComponent } from './pages/utilities/typography-utility-demo.component';
import { ColorsUtilityDemoComponent } from './pages/utilities/colors-utility-demo.component';
import { BordersUtilityDemoComponent } from './pages/utilities/borders-utility-demo.component';
import { SizingUtilityDemoComponent } from './pages/utilities/sizing-utility-demo.component';
import { PositionUtilityDemoComponent } from './pages/utilities/position-utility-demo.component';
import { DisplayUtilityDemoComponent } from './pages/utilities/display-utility-demo.component';
import { ExtrasUtilityDemoComponent } from './pages/utilities/extras-utility-demo.component';
import { TokensUtilityDemoComponent } from './pages/utilities/tokens-utility-demo.component';
import { MotionUtilityDemoComponent } from './pages/utilities/motion-utility-demo.component';
import { FiltersUtilityDemoComponent } from './pages/utilities/filters-utility-demo.component';
import { InteractivityUtilityDemoComponent } from './pages/utilities/interactivity-utility-demo.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'utilities',
    component: UtilitiesPageComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewUtilityDemoComponent },
      { path: 'grid', component: GridUtilityDemoComponent },
      { path: 'flex', component: FlexUtilityDemoComponent },
      { path: 'spacing', component: SpacingUtilityDemoComponent },
      { path: 'typography', component: TypographyUtilityDemoComponent },
      { path: 'colors', component: ColorsUtilityDemoComponent },
      { path: 'borders', component: BordersUtilityDemoComponent },
      { path: 'motion', component: MotionUtilityDemoComponent },
      { path: 'filters', component: FiltersUtilityDemoComponent },
      { path: 'interactivity', component: InteractivityUtilityDemoComponent },
      { path: 'sizing', component: SizingUtilityDemoComponent },
      { path: 'position', component: PositionUtilityDemoComponent },
      { path: 'display', component: DisplayUtilityDemoComponent },
      { path: 'extras', component: ExtrasUtilityDemoComponent },
      { path: 'tokens', component: TokensUtilityDemoComponent }
    ]
  },
  { 
    path: 'components', 
    component: ComponentsPageComponent,
    children: [
      { path: '', redirectTo: 'button', pathMatch: 'full' },
      { path: 'utilities', redirectTo: '/utilities', pathMatch: 'full' },
      { path: 'button', component: ButtonDemoComponent },
      { path: 'icon', component: IconDemoComponent },
      { path: 'badge', component: BadgeDemoComponent },
      { path: 'divider', component: DividerDemoComponent },
      { path: 'card', component: CardDemoComponent },
      { path: 'panel', component: PanelDemoComponent },
      { path: 'fieldset', component: FieldsetDemoComponent },
      { path: 'accordion', component: AccordionDemoComponent },
      { path: 'tabs', component: TabsDemoComponent },
      { path: 'toolbar', component: ToolbarDemoComponent },
      { path: 'input', component: InputDemoComponent },
      { path: 'password', component: PasswordDemoComponent },
      { path: 'textarea', component: TextareaDemoComponent },
      { path: 'date', component: DateDemoComponent },
      { path: 'datepicker', component: DatePickerDemoComponent },
      { path: 'otp', component: OtpDemoComponent },
      { path: 'radio', component: RadioDemoComponent },
      { path: 'rating', component: RatingDemoComponent },
      { path: 'slider', component: SliderDemoComponent },
      { path: 'knob', component: KnobDemoComponent },
      { path: 'dropdown', component: DropdownDemoComponent },
      { path: 'checkbox', component: CheckboxDemoComponent },
      { path: 'switch', component: InputSwitchDemoComponent },
      { path: 'chips', component: ChipsDemoComponent },
      { path: 'select-button', component: SelectButtonDemoComponent },
      { path: 'table', component: TableDemoComponent },
      { path: 'tree', component: TreeDemoComponent },
      { path: 'tree-table', component: TreeTableDemoComponent },
      { path: 'paginator', component: PaginatorDemoComponent },
      { path: 'alert', component: AlertDemoComponent },
      { path: 'toast', component: ToastDemoComponent },
      { path: 'dialog', component: DialogDemoComponent },
      { path: 'popover', component: OverlaysDemoComponent },
      { path: 'tooltip', component: TooltipDemoComponent },
      { path: 'skeleton', component: SkeletonDemoComponent },
      { path: 'feedback', component: FeedbackDemoComponent },
      { path: 'advanced', component: AdvancedDemoComponent },
      { path: 'confirm', component: ConfirmDemoComponent },
      { path: 'multi-select', component: MultiSelectDemoComponent },
      { path: 'autocomplete', component: AutoCompleteDemoComponent },
      { path: 'input-mask', component: InputMaskDemoComponent },
      { path: 'file-upload', component: FileUploadDemoComponent },
      { path: 'image', component: ImageDemoComponent },
      { path: 'carousel', component: CarouselDemoComponent },
      { path: 'galleria', component: GalleriaDemoComponent },
      { path: 'speed-dial', component: SpeedDialDemoComponent },
      { path: 'menubar', component: MenubarDemoComponent },
      { path: 'panel-menu', component: PanelMenuDemoComponent },
      { path: 'breadcrumb', component: BreadcrumbDemoComponent },
      { path: 'stepper', component: StepperDemoComponent },
      { path: 'sidebar', component: SidebarDemoComponent }
    ]
  }
];
