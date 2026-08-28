# Loading States

Use `Shimmer` or `Spinner` for loading states. **Do not use `FeatureShimmer` as a loading indicator.**

## Components

- **`Shimmer`** — skeleton placeholders for content being loaded.
- **`Spinner`** — indeterminate spinner for active loading.
- **`FeatureShimmer`** — **NOT a loading indicator.** It is designed to subtly draw attention to secondary new features or elements that are important for the user to notice but not the primary focus of the page. Do not use it as a general-purpose loader.

## Rule

`Shimmer` and `Spinner` are the only true loading indicators. `FeatureShimmer` serves a different, attention-drawing purpose for new feature surfacing.
