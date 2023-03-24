export function profilePicturePlaceholder(slug: string): string {
  return `https://ui-avatars.com/api/?name=${slug.replace('-', '')}?bold=true`;
}
