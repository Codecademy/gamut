import { LanguageServices } from '../LanguageService';

const createStubLanguageServices = () => {
  const languageIdA = 'stubA';
  const languageIdB = 'stubA';

  const serviceA = { languageId: languageIdA };
  const serviceB = { languageId: languageIdB };

  const creatorA = jest.fn().mockReturnValueOnce(serviceA);
  const creatorB = jest.fn().mockReturnValueOnce(serviceB);

  const services = new LanguageServices(
    new Map([
      [languageIdA, async () => ({ default: creatorA })],
      [languageIdB, async () => ({ default: creatorB })],
    ])
  );

  return {
    creatorA,
    creatorB,
    languageIdA,
    languageIdB,
    serviceA,
    serviceB,
    services,
  };
};

describe('LanguageServices', () => {
  it('returns a blank service when an unknown language is requested', async () => {
    const { services } = createStubLanguageServices();

    const usedService = await services.use('unknown', {});

    expect(usedService).toEqual({});
  });

  it('creates a new service when a language is first requested', async () => {
    const { serviceA, languageIdA, services } = createStubLanguageServices();

    const usedService = await services.use(languageIdA, {});

    expect(serviceA).toEqual(usedService);
  });

  it('switches to a new service when a new language is requested', async () => {
    const {
      serviceB,
      languageIdA,
      languageIdB,
      services,
    } = createStubLanguageServices();

    await services.use(languageIdA, {});

    const usedService = await services.use(languageIdB, {});

    expect(usedService).toEqual(serviceB);
  });

  it('re-uses an existing service when a language is switched back', async () => {
    const {
      serviceA,
      languageIdA,
      languageIdB,
      services,
    } = createStubLanguageServices();

    await services.use(languageIdA, {});
    await services.use(languageIdB, {});

    const usedService = await services.use(languageIdA, {});

    expect(usedService).toEqual(serviceA);
  });
});
