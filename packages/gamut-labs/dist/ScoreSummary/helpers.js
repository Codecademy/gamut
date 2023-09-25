import pluralize from 'pluralize';
var getContentItemTypeRoutePart = function getContentItemTypeRoutePart(type) {
  return type ? pluralize(type, 2) : '';
};
export var createResumeUrlPath = function createResumeUrlPath(_ref) {
  var journeySlug = _ref.journeySlug,
    pathSlug = _ref.pathSlug,
    trackSlug = _ref.trackSlug,
    moduleSlug = _ref.moduleSlug,
    contentItemType = _ref.contentItemType,
    contentItemSlug = _ref.contentItemSlug;
  var contentItemTypeRoute = getContentItemTypeRoutePart(contentItemType);
  var journeyUrl = journeySlug ? "/journeys/".concat(journeySlug) : '';
  if (pathSlug && trackSlug && moduleSlug && contentItemType && contentItemTypeRoute && contentItemSlug) return "".concat(journeyUrl, "/paths/").concat(pathSlug, "/tracks/").concat(trackSlug, "/modules/").concat(moduleSlug, "/").concat(contentItemTypeRoute, "/").concat(contentItemSlug);
  if (pathSlug && trackSlug && moduleSlug) return "".concat(journeyUrl, "/paths/").concat(pathSlug, "/tracks/").concat(trackSlug, "/modules/").concat(moduleSlug);
  if (pathSlug && trackSlug) return "".concat(journeyUrl, "/paths/").concat(pathSlug, "/tracks/").concat(trackSlug);
  if (pathSlug) return "".concat(journeyUrl, "/paths/").concat(pathSlug);
  return journeyUrl;
};