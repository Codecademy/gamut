import { DestinationMapOptions, mapDestinations } from '../mapDestinations';

describe('mapDestinations', () => {
  describe('destinationPreferences', () => {
    const testCase = (input: DestinationMapOptions, output: unknown) => {
      const { destinationPreferences } = mapDestinations(input);

      expect(destinationPreferences).toEqual(expect.objectContaining(output));
    };

    it('does not include Segment.io by default', () => {
      testCase({ destinations: [] }, { 'Segment.io': false });
    });

    it('includes Segment.io when consent includes C0003', () => {
      testCase(
        {
          consentDecision: ['C0003'],
          destinations: [],
        },
        { 'Segment.io': true }
      );
    });

    it('does not allow a targeting destination when consent does not include C0004', () => {
      testCase(
        {
          consentDecision: [],
          destinations: [
            {
              category: 'Advertising',
              id: 'abc123',
            },
          ],
        },
        { abc123: false }
      );
    });

    it('allows a targeting destination when consent includes C0004', () => {
      testCase(
        {
          consentDecision: ['C0004'],
          destinations: [
            {
              category: 'Advertising',
              id: 'abc123',
            },
          ],
        },
        { abc123: true }
      );
    });

    it('does not allow a performance destination when consent does not include C0002', () => {
      testCase(
        {
          consentDecision: [],
          destinations: [
            {
              category: 'Analytics',
              id: 'abc123',
            },
          ],
        },
        { abc123: false }
      );
    });

    it('allows a performance destination when consent includes C0002', () => {
      testCase(
        {
          consentDecision: ['C0002'],
          destinations: [
            {
              category: 'Analytics',
              id: 'abc123',
            },
          ],
        },
        { abc123: true }
      );
    });
  });

  describe('identifyPreferences', () => {
    const testCase = (
      input: Partial<DestinationMapOptions>,
      output: unknown
    ) => {
      const { identifyPreferences } = mapDestinations({
        destinations: [],
        ...input,
      });

      expect(identifyPreferences).toEqual(expect.objectContaining(output));
    };

    it('does not include FullStory when there is no user', () => {
      testCase({}, { FullStory: false });
    });

    it('includes FullStory when there is a user', () => {
      testCase(
        { user: { email: 'test@test.com', id: 'bcd234' } },
        { FullStory: true }
      );
    });

    it('does not include Hindsight when consent does not include C0004', () => {
      testCase({}, { Hindsight: false });
    });

    it('includes Hindsight when consent includes C0004', () => {
      testCase({ consentDecision: ['C0004'] }, { Hindsight: true });
    });

    it('does not include UserLeap when consent does not include C0002', () => {
      testCase({}, { UserLeap: false });
    });

    it('includes UserLeap when consent includes C0002', () => {
      testCase({ consentDecision: ['C0002'] }, { UserLeap: true });
    });
  });
});
