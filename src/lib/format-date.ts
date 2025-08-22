
export function formatDate(
  dateString: string,
  options?: Intl.DateTimeFormatOptions
): string {

  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jakarta',
  };

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date string provided.');
    }

    return date.toLocaleString('id-ID', options || defaultOptions);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString; 
  }
}