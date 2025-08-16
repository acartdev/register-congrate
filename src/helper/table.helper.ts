export function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}
export function formatDate(dateInput: Date | string): string {
  let date: Date;
  if (typeof dateInput === 'string') {
    date = new Date(dateInput);
  } else {
    date = dateInput;
  }

  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const yearBuddhist = date.getFullYear() + 543;
  const shortYear = yearBuddhist.toString().slice(-2);

  return `${day}/${month}/${shortYear}`;
}

export function shortDepartMent(dept: string | undefined) {
  switch (dept) {
    case 'เทคโนโลยีสารสนเทศ':
      return 'ท.ส.';
    case 'เทคโนโลยีธุรกิจดิจิทัล':
      return 'ท.ธ.';
    case 'การบัญชี':
      return 'บช.';
    case 'การโรงแรม':
      return 'ร.ม.';
    case 'การจัดการโลจิสติกส์และซัพพลายเชน':
      return 'ลจ.';
    default:
      return '-';
  }
}
