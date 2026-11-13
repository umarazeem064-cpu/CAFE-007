export interface Branch {
  id: string;
  name: string;
  nameUrdu: string;
  address: string;
  addressUrdu: string;
  phone: string;
  phoneSecondary: string;
  isMain: boolean;
  mapsUrl: string;
  hours: string;
}

export const BRANCHES: Branch[] = [
  {
    id: 'burewala',
    name: 'Burewala (Main Branch)',
    nameUrdu: 'بورے والا (مین برانچ)',
    address: 'Ratta Tibba Road, Burewala, Punjab, Pakistan',
    addressUrdu: 'رٹہ ٹبہ روڈ، بورے والا، پنجاب، پاکستان',
    phone: '0346-7787007',
    phoneSecondary: '0300-6966007',
    isMain: true,
    mapsUrl: 'https://maps.app.goo.gl/h9wbLVXorf6rmiAu7',
    hours: '11:00 AM - 02:00 AM Daily',
  },
  {
    id: 'islamabad',
    name: 'Islamabad (Enclave Bahria)',
    nameUrdu: 'اسلام آباد (انکلیو بحریہ)',
    address: 'Bahria Enclave Sector Commercial, Islamabad',
    addressUrdu: 'بحریہ انکلیو سیکٹر کمرشل، اسلام آباد',
    phone: '0346-7787007',
    phoneSecondary: '0300-6966007',
    isMain: false,
    mapsUrl: 'https://maps.google.com/?q=Islamabad+Bahria+Enclave',
    hours: '12:00 PM - 02:00 AM Daily',
  },
  {
    id: 'sialkot',
    name: 'Sialkot City Branch',
    nameUrdu: 'سیالکوٹ برانچ',
    address: 'Cantt Commercial Area, Sialkot',
    addressUrdu: 'کینٹ کمرشل ایریا، سیالکوٹ',
    phone: '0346-7787007',
    phoneSecondary: '0300-6966007',
    isMain: false,
    mapsUrl: 'https://maps.google.com/?q=Sialkot',
    hours: '12:00 PM - 01:00 AM Daily',
  },
  {
    id: 'daska',
    name: 'Daska Branch',
    nameUrdu: 'ڈسکہ برانچ',
    address: 'Main Sambrial Road, Daska',
    addressUrdu: 'مین سمبڑیال روڈ، ڈسکہ',
    phone: '0346-7787007',
    phoneSecondary: '0300-6966007',
    isMain: false,
    mapsUrl: 'https://maps.google.com/?q=Daska',
    hours: '12:00 PM - 01:00 AM Daily',
  },
  {
    id: 'gaggoo',
    name: 'Gaggoo Mandi Branch',
    nameUrdu: 'گگو منڈی برانچ',
    address: 'Multan Road, Gaggoo Mandi',
    addressUrdu: 'ملتان روڈ، گگو منڈی',
    phone: '0346-7787007',
    phoneSecondary: '0300-6966007',
    isMain: false,
    mapsUrl: 'https://maps.google.com/?q=Gaggoo+Mandi',
    hours: '12:00 PM - 01:00 AM Daily',
  },
  {
    id: 'machiwal',
    name: 'Machiwal Branch',
    nameUrdu: 'ماچھی وال برانچ',
    address: 'Burewala - Vehari Highway, Machiwal',
    addressUrdu: 'بورے والا وہاڑی ہائی وے، ماچھی وال',
    phone: '0346-7787007',
    phoneSecondary: '0300-6966007',
    isMain: false,
    mapsUrl: 'https://maps.google.com/?q=Machiwal',
    hours: '12:00 PM - 01:00 AM Daily',
  },
  {
    id: 'garhamore',
    name: 'Garhamore Branch',
    nameUrdu: 'گڑھا موڑ برانچ',
    address: 'Chowk Garhamore, District Vehari',
    addressUrdu: 'چوک گڑھا موڑ، ضلع وہاڑی',
    phone: '0346-7787007',
    phoneSecondary: '0300-6966007',
    isMain: false,
    mapsUrl: 'https://maps.google.com/?q=Garhamore',
    hours: '12:00 PM - 01:00 AM Daily',
  },
  {
    id: 'mailsi',
    name: 'Mailsi Branch',
    nameUrdu: 'میلسی برانچ',
    address: 'Colony Road, Mailsi',
    addressUrdu: 'کالونی روڈ، میلسی',
    phone: '0346-7787007',
    phoneSecondary: '0300-6966007',
    isMain: false,
    mapsUrl: 'https://maps.google.com/?q=Mailsi',
    hours: '12:00 PM - 01:00 AM Daily',
  },
  {
    id: 'ghaziabad',
    name: 'Ghaziabad Branch',
    nameUrdu: 'غازی آباد برانچ',
    address: 'Main Bazar, Ghaziabad',
    addressUrdu: 'مین بازار، غازی آباد',
    phone: '0346-7787007',
    phoneSecondary: '0300-6966007',
    isMain: false,
    mapsUrl: 'https://maps.google.com/?q=Ghaziabad',
    hours: '12:00 PM - 01:00 AM Daily',
  },
];
