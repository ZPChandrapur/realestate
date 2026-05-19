export function formatPrice(price: number, listingType: string): string {
  if (listingType === 'rent') {
    if (price >= 100000) {
      return `${(price / 100000).toFixed(1).replace(/\.0$/, '')} Lac/mo`;
    }
    return `${price.toLocaleString('en-IN')}/mo`;
  }
  if (price >= 10000000) {
    return `${(price / 10000000).toFixed(2).replace(/\.00$/, '').replace(/\.0$/, '')} Cr`;
  }
  if (price >= 100000) {
    return `${(price / 100000).toFixed(2).replace(/\.00$/, '').replace(/\.0$/, '')} Lac`;
  }
  return price.toLocaleString('en-IN');
}

export function formatArea(area: number): string {
  return `${area.toLocaleString('en-IN')} sq.ft`;
}

export function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getPropertyImage(property: { images: string[] }, index: number = 0): string {
  if (property.images && property.images.length > 0 && property.images[index]) {
    return property.images[index];
  }
  return 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800';
}
