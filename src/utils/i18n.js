// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle(title) {
  const hasKey = this.$te('route.' + title)
  if (hasKey) {
    return this.$t('route.' + title) // $t :this method from vue-i18n, inject in @/lang/index.js
  }
  return title
}
