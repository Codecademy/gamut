import { LanguageCreatorImporter, LanguageRegistration } from './types';
export declare class LanguageServices<Framework> {
    private readonly creators;
    private readonly services;
    constructor(creators: Map<string, LanguageCreatorImporter<Framework>>);
    use(languageId: string, framework: Framework): Promise<LanguageRegistration>;
}
