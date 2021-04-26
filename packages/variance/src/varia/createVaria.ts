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
}

export class VariaBuilderWithCustomProps {
  withBase() {
    return new VariaBuilderWithBase();
  }

  withVariants() {
    return new VariaBuilderWithBase();
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
 *  .withBase()
 *  .withVariants();
 */

export const createVaria = () => new VariaBuilder();
