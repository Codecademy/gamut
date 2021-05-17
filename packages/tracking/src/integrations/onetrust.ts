import { TrackingWindow } from './types';

export type OneTrustSettings = {
  production: boolean;
  scope: TrackingWindow;
};

export const initializeOneTrust = async ({
  production,
  scope,
}: OneTrustSettings) => {
  const script = document.createElement('script');
  script.setAttribute('async', 'true');
  script.setAttribute(
    'src',
    'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js'
  );
  script.setAttribute('type', 'text/javascript');
  script.setAttribute(
    'data-domain-script',
    `cfa7b129-f37b-4f5a-9991-3f75ba7b85fb${production ? '' : '-test'}`
  );

  document.body.appendChild(script);

  const style = document.createElement('style');
  style.textContent = rawStyles;
  document.body.appendChild(style);

  return new Promise<void>((resolve) => {
    scope.OptanonWrapper = () => {
      scope.dataLayer ??= [];
      scope.dataLayer.push({ event: 'OneTrustGroupsUpdated' });
      resolve();
      script.parentNode?.removeChild(script);
    };
  });
};

// For now, these three values duplicate theme colors from gamut-styles
// We don't want to take a full dependency on that package here...
const rawStyles = `
:root {
  --onetrust-brand-purple: #3A10E5;
  --onetrust-color-gray-500: #828285;
  --onetrust-color-white: #fff;
}

#onetrust-banner-sdk {
  padding: 1rem !important;
}
#onetrust-banner-sdk > .ot-sdk-container {
  width: 100% !important;
}
#onetrust-banner-sdk > .ot-sdk-container > .ot-sdk-row {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  max-width: 1436px !important;
  margin: 0 auto !important;
}
#onetrust-banner-sdk > .ot-sdk-container > .ot-sdk-row:after {
  content: none !important;
}
#onetrust-group-container {
  display: flex !important;
  justify-content: center;
  float: none !important;
  width: 100% !important;
  max-width: 1148px !important;
  margin-left: 0 !important;
  margin-bottom: 0.625rem !important;
}
#onetrust-policy,
#onetrust-policy-text {
  margin: 0 !important;
  font-size: 0.875rem !important;
  line-height: 1.375rem !important;
  text-align: center !important;
  float: none !important;
}
#onetrust-policy-text a {
  text-decoration: none;
  line-height: 26px !important;
  margin-left: 0 !important;
}
#onetrust-button-group-parent {
  position: relative !important;
  top: initial !important;
  left: initial !important;
  transform: initial !important;
  width: 264px !important;
  margin: 0 !important;
  padding: 0 !important;
  float: none !important;
}
#onetrust-button-group {
  display: flex !important;
  margin: 0 !important;
}
#onetrust-pc-btn-handler, #onetrust-accept-btn-handler {
  min-width: initial !important;
  padding: 0.375rem 1rem !important;
  margin: 0 !important;
  opacity: 1 !important;
  border-radius: 2px !important;
  line-height: 1.5 !important;
  user-select: none !important;
  font-size: 1rem !important;
}
#onetrust-pc-btn-handler:focus, #onetrust-accept-btn-handler:focus {
  box-shadow: 0 0 0 2px var(--onetrust-color-white), 0 0 0 4px var(--onetrust-brand-purple);
  text-decoration: none !important;
  outline: none !important;
}
#onetrust-pc-btn-handler{
  color: var(--onetrust-brand-purple) !important;
  border: 1px solid var(--onetrust-brand-purple)!important;
  background: var(--onetrust-color-white) !important
}
#onetrust-accept-btn-handler {
  color: var(--onetrust-color-white) !important;
  background: var(--onetrust-brand-purple)!important;
  margin-left: 1rem !important;
}
#onetrust-close-btn-container {
  display: none !important;
}

.pc-logo {
  display: none !important;
}

#accept-recommended-btn-handler,
.ot-pc-refuse-all-handler,
.save-preference-btn-handler {
  margin-left: 4px !important;
  font-size: 14px !important;
}

#accept-recommended-btn-handler:focus,
#onetrust-pc-sdk .ot-pc-refuse-all-handler:focus,
#onetrust-pc-sdk .save-preference-btn-handler:focus {
  box-shadow: 0 0 0 2px var(--onetrust-color-white), 0 0 0 4px var(--onetrust-brand-purple);
  text-decoration: none !important;
  outline: none !important;
  opacity: 1 !important;
}

.ot-switch-label {
  border: 1px solid var(--onetrust-color-gray-500) !important;
  background-color: var(--onetrust-color-gray-500) !important;
}

.ot-switch-nob {
  background: var(--onetrust-color-white) !important;
}

.ot-switch-inner:before {
  background-color: var(--onetrust-brand-purple) !important;
}

.switch-checkbox:checked+.ot-switch-label .ot-switch-nob {
  border-color: var(--onetrust-brand-purple) !important;
}

.ot-pc-footer-logo {
  display: none !important;
}

#onetrust-banner-sdk>.ot-sdk-container {
  overflow: visible !important;
}

@media (max-width: 30rem) {
  #accept-recommended-btn-handler,
  .ot-pc-refuse-all-handler,
  .save-preference-btn-handler {
    width: 96% !important;
  }
}

@media (min-width: 37.5rem) {
  #onetrust-banner-sdk {
    padding: 0.875rem 1rem !important;
  }
}
@media (min-width: 48rem) {
  #onetrust-banner-sdk {
    padding: 0.875rem 1.25rem !important;
  }
}
@media (min-width: 1650px) {
  #onetrust-banner-sdk > .ot-sdk-container > .ot-sdk-row {
    flex-direction: row !important;
    justify-content: space-between !important;
  }
  #onetrust-group-container {
    margin-bottom: 0 !important;
  }
  #onetrust-button-group {
    flex-direction: row !important;
  }
}
`;
