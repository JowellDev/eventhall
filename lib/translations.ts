export type Locale = 'fr' | 'en'

const fr = {
  // Common
  logout: 'Déconnexion',
  home: 'Accueil',
  mySpace: 'Mon espace',
  login: 'Connexion',
  cancel: 'Annuler',
  save: 'Enregistrer',
  delete: 'Supprimer',
  edit: 'Modifier',
  view: 'Voir',
  confirm: 'Confirmer',
  refuse: 'Refuser',
  add: 'Ajouter',
  search: 'Rechercher',
  close: 'Fermer',
  back: 'Retour',
  continue: 'Continuer',
  saving: 'Enregistrement...',
  creating: 'Création...',

  // Client header
  myReservations: 'Mes réservations',
  calendar: 'Calendrier',
  favorites: 'Favoris',
  notifications: 'Notifications',

  // Hero
  heroTitle: 'Trouvez votre salle',
  heroHighlight: "d'exception",
  heroSubtitle:
    "Des espaces prestige pour vos événements les plus mémorables à Abidjan",

  // Hall grid
  hallsAvailable: (n: number) =>
    `${n} salle${n > 1 ? 's' : ''} disponible${n > 1 ? 's' : ''}`,

  // Hall card
  removeFromFavorites: 'Retirer des favoris',
  addToFavorites: 'Ajouter aux favoris',
  book: 'Réserver',
  perHour: '/heure',

  // Hall search
  searchPlaceholder: 'Rechercher une salle, un quartier...',
  searchAriaLabel: 'Rechercher une salle',
  clearSearch: 'Effacer la recherche',
  filter: 'Filtrer',
  minCapacity: 'Capacité minimale',
  all: 'Tout',
  maxBudget: 'Budget max / heure',
  includedServices: 'Services inclus',
  sortBy: 'Trier par',
  sortRelevance: 'Pertinence',
  sortTopRated: 'Mieux notés',
  sortPriceAsc: 'Prix ↑',
  sortPriceDesc: 'Prix ↓',
  sortCapacityDesc: 'Capacité ↓',
  reset: 'Réinitialiser',

  // Hall detail modal
  capacity: 'Capacité',
  hours: 'Horaires',
  pricePerHour: 'Tarif/h',
  persons: 'pers.',
  servicesIncluded: 'Services inclus',
  inFavorites: 'Dans les favoris',
  bookNow: 'Réserver maintenant',

  // Owner space
  ownerSpace: 'Espace Propriétaire',
  ownerTabOverview: "Vue d'ensemble",
  ownerTabHalls: 'Mes Salles',
  ownerTabBookings: 'Réservations',
  ownerTabStats: 'Statistiques',
  kpiActiveHalls: 'Salles actives',
  kpiMonthlyBookings: 'Réservations ce mois',
  kpiTotalRevenue: 'Revenu total',
  kpiOccupancyRate: "Taux d'occupation",

  // Owner overview
  revenueTitle: 'Revenus — 7 derniers jours',
  recentActivity: 'Activité récente',
  topHalls: 'Top Salles',

  // Owner halls tab
  myHalls: 'Mes Salles',
  addHall: '+ Ajouter une salle',
  noHalls: "Aucune salle pour l'instant. Ajoutez votre première salle !",
  deleteHallLabel: (name: string) => `Supprimer ${name}`,

  // Owner bookings tab
  bookings: 'Réservations',
  optionsLabel: 'Options :',
  accept: 'Accepter',
  confirmBookingTitle: 'Confirmer la réservation ?',
  refuseBookingTitle: 'Refuser la réservation ?',
  confirmBookingMsg: (client: string, hall: string, date: string) =>
    `Vous êtes sur le point de confirmer la réservation de ${client} pour ${hall} le ${date}.`,
  refuseBookingMsg: (client: string, hall: string, date: string) =>
    `Vous êtes sur le point de refuser la réservation de ${client} pour ${hall} le ${date}. Le client en sera notifié.`,

  // Owner stats tab
  statistics: 'Statistiques',
  weeklyRevenueTitle: 'Revenus hebdomadaires',
  occupancyRate: "Taux d'occupation",
  avgRating: 'Note moyenne',

  // Owner hall detail modal
  features: 'Caractéristiques',
  editHall: 'Modifier cette salle',

  // Add/edit hall modal
  editHallTitle: 'Modifier la salle',
  addHallTitle: 'Ajouter une salle',
  hallImage: 'Image de la salle',
  clickToChange: 'Cliquez pour changer la photo',
  clickToAdd: 'Cliquez pour ajouter une photo',
  imageHint: 'PNG, JPG jusqu'à 5 Mo',
  hallName: 'Nom de la salle *',
  hallNamePlaceholder: 'Ex: Le Grand Palais',
  locationLabel: 'Localisation *',
  locationPlaceholder: 'Ex: Cocody, Abidjan',
  capacityField: 'Capacité (personnes) *',
  capacityPlaceholder: 'Ex: 200',
  priceField: 'Prix/heure (FCFA) *',
  pricePlaceholder: 'Ex: 100000',
  hoursField: "Horaires d'ouverture *",
  hoursPlaceholder: 'Ex: 08h - 04h',
  featuresField: 'Caractéristiques (appuyez sur Entrée pour ajouter)',
  featuresPlaceholder: 'Ex: DJ inclus, Parking, Climatisation...',
  servicesField: 'Services proposés (appuyez sur Entrée pour ajouter)',
  servicesPlaceholder: 'Ex: Sonorisation professionnelle...',
  fillRequired: 'Veuillez remplir tous les champs obligatoires.',
  saveChanges: 'Enregistrer les modifications',

  // Admin space
  superAdmin: 'Super Admin',
  adminTabOverview: "Vue d'ensemble",
  adminTabOwners: 'Propriétaires',
  adminTabHalls: 'Salles',
  adminTabAnalytics: 'Analytiques',
  kpiActiveOwners: 'Propriétaires actifs',
  kpiTotalHalls: 'Salles totales',
  kpiBookings30d: 'Réservations 30j',
  kpiPlatformRevenue: 'Revenu plateforme',

  // Admin overview
  recentOwners: 'Propriétaires récents',
  topPerformingHalls: 'Salles performantes',
  approvalRate: "Taux d'approbation",
  avgResponseTime: 'Temps de réponse moyen',
  customerSatisfaction: 'Satisfaction client',
  openDisputes: 'Litiges ouverts',
  hallSingular: 'salle',
  hallPlural: 'salles',

  // Admin owners tab
  allOwners: 'Tous les propriétaires',
  addOwner: '+ Ajouter',
  revenue: 'Revenus',

  // Admin halls tab
  allHalls: 'Toutes les salles',
  viewDetailsLabel: (name: string) => `Voir les détails de ${name}`,

  // Admin analytics tab
  globalAnalytics: 'Analytiques globales',
  monthlyBookings: 'Réservations mensuelles — 2025',
  zoneDistribution: 'Répartition par zone',
  eventTypes: "Types d'événements",

  // Owner modal (admin)
  newOwner: 'Nouveau propriétaire',
  editOwnerTitle: 'Modifier le propriétaire',
  ownerProfile: 'Profil du propriétaire',
  fullName: 'Nom complet',
  fullNameField: 'Nom complet *',
  fullNamePlaceholder: 'Ex: Kouamé Jean-Paul',
  emailField: 'Adresse email *',
  emailPlaceholder: 'Ex: jp.kouame@mail.ci',
  phoneField: 'Téléphone *',
  phonePlaceholder: 'Ex: +225 07 01 23 45 67',
  statusField: 'Statut',
  statusActive: 'Actif',
  statusPending: 'En attente',
  statusSuspended: 'Suspendu',
  fillRequiredFields: 'Veuillez remplir tous les champs obligatoires.',
  invalidEmail: 'Adresse email invalide.',
  create: 'Créer',
  memberSince: (date: string) => `Membre depuis ${date}`,
  totalRevenue: 'Revenus totaux',

  // Status badge
  statusConfirmed: 'Confirmée',
  statusRefused: 'Refusée',
  statusPendingLabel: 'En attente',
  statusCancelled: 'Annulée',
  statusActiveLabel: 'Actif',
  statusSuspendedLabel: 'Suspendu',

  // Pagination
  showing: (from: number, to: number, total: number) =>
    `${from}–${to} sur ${total} résultat${total > 1 ? 's' : ''}`,
  display: 'Afficher',
  perPage: 'par page',
  prevPage: 'Page précédente',
  nextPage: 'Page suivante',
  itemsPerPage: 'Éléments par page',

  // Confirm dialog
  cancelAction: 'Annuler',

  // Login / Auth
  loginWelcome: 'Connectez-vous à votre espace',
  emailAddress: 'Adresse email',
  emailPlaceholderLogin: 'votre@email.com',
  password: 'Mot de passe',
  forgotPassword: 'Mot de passe oublié ?',
  signIn: 'Se connecter',
  signingIn: 'Connexion...',
  noAccount: 'Pas encore de compte ?',
  createAccount: 'Créer un compte',
  demoAccounts: 'Comptes de démonstration',
  roleClient: 'Client',
  roleOwner: 'Propriétaire',
  roleAdmin: 'Administrateur',
  invalidCredentials: 'Email ou mot de passe incorrect.',
  passwordTooShort: 'Le mot de passe doit contenir au moins 8 caractères.',
  passwordMismatch: 'Les mots de passe ne correspondent pas.',
  emailExists: 'Un compte existe déjà avec cet email.',
  backToLogin: 'Retour à la connexion',
  createAccountTitle: 'Créez votre compte EventHalls',
  fullNameLogin: 'Nom complet',
  fullNamePlaceholderLogin: 'Jean Dupont',
  accountType: 'Type de compte',
  createMyAccount: 'Créer mon compte',
  noAccountFound: 'Aucun compte trouvé avec cet email.',
  forgotPasswordTitle: 'Mot de passe oublié',
  forgotPasswordSubtitle:
    'Entrez votre email pour recevoir un code de vérification',
  sendCode: 'Envoyer le code',
  sending: 'Envoi en cours...',
  verificationTitle: 'Vérification',
  codeSentTo: 'Un code a été envoyé à',
  demoCode: 'Code de démonstration : 123456',
  sixDigitCode: 'Code à 6 chiffres',
  verifyCode: 'Vérifier le code',
  verifying: 'Vérification...',
  resendCode: 'Renvoyer le code',
  newPasswordTitle: 'Nouveau mot de passe',
  newPasswordSubtitle: 'Choisissez un nouveau mot de passe sécurisé',
  resetPassword: 'Réinitialiser',
  resetting: 'Enregistrement...',
  passwordResetTitle: 'Mot de passe réinitialisé !',
  passwordResetMessage:
    'Votre mot de passe a été mis à jour avec succès. Vous pouvez maintenant vous connecter.',
  minChars: 'Min. 8 caractères',

  // Booking
  bookingStepDate: 'Date & Heure',
  bookingStepOptions: 'Options',
  bookingStepReview: 'Récapitulatif',
  bookingStepConfirmed: 'Réservation confirmée',
  bookTitle: (name: string) => `Réserver — ${name}`,
  prevStep: 'Étape précédente',
  eventDate: "Date de l'événement",
  startTime: 'Heure de début',
  endTime: 'Heure de fin',
  selectOptionsSubtitle:
    "Sélectionnez les options supplémentaires pour votre événement",
  date: 'Date',
  schedule: 'Horaire',
  estimatedTotal: 'Total estimé',
  confirmBooking: 'Confirmer la réservation',
  requestSent: 'Demande envoyée !',
  bookingConfirmationMsg: (name: string) =>
    `Votre demande de réservation pour ${name} a été envoyée. Le propriétaire vous contactera sous 24h.`,
  backToHalls: 'Retour aux salles',
}

