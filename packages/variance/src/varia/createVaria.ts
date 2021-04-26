export class VariaBuilder {
  withProps() {
    return new VariaBuilderWithProps();
  }

  withCustomProps() {
    return new VariaBuilderWithCustomProps();
  }

  withBase() {
    return new VariaBuilderWithBase();
  }

  withVariants() {
    return new VariaBuilderWithBase();
  }

  withModes() {
    return new VariaBuilderWithModes();
  }

  withStates() {
    return new VariaBuilderWithStates();
  }
}

export class VariaBuilderWithProps {
  withCustomProps() {
    return new VariaBuilderWithCustomProps();
  }

  withBase() {
    return new VariaBuilderWithBase();
  }

  withVariants() {
    return new VariaBuilderWithBase();
  }

  withModes() {
    return new VariaBuilderWithModes();
  }

  withStates() {
    return new VariaBuilderWithStates();
  }
}

export class VariaBuilderWithCustomProps {
  withBase() {
    return new VariaBuilderWithBase();
  }

  withVariants() {
    return new VariaBuilderWithBase();
  }

  withModes() {
    return new VariaBuilderWithModes();
  }

  withStates() {
    return new VariaBuilderWithStates();
  }
}

export class VariaBuilderWithModes {
  withBase() {
    return new VariaBuilderWithBase();
  }

  withVariants() {
    return new VariaBuilderWithBase();
  }

  withStates() {
    return new VariaBuilderWithStates();
  }
}

export class VariaBuilderWithBase {
  withVariants() {
    return new VariaBuilderWithBase();
  }

  withStates() {
    return new VariaBuilderWithStates();
  }
}

export class VariaBuilderWithVariants {
  withVariants() {
    return new VariaBuilderWithBase();
  }

  withStates() {
    return new VariaBuilderWithStates();
  }
}

export class VariaBuilderWithStates {
  withVariants() {
    return new VariaBuilderWithStates();
  }
}

/**
 * @example
 * createVaria()
 *  .withProps()
 *  .withCustomProps()
 *  .withModes()
 *  .withBase()
 *  .withStates()
 *  .withVariants();
 */

export const createVaria = () => new VariaBuilder();
