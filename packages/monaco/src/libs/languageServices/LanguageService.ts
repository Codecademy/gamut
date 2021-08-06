import { LanguageCreatorImporter, LanguageRegistration } from './types';

export class LanguageServices<Framework> {
  private readonly services = new Map<string, LanguageRegistration>();

  constructor(
    private readonly creators: Map<string, LanguageCreatorImporter<Framework>>
  ) {}

  async use(languageId: string, framework: Framework) {
    const getCreator = this.creators.get(languageId);
    if (!getCreator) {
      return {};
    }

    const existingService = this.services.get(languageId);
    if (existingService) {
      return existingService;
    }

    const creator = await getCreator();
    const service = creator.default(framework);

    this.services.set(languageId, service);

    return service;
  }
}