const en: typeof fr = {
  // Common
  logout: 'Logout',
  home: 'Home',
  mySpace: 'My space',
  login: 'Login',
  cancel: 'Cancel',
  save: 'Save',
  delete: 'Delete',
  edit: 'Edit',
  view: 'View',
  confirm: 'Confirm',
  refuse: 'Refuse',
  add: 'Add',
  search: 'Search',
  close: 'Close',
  back: 'Back',
  continue: 'Continue',
  saving: 'Saving...',
  creating: 'Creating...',

  // Client header
  myReservations: 'My reservations',
  calendar: 'Calendar',
  favorites: 'Favorites',
  notifications: 'Notifications',

  // Hero
  heroTitle: 'Find your',
  heroHighlight: 'exceptional venue',
  heroSubtitle:
    "Prestigious spaces for your most memorable events in Abidjan",

  // Hall grid
  hallsAvailable: (n: number) => `${n} hall${n > 1 ? 's' : ''} available`,

  // Hall card
  removeFromFavorites: 'Remove from favorites',
  addToFavorites: 'Add to favorites',
  book: 'Book',
  perHour: '/hour',

  // Hall search
  searchPlaceholder: 'Search for a hall, neighborhood...',
  searchAriaLabel: 'Search for a hall',
  clearSearch: 'Clear search',
  filter: 'Filter',
  minCapacity: 'Minimum capacity',
  all: 'All',
  maxBudget: 'Max budget / hour',
  includedServices: 'Included services',
  sortBy: 'Sort by',
  sortRelevance: 'Relevance',
  sortTopRated: 'Top rated',
  sortPriceAsc: 'Price ↑',
  sortPriceDesc: 'Price ↓',
  sortCapacityDesc: 'Capacity ↓',
  reset: 'Reset',

  // Hall detail modal
  capacity: 'Capacity',
  hours: 'Hours',
  pricePerHour: 'Price/h',
  persons: 'pers.',
  servicesIncluded: 'Included services',
  inFavorites: 'In favorites',
  bookNow: 'Book now',

  // Owner space
  ownerSpace: 'Owner Space',
  ownerTabOverview: 'Overview',
  ownerTabHalls: 'My Halls',
  ownerTabBookings: 'Bookings',
  ownerTabStats: 'Statistics',
  kpiActiveHalls: 'Active halls',
  kpiMonthlyBookings: 'Bookings this month',
  kpiTotalRevenue: 'Total revenue',
  kpiOccupancyRate: 'Occupancy rate',

  // Owner overview
  revenueTitle: 'Revenue — last 7 days',
  recentActivity: 'Recent activity',
  topHalls: 'Top Halls',

  // Owner halls tab
  myHalls: 'My Halls',
  addHall: '+ Add a hall',
  noHalls: 'No halls yet. Add your first hall!',
  deleteHallLabel: (name: string) => `Delete ${name}`,

  // Owner bookings tab
  bookings: 'Bookings',
  optionsLabel: 'Options:',
  accept: 'Accept',
  confirmBookingTitle: 'Confirm booking?',
  refuseBookingTitle: 'Refuse booking?',
  confirmBookingMsg: (client: string, hall: string, date: string) =>
    `You are about to confirm the booking by ${client} for ${hall} on ${date}.`,
  refuseBookingMsg: (client: string, hall: string, date: string) =>
    `You are about to refuse the booking by ${client} for ${hall} on ${date}. The client will be notified.`,

  // Owner stats tab
  statistics: 'Statistics',
  weeklyRevenueTitle: 'Weekly revenue',
  occupancyRate: 'Occupancy rate',
  avgRating: 'Average rating',

  // Owner hall detail modal
  features: 'Features',
  editHall: 'Edit this hall',

  // Add/edit hall modal
  editHallTitle: 'Edit hall',
  addHallTitle: 'Add a hall',
  hallImage: 'Hall image',
  clickToChange: 'Click to change the photo',
  clickToAdd: 'Click to add a photo',
  imageHint: 'PNG, JPG up to 5 MB',
  hallName: 'Hall name *',
  hallNamePlaceholder: 'Ex: The Grand Palace',
  locationLabel: 'Location *',
  locationPlaceholder: 'Ex: Cocody, Abidjan',
  capacityField: 'Capacity (persons) *',
  capacityPlaceholder: 'Ex: 200',
  priceField: 'Price/hour (FCFA) *',
  pricePlaceholder: 'Ex: 100000',
  hoursField: 'Opening hours *',
  hoursPlaceholder: 'Ex: 08h - 04h',
  featuresField: 'Features (press Enter to add)',
  featuresPlaceholder: 'Ex: DJ included, Parking, Air conditioning...',
  servicesField: 'Services offered (press Enter to add)',
  servicesPlaceholder: 'Ex: Professional sound system...',
  fillRequired: 'Please fill in all required fields.',
  saveChanges: 'Save changes',

  // Admin space
  superAdmin: 'Super Admin',
  adminTabOverview: 'Overview',
  adminTabOwners: 'Owners',
  adminTabHalls: 'Halls',
  adminTabAnalytics: 'Analytics',
  kpiActiveOwners: 'Active owners',
  kpiTotalHalls: 'Total halls',
  kpiBookings30d: 'Bookings 30d',
  kpiPlatformRevenue: 'Platform revenue',

  // Admin overview
  recentOwners: 'Recent owners',
  topPerformingHalls: 'Top performing halls',
  approvalRate: 'Approval rate',
  avgResponseTime: 'Avg. response time',
  customerSatisfaction: 'Customer satisfaction',
  openDisputes: 'Open disputes',
  hallSingular: 'hall',
  hallPlural: 'halls',

  // Admin owners tab
  allOwners: 'All owners',
  addOwner: '+ Add',
  revenue: 'Revenue',

  // Admin halls tab
  allHalls: 'All halls',
  viewDetailsLabel: (name: string) => `View details of ${name}`,

  // Admin analytics tab
  globalAnalytics: 'Global analytics',
  monthlyBookings: 'Monthly bookings — 2025',
  zoneDistribution: 'Zone distribution',
  eventTypes: 'Event types',

  // Owner modal (admin)
  newOwner: 'New owner',
  editOwnerTitle: 'Edit owner',
  ownerProfile: "Owner profile",
  fullName: 'Full name',
  fullNameField: 'Full name *',
  fullNamePlaceholder: 'Ex: John Smith',
  emailField: 'Email address *',
  emailPlaceholder: 'Ex: john.smith@mail.com',
  phoneField: 'Phone *',
  phonePlaceholder: 'Ex: +225 07 01 23 45 67',
  statusField: 'Status',
  statusActive: 'Active',
  statusPending: 'Pending',
  statusSuspended: 'Suspended',
  fillRequiredFields: 'Please fill in all required fields.',
  invalidEmail: 'Invalid email address.',
  create: 'Create',
  memberSince: (date: string) => `Member since ${date}`,
  totalRevenue: 'Total revenue',

  // Status badge
  statusConfirmed: 'Confirmed',
  statusRefused: 'Refused',
  statusPendingLabel: 'Pending',
  statusCancelled: 'Cancelled',
  statusActiveLabel: 'Active',
  statusSuspendedLabel: 'Suspended',

  // Pagination
  showing: (from: number, to: number, total: number) =>
    `${from}–${to} of ${total} result${total > 1 ? 's' : ''}`,
  display: 'Show',
  perPage: 'per page',
  prevPage: 'Previous page',
  nextPage: 'Next page',
  itemsPerPage: 'Items per page',

  // Confirm dialog
  cancelAction: 'Cancel',

  // Login / Auth
  loginWelcome: 'Sign in to your space',
  emailAddress: 'Email address',
  emailPlaceholderLogin: 'your@email.com',
  password: 'Password',
  forgotPassword: 'Forgot password?',
  signIn: 'Sign in',
  signingIn: 'Signing in...',
  noAccount: "Don't have an account?",
  createAccount: 'Create account',
  demoAccounts: 'Demo accounts',
  roleClient: 'Client',
  roleOwner: 'Owner',
  roleAdmin: 'Administrator',
  invalidCredentials: 'Incorrect email or password.',
  passwordTooShort: 'Password must be at least 8 characters.',
  passwordMismatch: 'Passwords do not match.',
  emailExists: 'An account already exists with this email.',
  backToLogin: 'Back to login',
  createAccountTitle: 'Create your EventHalls account',
  fullNameLogin: 'Full name',
  fullNamePlaceholderLogin: 'John Smith',
  accountType: 'Account type',
  createMyAccount: 'Create my account',
  noAccountFound: 'No account found with this email.',
  forgotPasswordTitle: 'Forgot password',
  forgotPasswordSubtitle: 'Enter your email to receive a verification code',
  sendCode: 'Send code',
  sending: 'Sending...',
  verificationTitle: 'Verification',
  codeSentTo: 'A code has been sent to',
  demoCode: 'Demo code: 123456',
  sixDigitCode: '6-digit code',
  verifyCode: 'Verify code',
  verifying: 'Verifying...',
  resendCode: 'Resend code',
  newPasswordTitle: 'New password',
  newPasswordSubtitle: 'Choose a new secure password',
  resetPassword: 'Reset',
  resetting: 'Saving...',
  passwordResetTitle: 'Password reset!',
  passwordResetMessage:
    'Your password has been updated successfully. You can now sign in.',
  minChars: 'Min. 8 characters',

  // Booking
  bookingStepDate: 'Date & Time',
  bookingStepOptions: 'Options',
  bookingStepReview: 'Review',
  bookingStepConfirmed: 'Booking confirmed',
  bookTitle: (name: string) => `Book — ${name}`,
  prevStep: 'Previous step',
  eventDate: 'Event date',
  startTime: 'Start time',
  endTime: 'End time',
  selectOptionsSubtitle: 'Select additional options for your event',
  date: 'Date',
  schedule: 'Schedule',
  estimatedTotal: 'Estimated total',
  confirmBooking: 'Confirm booking',
  requestSent: 'Request sent!',
  bookingConfirmationMsg: (name: string) =>
    `Your booking request for ${name} has been sent. The owner will contact you within 24h.`,
  backToHalls: 'Back to halls',
}

export const translations = { fr, en }
export type T = typeof fr
