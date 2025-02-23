export const mockInvoices = [
    {
      id: 'INV-01',
      vendor: 'XYZ',
      amount: 500,
      status: 'Pending',
      dueDate: '2024-02-15',
      vendorInfo: {
        name: 'XYZ Sdn',
        email: 'xyz@gmail',
        phone: '1234567',
        address: '#3, Brigade M'
      },
      breakdown: {
        subtotal: 500.00,
        tax: 100.00,
        discount: 0.00,
        total: 600.00
      }
    },
    {
      id: 'INV-02',
      vendor: 'ABC',
      amount: 100000,
      status: 'Approved',
      dueDate: '2024-10-08',
      vendorInfo: {
        name: 'ABC Corp',
        email: 'abc@gmail',
        phone: '7654321',
        address: '#45, Tech Park'
      },
      breakdown: {
        subtotal: 100000.00,
        tax: 18000.00,
        discount: 5000.00,
        total: 113000.00
      }
    },
    {
      id: 'INV-03',
      vendor: 'PQR',
      amount: 3000,
      status: 'Rejected',
      dueDate: '2024-11-01',
      vendorInfo: {
        name: 'PQR Ltd',
        email: 'pqr@gmail',
        phone: '9876543',
        address: '#12, Business Center'
      },
      breakdown: {
        subtotal: 3000.00,
        tax: 540.00,
        discount: 0.00,
        total: 3540.00
      }
    },
    {
      id: 'INV-04',
      vendor: 'Office',
      amount: 10000,
      status: 'Pending',
      dueDate: '2024-12-11',
      vendorInfo: {
        name: 'Office Supplies Inc',
        email: 'office@gmail',
        phone: '4567890',
        address: '#78, Supply Street'
      },
      breakdown: {
        subtotal: 10000.00,
        tax: 1800.00,
        discount: 500.00,
        total: 11300.00
      }
    },
    // Additional 100 invoices
    {
      id: 'INV-05',
      vendor: 'STU',
      amount: 2000,
      status: 'Approved',
      dueDate: '2024-01-10',
      vendorInfo: {
        name: 'STU Ventures',
        email: 'stu@gmail',
        phone: '6789012',
        address: '#90, Innovation Hub'
      },
      breakdown: {
        subtotal: 2000.00,
        tax: 360.00,
        discount: 0.00,
        total: 2360.00
      }
    },
    {
      id: 'INV-06',
      vendor: 'VWX',
      amount: 4000,
      status: 'Pending',
      dueDate: '2024-03-15',
      vendorInfo: {
        name: 'VWX Technologies',
        email: 'vwx@gmail',
        phone: '3456789',
        address: '#101, Tech Valley'
      },
      breakdown: {
        subtotal: 4000.00,
        tax: 720.00,
        discount: 0.00,
        total: 4720.00
      }
    },
    {
      id: 'INV-07',
      vendor: 'YZA',
      amount: 1500,
      status: 'Rejected',
      dueDate: '2024-04-01',
      vendorInfo: {
        name: 'YZA Solutions',
        email: 'yza@gmail',
        phone: '5678901',
        address: '#21, Business Avenue'
      },
      breakdown: {
        subtotal: 1500.00,
        tax: 270.00,
        discount: 0.00,
        total: 1770.00
      }
    },
    {
      id: 'INV-08',
      vendor: 'BCD',
      amount: 2500,
      status: 'Pending',
      dueDate: '2024-05-11',
      vendorInfo: {
        name: 'BCD Enterprises',
        email: 'bcd@gmail',
        phone: '6789013',
        address: '#34, Industrial Estate'
      },
      breakdown: {
        subtotal: 2500.00,
        tax: 450.00,
        discount: 0.00,
        total: 2950.00
      }
    },
    {
      id: 'INV-09',
      vendor: 'EFG',
      amount: 3000,
      status: '',
      dueDate: '2024-06-01',
      vendorInfo: {
        name: 'EFG Corporation',
        email: 'efg@gmail',
        phone: '8901234',
        address: '#56, Industrial Area'
      },
      breakdown: {
        subtotal: 3000.00,
        tax: 540.00,
        discount: 0.00,
        total: 3540.00
      }
    },
    {
      id: 'INV-10',
      vendor: 'HIJ',
      amount: 4000,
      status: '',
      dueDate: '2024-07-01',
      vendorInfo: {
        name: 'HIJ Industries',
        email: 'hij@gmail',
        phone: '6789012',
        address: '#78, Technology Park'
      },
      breakdown: {
        subtotal: 4000.00,
        tax: 720.00,
        discount: 0.00,
        total: 4720.00
      }
    },
    {
      id: 'INV-11',
      vendor: 'JKL',
      amount: 4500,
      status: '',
      dueDate: '2024-08-01',
      vendorInfo: {
        name: 'JKL Enterprises',
        email: 'jkl@gmail',
        phone: '5678901',
        address: '#90, Industrial Estate'
      },
      breakdown: {
        subtotal: 4500.00,
        tax: 810.00,
        discount: 0.00,
        total: 5310.00
      }
    },
    {
      id: 'INV-12',
      vendor: 'MNO',
      amount: 5500,
      status: '',
      dueDate: '2024-09-01',
      vendorInfo: {
        name: 'MNO Corporation',
        email: 'mno@gmail',
        phone: '6789013',
        address: '#101, Technology Park'
      },
      breakdown: {
        subtotal: 5500.00,
        tax: 990.00,
        discount: 0.00,
        total: 6490.00
      }
    },
    {
      id: 'INV-13',
      vendor: 'PQR',
      amount: 6500,
      status: '',
      dueDate: '2024-10-01',
      vendorInfo: {
        name: 'PQR Industries',
        email: 'pqr@gmail',
        phone: '8901234',
        address: '#112, Business Center'
      },
      breakdown: {
        subtotal: 6500.00,
        tax: 1170.00,
        discount: 0.00,
        total: 7670.00
      }
    },
    {
      id: 'INV-14',
      vendor: 'RST',
      amount: 7000,
      status: '',
      dueDate: '2024-11-01',
      vendorInfo: {
        name: 'RST Enterprises',
        email: 'rst@gmail',
        phone: '0123456',
        address: '#123, Industrial Estate'
      },
      breakdown: {
        subtotal: 7000.00,
        tax: 1260.00,
        discount: 0.00,
        total: 8260.00
      }
    },
    {
      id: 'INV-15',
      vendor: 'UVW',
      amount: 8000,
      status: '',
      dueDate: '2024-12-01',
      vendorInfo: {
        name: 'UVW Corporation',
        email: 'uvw@gmail',
        phone: '2345678',
        address: '#134, Technology Park'
      },
      breakdown: {
        subtotal: 8000.00,
        tax: 1440.00,
        discount: 0.00,
        total: 9440.00
      }
    },
    {
      id: 'INV-16',
      vendor: 'VWX',
      amount: 9000,
      status: '',
      dueDate: '2024-01-01',
      vendorInfo: {
        name: 'VWX Industries',
        email: 'vw@gmail',
        phone: '3456789',
        address: '#145, Industrial Park'
      },
      breakdown: {
        subtotal: 9000.00,
        tax: 1620.00,
        discount: 0.00,
        total: 10620.00
      }
    },
    {
      id: 'INV-17',
      vendor: 'XYZ',
      amount: 10000,
      status: '',
      dueDate: '2024-02-01',
      vendorInfo: {
        name: 'XYZ Enterprises',
        email: 'xyz@gmail',
        phone: '4567890',
        address: '#156, Business Hub'
      },
      breakdown: {
        subtotal: 10000.00,
        tax: 1800.00,
        discount: 0.00,
        total: 11800.00
      }
    },
    {
      id: 'INV-18',
      vendor: 'PQR',
      amount: 11000,
      status: '',
      dueDate: '2024-03-01',
      vendorInfo: {
        name: 'PQR Corporation',
        email: 'pqr@gmail',
        phone: '5678901',
        address: '#167, Technology Park'
      },
      breakdown: {
        subtotal: 11000.00,
        tax: 1980.00,
        discount: 0.00,
        total: 12980.00
      }
    },
    {
      id: 'INV-19',
      vendor: 'MNO',
      amount: 12000,
      status: '',
      dueDate: '2024-04-01',
      vendorInfo: {
        name: 'MNO Industries',
        email: 'mno@gmail',
        phone: '6789012',
        address: '#178, Industrial Park'
      },
      breakdown: {
        subtotal: 12000.00,
        tax: 2160.00,
        discount: 0.00,
        total: 14160.00
      }
    },
    {
      id: 'INV-20',
      vendor: 'NOL',
      amount: 13000,
      status: '',
      dueDate: '2024-05-01',
      vendorInfo: {
        name: 'NOL Enterprises',
        email: 'nol@gmail',
        phone: '7890123',
        address: '#189, Business Hub'
      },
      breakdown: {
        subtotal: 13000.00,
        tax: 2340.00,
        discount: 0.00,
        total: 15340.00
      }
    },
      {
        "id": "INV-21",
        "vendor": "ABC Corp",
        "amount": 15000,
        "status": "",
        "dueDate": "2024-05-05",
        "vendorInfo": {
          "name": "ABC Corporation",
          "email": "abc.corp@gmail.com",
          "phone": "1234567",
          "address": "#101, Tech Park"
        },
        "breakdown": {
          "subtotal": 15000.00,
          "tax": 2700.00,
          "discount": 0.00,
          "total": 17700.00
        }
      },
      {
        "id": "INV-22",
        "vendor": "XYZ Ltd",
        "amount": 20000,
        "status": "",
        "dueDate": "2024-05-10",
        "vendorInfo": {
          "name": "XYZ Limited",
          "email": "xyz.ltd@gmail.com",
          "phone": "2345678",
          "address": "#202, Innovation Center"
        },
        "breakdown": {
          "subtotal": 20000.00,
          "tax": 3600.00,
          "discount": 0.00,
          "total": 23600.00
        }
      },
      {
        "id": "INV-23",
        "vendor": "LMN Inc",
        "amount": 25000,
        "status": "",
        "dueDate": "2024-05-15",
        "vendorInfo": {
          "name": "LMN Incorporated",
          "email": "lmn.inc@gmail.com",
          "phone": "3456789",
          "address": "#303, Corporate Plaza"
        },
        "breakdown": {
          "subtotal": 25000.00,
          "tax": 4500.00,
          "discount": 0.00,
          "total": 29500.00
        }
      },
      {
        "id": "INV-24",
        "vendor": "PQR Solutions",
        "amount": 18000,
        "status": "",
        "dueDate": "2024-05-20",
        "vendorInfo": {
          "name": "PQR Solutions",
          "email": "pqr.solutions@gmail.com",
          "phone": "4567890",
          "address": "#404, Service Lane"
        },
        "breakdown": {
          "subtotal": 18000.00,
          "tax": 3240.00,
          "discount": 0.00,
          "total": 21240.00
        }
      },
      {
        "id": "INV-25",
        "vendor": "STU Group",
        "amount": 22000,
        "status": "",
        "dueDate": "2024-05-25",
        "vendorInfo": {
          "name": "STU Group",
          "email": "stu.group@gmail.com",
          "phone": "5678901",
          "address": "#505, Business District"
        },
        "breakdown": {
          "subtotal": 22000.00,
          "tax": 3960.00,
          "discount": 0.00,
          "total": 25860.00
        }
      },
      {
        "id": "INV-26",
        "vendor": "VWX Services",
        "amount": 17000,
        "status": "",
        "dueDate": "2024-05-30",
        "vendorInfo": {
          "name": "VWX Services",
          "email": "vwx.services@gmail.com",
          "phone": "6789012",
          "address": "#606, Service Hub"
        },
        "breakdown": {
          "subtotal": 17000.00,
          "tax": 3060.00,
          "discount": 0.00,
          "total": 20060.00
        }
      },
      {
        "id": "INV-27",
        "vendor": "YZA Technologies",
        "amount": 19000,
        "status": "",
        "dueDate": "2024-06-01",
        "vendorInfo": {
          "name": "YZA Technologies",
          "email": "yza.tech@gmail.com",
          "phone": "7890123",
          "address": "#707, Tech Valley"
        },
        "breakdown": {
          "subtotal": 19000.00,
          "tax": 3420.00,
          "discount": 0.00,
          "total": 22420.00
        }
      },
      {
        "id": "INV-28",
        "vendor": "BCD Enterprises",
        "amount": 16000,
        "status": "",
        "dueDate": "2024-06-05",
        "vendorInfo": {
          "name": "BCD Enterprises",
          "email": "bcd.enterprises@gmail.com",
          "phone": "8901234",
          "address": "#808, Commerce Street"
        },
        "breakdown": {
          "subtotal": 16000.00,
          "tax": 2880.00,
          "discount": 0.00,
          "total": 18880.00
        }
      },
      {
        "id": "INV-29",
        "vendor": "EFG Holdings",
        "amount": 21000,
        "status": "",
        "dueDate": "2024-06-10",
        "vendorInfo": {
          "name": "EFG Holdings",
          "email": "efg.holdings@gmail.com",
          "phone": "9012345",
          "address": "#909, Financial Center"
        },
        "breakdown": {
          "subtotal": 21000.00,
          "tax": 3780.00,
          "discount": 0.00,
          "total": 24780.00
        }
      },
      {
        "id": "INV-30",
        "vendor": "HIJ Solutions",
        "amount": 17500,
        "status": "",
        "dueDate": "2024-06-15",
        "vendorInfo": {
          "name": "HIJ Solutions",
          "email": "hij.solutions@gmail.com",
          "phone": "0123456",
          "address": "#1001, Service Avenue"
        },
        "breakdown": {
          "subtotal": 17500.00,
          "tax": 3150.00,
          "discount": 0.00,
          "total": 20650.00
        }
      },
      {
        "id": "INV-31",
        "vendor": "KLM Technologies",
        "amount": 23000,
        "status": "",
        "dueDate": "2024-06-20",
        "vendorInfo": {
          "name": "KLM Technologies",
          "email": "klm.tech@gmail.com",
          "phone": "1234568",
          "address": "#1102, Innovation Hub"
        },
        "breakdown": {
          "subtotal": 23000.00,
          "tax": 4140.00,
          "discount": 0.00,
          "total": 27140.00
        }
      },
      {
        "id": "INV-32",
        "vendor": "NOP Industries",
        "amount": 14500,
        "status": "",
        "dueDate": "2024-06-25",
        "vendorInfo": {
          "name": "NOP Industries",
          "email": "nop.industries@gmail.com",
          "phone": "2345679",
          "address": "#1203, Industrial Park"
        },
        "breakdown": {
          "subtotal": 14500.00,
          "tax": 2610.00,
          "discount": 0.00,
          "total": 17110.00
        }
      },
      {
        "id": "INV-33",
        "vendor": "QRS Group",
        "amount": 19500,
        "status": "",
        "dueDate": "2024-06-30",
        "vendorInfo": {
          "name": "QRS Group",
          "email": "qrs.group@gmail.com",
          "phone": "3456780",
          "address": "#1304, Business Complex"
        },
        "breakdown": {
          "subtotal": 19500.00,
          "tax": 3510.00,
          "discount": 0.00,
          "total": 23010.00
        }
      },
      {
        "id": "INV-34",
        "vendor": "TUV Services",
        "amount": 22000,
        "status": "",
        "dueDate": "2024-07-05",
        "vendorInfo": {
          "name": "TUV Services",
          "email": "tuv.services@gmail.com",
          "phone": "4567891",
          "address": "#1405, Service Plaza"
        },
        "breakdown": {
          "subtotal": 22000.00,
          "tax": 3960.00,
          "discount": 0.00,
          "total": 25860.00
        }
      },
      {
        "id": "INV-35",
        "vendor": "WXY Technologies",
        "amount": 16000,
        "status": "",
        "dueDate": "2024-07-10",
        "vendorInfo": {
          "name": "WXY Technologies",
          "email": "wxy.tech@gmail.com",
          "phone": "5678902",
          "address": "#1506, Tech District"
        },
        "breakdown": {
          "subtotal": 16000.00,
          "tax": 2880.00,
          "discount": 0.00,
          "total": 18880.00
        }
      },
      {
        "id": "INV-36",
        "vendor": "ZAB Enterprises",
        "amount": 18500,
        "status": "",
        "dueDate": "2024-07-15",
        "vendorInfo": {
          "name": "ZAB Enterprises",
          "email": "zab.enterprises@gmail.com",
          "phone": "6789013",
          "address": "#1607, Business Avenue"
        },
        "breakdown": {
          "subtotal": 18500.00,
          "tax": 3330.00,
          "discount": 0.00,
          "total": 21830.00
        }
      },
      {
        "id": "INV-37",
        "vendor": "CDE Solutions",
        "amount": 21000,
        "status": "",
        "dueDate": "2024-07-20",
        "vendorInfo": {
          "name": "CDE Solutions",
          "email": "cde.solutions@gmail.com",
          "phone": "7890124",
          "address": "#1708, Service Center"
        },
        "breakdown": {
          "subtotal": 21000.00,
          "tax": 3780.00,
          "discount": 0.00,
          "total": 24780.00
        }
      },
      {
        "id": "INV-38",
        "vendor": "FGH Holdings",
        "amount": 17500,
        "status": "",
        "dueDate": "2024-07-25",
        "vendorInfo": {
          "name": "FGH Holdings",
          "email": "fgh.holdings@gmail.com",
          "phone": "8901235",
          "address": "#1809, Corporate Park"
        },
        "breakdown": {
          "subtotal": 17500.00,
          "tax": 3150.00,
          "discount": 0.00,
          "total": 20650.00
        }
      },
      {
        "id": "INV-39",
        "vendor": "IJK Technologies",
        "amount": 19500,
        "status": "",
        "dueDate": "2024-08-01",
        "vendorInfo": {
          "name": "IJK Technologies",
          "email": "ijk.tech@gmail.com",
          "phone": "9012346",
          "address": "#1910, Tech Hub"
        },
        "breakdown": {
          "subtotal": 19500.00,
          "tax": 3510.00,
          "discount": 0.00,
          "total": 23010.00
        }
      },
      {
        "id": "INV-40",
        "vendor": "LMN Group",
        "amount": 22000,
        "status": "",
        "dueDate": "2024-08-05",
        "vendorInfo": {
          "name": "LMN Group",
          "email": "lmn.group@gmail.com",
          "phone": "1234569",
          "address": "#2011, Business District"
        },
        "breakdown": {
          "subtotal": 22000.00,
          "tax": 3960.00,
          "discount": 0.00,
          "total": 25860.00
        }
      },
      {
        "id": "INV-41",
        "vendor": "NOP Solutions",
        "amount": 16000,
        "status": "",
        "dueDate": "2024-08-10",
        "vendorInfo": {
          "name": "NOP Solutions",
          "email": "nop.solutions@gmail.com",
          "phone": "2345670",
          "address": "#2112, Service Lane"
        },
        "breakdown": {
          "subtotal": 16000.00,
          "tax": 2880.00,
          "discount": 0.00,
          "total": 18880.00
        }
      },
      {
        "id": "INV-42",
        "vendor": "QRS Technologies",
        "amount": 18500,
        "status": "",
        "dueDate": "2024-08-15",
        "vendorInfo": {
          "name": "QRS Technologies",
          "email": "qrs.tech@gmail.com",
          "phone": "3456781",
          "address": "#2213, Innovation Center"
        },
        "breakdown": {
          "subtotal": 18500.00,
          "tax": 3330.00,
          "discount": 0.00,
          "total": 21830.00
        }
      },
      {
        "id": "INV-43",
        "vendor": "STU Holdings",
        "amount": 21000,
        "status": "",
        "dueDate": "2024-08-20",
        "vendorInfo": {
          "name": "STU Holdings",
          "email": "stu.holdings@gmail.com",
          "phone": "4567892",
          "address": "#2314, Corporate Plaza"
        },
        "breakdown": {
          "subtotal": 21000.00,
          "tax": 3780.00,
          "discount": 0.00,
          "total": 24780.00
        }
      },
      {
        "id": "INV-44",
        "vendor": "VWX Enterprises",
        "amount": 17500,
        "status": "",
        "dueDate": "2024-08-25",
        "vendorInfo": {
          "name": "VWX Enterprises",
          "email": "vwx.enterprises@gmail.com",
          "phone": "5678903",
          "address": "#2415, Business Hub"
        },
        "breakdown": {
          "subtotal": 17500.00,
          "tax": 3150.00,
          "discount": 0.00,
          "total": 20650.00
        }
      },
      {
        "id": "INV-45",
        "vendor": "YZA Solutions",
        "amount": 19500,
        "status": "",
        "dueDate": "2024-09-01",
        "vendorInfo": {
          "name": "YZA Solutions",
          "email": "yza.solutions@gmail.com",
          "phone": "6789014",
          "address": "#2516, Service Avenue"
        },
        "breakdown": {
          "subtotal": 19500.00,
          "tax": 3510.00,
          "discount": 0.00,
          "total": 23010.00
        }
      },
      {
        "id": "INV-46",
        "vendor": "BCD Technologies",
        "amount": 22000,
        "status": "",
        "dueDate": "2024-09-05",
        "vendorInfo": {
          "name": "BCD Technologies",
          "email": "bcd.tech@gmail.com",
          "phone": "7890125",
          "address": "#2617, Tech Park"
        },
        "breakdown": {
          "subtotal": 22000.00,
          "tax": 3960.00,
          "discount": 0.00,
          "total": 25860.00
        }
      },
      {
        "id": "INV-47",
        "vendor": "EFG Group",
        "amount": 16000,
        "status": "",
        "dueDate": "2024-09-10",
        "vendorInfo": {
          "name": "EFG Group",
          "email": "efg.group@gmail.com",
          "phone": "8901236",
          "address": "#2718, Business District"
        },
        "breakdown": {
          "subtotal": 16000.00,
          "tax": 2880.00,
          "discount": 0.00,
          "total": 18880.00
        }
      },
      {
        "id": "INV-48",
        "vendor": "HIJ Holdings",
        "amount": 18500,
        "status": "",
        "dueDate": "2024-09-15",
        "vendorInfo": {
          "name": "HIJ Holdings",
          "email": "hij.holdings@gmail.com",
          "phone": "9012347",
          "address": "#2819, Corporate Center"
        },
        "breakdown": {
          "subtotal": 18500.00,
          "tax": 3330.00,
          "discount": 0.00,
          "total": 21830.00
        }
      },
      {
        "id": "INV-49",
        "vendor": "JKL Technologies",
        "amount": 21000,
        "status": "",
        "dueDate": "2024-09-20",
        "vendorInfo": {
          "name": "JKL Technologies",
          "email": "jkl.tech@gmail.com",
          "phone": "1234560",
          "address": "#2920, Tech Valley"
        },
        "breakdown": {
          "subtotal": 21000.00,
          "tax": 3780.00,
          "discount": 0.00,
          "total": 24780.00
        }
      },
      {
        "id": "INV-50",
        "vendor": "MNO Solutions",
        "amount": 17500,
        "status": "",
        "dueDate": "2024-09-25",
        "vendorInfo": {
          "name": "MNO Solutions",
          "email": "mno.solutions@gmail.com",
          "phone": "2345671",
          "address": "#3021, Service Lane"
        },
        "breakdown": {
          "subtotal": 17500.00,
          "tax": 3150.00,
          "discount": 0.00,
          "total": 20650.00
        }
      },
      {
        "id": "INV-51",
        "vendor": "PQR Technologies",
        "amount": 19500,
        "status": "",
        "dueDate": "2024-10-01",
        "vendorInfo": {
          "name": "PQR Technologies",
          "email": "pqr.tech@gmail.com",
          "phone": "3456782",
          "address": "#3122, Innovation Center"
        },
        "breakdown": {
          "subtotal": 19500.00,
          "tax": 3510.00,
          "discount": 0.00,
          "total": 23010.00
        }
      },
      {
        "id": "INV-52",
        "vendor": "STU Group",
        "amount": 22000,
        "status": "",
        "dueDate": "2024-10-05",
        "vendorInfo": {
          "name": "STU Group",
          "email": "stu.group@gmail.com",
          "phone": "4567893",
          "address": "#3223, Business Hub"
        },
        "breakdown": {
          "subtotal": 22000.00,
          "tax": 3960.00,
          "discount": 0.00,
          "total": 25860.00
        }
      },
      {
        "id": "INV-53",
        "vendor": "VWX Enterprises",
        "amount": 16000,
        "status": "",
        "dueDate": "2024-10-10",
        "vendorInfo": {
          "name": "VWX Enterprises",
          "email": "vwx.enterprises@gmail.com",
          "phone": "5678904",
          "address": "#3324, Service Avenue"
        },
        "breakdown": {
          "subtotal": 16000.00,
          "tax": 2880.00,
          "discount": 0.00,
          "total": 18880.00
        }
      },
      {
        "id": "INV-54",
        "vendor": "YZA Solutions",
        "amount": 18500,
        "status": "",
        "dueDate": "2024-10-15",
        "vendorInfo": {
          "name": "YZA Solutions",
          "email": "yza.solutions@gmail.com",
          "phone": "6789015",
          "address": "#3425, Corporate Center"
        },
        "breakdown": {
          "subtotal": 18500.00,
          "tax": 3330.00,
          "discount": 0.00,
          "total": 21830.00
        }
      },
      {
        "id": "INV-55",
        "vendor": "BCD Technologies",
        "amount": 21000,
        "status": "",
        "dueDate": "2024-10-20",
        "vendorInfo": {
          "name": "BCD Technologies",
          "email": "bcd.tech@gmail.com",
          "phone": "7890126",
          "address": "#3526, Tech Park"
        },
        "breakdown": {
          "subtotal": 21000.00,
          "tax": 3780.00,
          "discount": 0.00,
          "total": 24780.00
        }
      },
      {
        "id": "INV-56",
        "vendor": "EFG Group",
        "amount": 17500,
        "status": "",
        "dueDate": "2024-10-25",
        "vendorInfo": {
          "name": "EFG Group",
          "email": "efg.group@gmail.com",
          "phone": "8901237",
          "address": "#3627, Business District"
        },
        "breakdown": {
          "subtotal": 17500.00,
          "tax": 3150.00,
          "discount": 0.00,
          "total": 20650.00
        }
      },
      {
        "id": "INV-57",
        "vendor": "HIJ Holdings",
        "amount": 19500,
        "status": "",
        "dueDate": "2024-11-01",
        "vendorInfo": {
          "name": "HIJ Holdings",
          "email": "hij.holdings@gmail.com",
          "phone": "9012348",
          "address": "#3728, Corporate Center"
        },
        "breakdown": {
          "subtotal": 19500.00,
          "tax": 3510.00,
          "discount": 0.00,
          "total": 23010.00
        }
      },
      {
        "id": "INV-58",
        "vendor": "JKL Technologies",
        "amount": 22000,
        "status": "",
        "dueDate": "2024-11-05",
        "vendorInfo": {
          "name": "JKL Technologies",
          "email": "jkl.tech@gmail.com",
          "phone": "1234561",
          "address": "#3829, Tech Valley"
        },
        "breakdown": {
          "subtotal": 22000.00,
          "tax": 3960.00,
          "discount": 0.00,
          "total": 25860.00
        }
      },
      {
        "id": "INV-59",
        "vendor": "MNO Solutions",
        "amount": 16000,
        "status": "",
        "dueDate": "2024-11-10",
        "vendorInfo": {
          "name": "MNO Solutions",
          "email": "mno.solutions@gmail.com",
          "phone": "2345672",
          "address": "#3930, Service Lane"
        },
        "breakdown": {
          "subtotal": 16000.00,
          "tax": 2880.00,
          "discount": 0.00,
          "total": 18880.00
        }
      },
      {
        "id": "INV-60",
        "vendor": "PQR Technologies",
        "amount": 18500,
        "status": "",
        "dueDate": "2024-11-15",
        "vendorInfo": {
          "name": "PQR Technologies",
          "email": "pqr.tech@gmail.com",
          "phone": "3456783",
          "address": "#4031, Innovation Center"
        },
        "breakdown": {
          "subtotal": 18500.00,
          "tax": 3330.00,
          "discount": 0.00,
          "total": 21830.00
        }
      },
      {
        "id": "INV-61",
        "vendor": "STU Group",
        "amount": 21000,
        "status": "",
        "dueDate": "2024-11-20",
        "vendorInfo": {
          "name": "STU Group",
          "email": "stu.group@gmail.com",
          "phone": "4567894",
          "address": "#4132, Business Hub"
        },
        "breakdown": {
          "subtotal": 21000.00,
          "tax": 3780.00,
          "discount": 0.00,
          "total": 24780.00
        }
      },
      {
        "id": "INV-62",
        "vendor": "VWX Enterprises",
        "amount": 17500,
        "status": "",
        "dueDate": "2024-11-25",
        "vendorInfo": {
          "name": "VWX Enterprises",
          "email": "vwx.enterprises@gmail.com",
          "phone": "5678905",
          "address": "#4233, Service Avenue"
        },
        "breakdown": {
          "subtotal": 17500.00,
          "tax": 3150.00,
          "discount": 0.00,
          "total": 20650.00
        }
      },
      {
        "id": "INV-63",
        "vendor": "YZA Solutions",
        "amount": 19500,
        "status": "",
        "dueDate": "2024-12-01",
        "vendorInfo": {
          "name": "YZA Solutions",
          "email": "yza.solutions@gmail.com",
          "phone": "6789016",
          "address": "#4334, Corporate Center"
        },
        "breakdown": {
          "subtotal": 19500.00,
          "tax": 3510.00,
          "discount": 0.00,
          "total": 23010.00
        }
      },
      {
        "id": "INV-64",
        "vendor": "BCD Technologies",
        "amount": 22000,
        "status": "",
        "dueDate": "2024-12-05",
        "vendorInfo": {
          "name": "BCD Technologies",
          "email": "bcd.tech@gmail.com",
          "phone": "7890127",
          "address": "#4435, Tech Park"
        },
        "breakdown": {
          "subtotal": 22000.00,
          "tax": 3960.00,
          "discount": 0.00,
          "total": 25860.00
        }
      },
      {
        "id": "INV-65",
        "vendor": "EFG Group",
        "amount": 16000,
        "status": "",
        "dueDate": "2024-12-10",
        "vendorInfo": {
          "name": "EFG Group",
          "email": "efg.group@gmail.com",
          "phone": "8901238",
          "address": "#4536, Business District"
        },
        "breakdown": {
          "subtotal": 16000.00,
          "tax": 2880.00,
          "discount": 0.00,
          "total": 18880.00
        }
      },
      {
        "id": "INV-66",
        "vendor": "HIJ Holdings",
        "amount": 18500,
        "status": "",
        "dueDate": "2024-12-15",
        "vendorInfo": {
          "name": "HIJ Holdings",
          "email": "hij.holdings@gmail.com",
          "phone": "9012349",
          "address": "#4637, Corporate Center"
        },
        "breakdown": {
          "subtotal": 18500.00,
          "tax": 3330.00,
          "discount": 0.00,
          "total": 21830.00
        }
      },
      {
        "id": "INV-67",
        "vendor": "JKL Technologies",
        "amount": 21000,
        "status": "",
        "dueDate": "2024-12-20",
        "vendorInfo": {
          "name": "JKL Technologies",
          "email": "jkl.tech@gmail.com",
          "phone": "1234562",
          "address": "#4738, Tech Valley"
        },
        "breakdown": {
          "subtotal": 21000.00,
          "tax": 3780.00,
          "discount": 0.00,
          "total": 24780.00
        }
      },
      {
        "id": "INV-68",
        "vendor": "MNO Solutions",
        "amount": 17500,
        "status": "",
        "dueDate": "2024-12-25",
        "vendorInfo": {
          "name": "MNO Solutions",
          "email": "mno.solutions@gmail.com",
          "phone": "2345673",
          "address": "#4839, Service Lane"
        },
        "breakdown": {
          "subtotal": 17500.00,
          "tax": 3150.00,
          "discount": 0.00,
          "total": 20650.00
        }
      },
      {
        "id": "INV-69",
        "vendor": "PQR Technologies",
        "amount": 19500,
        "status": "",
        "dueDate": "2024-12-30",
        "vendorInfo": {
          "name": "PQR Technologies",
          "email": "pqr.tech@gmail.com",
          "phone": "3456784",
          "address": "#4940, Innovation Center"
        },
        "breakdown": {
          "subtotal": 19500.00,
          "tax": 3510.00,
          "discount": 0.00,
          "total": 23010.00
        }
      },
      {
        "id": "INV-70",
        "vendor": "STU Group",
        "amount": 22000,
        "status": "",
        "dueDate": "2025-01-05",
        "vendorInfo": {
          "name": "STU Group",
          "email": "stu.group@gmail.com",
          "phone": "4567895",
          "address": "#5041, Business Hub"
        },
        "breakdown": {
          "subtotal": 22000.00,
          "tax": 3960.00,
          "discount": 0.00,
          "total": 25860.00
        }
      },
      {
        "id": "INV-71",
        "vendor": "VWX Enterprises",
        "amount": 16000,
        "status": "",
        "dueDate": "2025-01-10",
        "vendorInfo": {
          "name": "VWX Enterprises",
          "email": "vwx.enterprises@gmail.com",
          "phone": "5678906",
          "address": "#5142, Service Avenue"
        },
        "breakdown": {
          "subtotal": 16000.00,
          "tax": 2880.00,
          "discount": 0.00,
          "total": 18880.00
        }
      },
      {
        "id": "INV-72",
        "vendor": "YZA Solutions",
        "amount": 18500,
        "status": "",
        "dueDate": "2025-01-15",
        "vendorInfo": {
          "name": "YZA Solutions",
          "email": "yza.solutions@gmail.com",
          "phone": "6789017",
          "address": "#5243, Corporate Center"
        },
        "breakdown": {
          "subtotal": 18500.00,
          "tax": 3330.00,
          "discount": 0.00,
          "total": 21830.00
        }
      },
      {
        "id": "INV-73",
        "vendor": "BCD Technologies",
        "amount": 21000,
        "status": "",
        "dueDate": "2025-01-20",
        "vendorInfo": {
          "name": "BCD Technologies",
          "email": "bcd.tech@gmail.com",
          "phone": "7890128",
          "address": "#5344, Tech Park"
        },
        "breakdown": {
          "subtotal": 21000.00,
          "tax": 3780.00,
          "discount": 0.00,
          "total": 24780.00
        }
      },
      {
        "id": "INV-74",
        "vendor": "EFG Group",
        "amount": 17500,
        "status": "",
        "dueDate": "2025-01-25",
        "vendorInfo": {
          "name": "EFG Group",
          "email": "efg.group@gmail.com",
          "phone": "8901239",
          "address": "#5445, Business District"
        },
        "breakdown": {
          "subtotal": 17500.00,
          "tax": 3150.00,
          "discount": 0.00,
          "total": 20650.00
        }
      },
      {
        "id": "INV-75",
        "vendor": "HIJ Holdings",
        "amount": 19500,
        "status": "",
        "dueDate": "2025-02-01",
        "vendorInfo": {
          "name": "HIJ Holdings",
          "email": "hij.holdings@gmail.com",
          "phone": "9012350",
          "address": "#5546, Corporate Center"
        },
        "breakdown": {
          "subtotal": 19500.00,
          "tax": 3510.00,
          "discount": 0.00,
          "total": 23010.00
        }
      },
      {
        "id": "INV-76",
        "vendor": "JKL Technologies",
        "amount": 22000,
        "status": "",
        "dueDate": "2025-02-05",
        "vendorInfo": {
          "name": "JKL Technologies",
          "email": "jkl.tech@gmail.com",
          "phone": "1234563",
          "address": "#5647, Tech Valley"
        },
        "breakdown": {
          "subtotal": 22000.00,
          "tax": 3960.00,
          "discount": 0.00,
          "total": 25860.00
        }
      },
      {
        "id": "INV-77",
        "vendor": "MNO Solutions",
        "amount": 16000,
        "status": "",
        "dueDate": "2025-02-10",
        "vendorInfo": {
          "name": "MNO Solutions",
          "email": "mno.solutions@gmail.com",
          "phone": "2345674",
          "address": "#5748, Service Lane"
        },
        "breakdown": {
          "subtotal": 16000.00,
          "tax": 2880.00,
          "discount": 0.00,
          "total": 18880.00
        }
      },
      {
        "id": "INV-78",
        "vendor": "PQR Technologies",
        "amount": 18500,
        "status": "",
        "dueDate": "2025-02-15",
        "vendorInfo": {
          "name": "PQR Technologies",
          "email": "pqr.tech@gmail.com",
          "phone": "3456785",
          "address": "#5849, Innovation Center"
        },
        "breakdown": {
          "subtotal": 18500.00,
          "tax": 3330.00,
          "discount": 0.00,
          "total": 21830.00
        }
      },
      {
        "id": "INV-79",
        "vendor": "STU Group",
        "amount": 21000,
        "status": "",
        "dueDate": "2025-02-20",
        "vendorInfo": {
          "name": "STU Group",
          "email": "stu.group@gmail.com",
          "phone": "4567896",
          "address": "#5950, Business Hub"
        },
        "breakdown": {
          "subtotal": 21000.00,
          "tax": 3780.00,
          "discount": 0.00,
          "total": 24780.00
        }
      },
      {
        "id": "INV-80",
        "vendor": "VWX Enterprises",
        "amount": 17500,
        "status": "",
        "dueDate": "2025-02-25",
        "vendorInfo": {
          "name": "VWX Enterprises",
          "email": "vwx.enterprises@gmail.com",
          "phone": "5678907",
          "address": "#6051, Service Avenue"
        },
        "breakdown": {
          "subtotal": 17500.00,
          "tax": 3150.00,
          "discount": 0.00,
          "total": 20650.00
        }
      },
    {
      "id": "INV-81",
      "vendor": "XYZ Corporation",
      "amount": 19000,
      "status": "",
      "dueDate": "2025-03-01",
      "vendorInfo": {
        "name": "XYZ Corporation",
        "email": "xyz.corporation@gmail.com",
        "phone": "6789012",
        "address": "#6152, Industrial Estate"
      },
      "breakdown": {
        "subtotal": 19000.00,
        "tax": 3420.00,
        "discount": 0.00,
        "total": 22420.00
      }
    },
    {
      "id": "INV-82",
      "vendor": "ABC Solutions",
      "amount": 20000,
      "status": "",
      "dueDate": "2025-03-05",
      "vendorInfo": {
        "name": "ABC Solutions",
        "email": "abc.solutions@gmail.com",
        "phone": "7890123",
        "address": "#6253, Service Sector"
      },
      "breakdown": {
        "subtotal": 20000.00,
        "tax": 3600.00,
        "discount": 0.00,
        "total": 23600.00
      }
    },
    {
      "id": "INV-83",
      "vendor": "DEF Technologies",
      "amount": 18000,
      "status": "",
      "dueDate": "2025-03-10",
      "vendorInfo": {
        "name": "DEF Technologies",
        "email": "def.tech@gmail.com",
        "phone": "8901234",
        "address": "#6354, Innovation Hub"
      },
      "breakdown": {
        "subtotal": 18000.00,
        "tax": 3240.00,
        "discount": 0.00,
        "total": 21240.00
      }
    },
    {
      "id": "INV-84",
      "vendor": "GHI Group",
      "amount": 21000,
      "status": "",
      "dueDate": "2025-03-15",
      "vendorInfo": {
        "name": "GHI Group",
        "email": "ghi.group@gmail.com",
        "phone": "9012345",
        "address": "#6455, Business Park"
      },
      "breakdown": {
        "subtotal": 21000.00,
        "tax": 3780.00,
        "discount": 0.00,
        "total": 24780.00
      }
    },
    {
      "id": "INV-85",
      "vendor": "JKL Enterprises",
      "amount": 17500,
      "status": "",
      "dueDate": "2025-03-20",
      "vendorInfo": {
        "name": "JKL Enterprises",
        "email": "jkl.enterprises@gmail.com",
        "phone": "0123456",
        "address": "#6556, Service Avenue"
      },
      "breakdown": {
        "subtotal": 17500.00,
        "tax": 3150.00,
        "discount": 0.00,
        "total": 20650.00
      }
    },
    {
      "id": "INV-86",
      "vendor": "MNO Solutions",
      "amount": 19500,
      "status": "",
      "dueDate": "2025-03-25",
      "vendorInfo": {
        "name": "MNO Solutions",
        "email": "mno.solutions@gmail.com",
        "phone": "1234567",
        "address": "#6657, Corporate Plaza"
      },
      "breakdown": {
        "subtotal": 19500.00,
        "tax": 3510.00,
        "discount": 0.00,
        "total": 23010.00
      }
    },
    {
      "id": "INV-87",
      "vendor": "PQR Technologies",
      "amount": 22000,
      "status": "",
      "dueDate": "2025-03-30",
      "vendorInfo": {
        "name": "PQR Technologies",
        "email": "pqr.tech@gmail.com",
        "phone": "2345678",
        "address": "#6758, Tech Hub"
      },
      "breakdown": {
        "subtotal": 22000.00,
        "tax": 3960.00,
        "discount": 0.00,
        "total": 25860.00
      }
    },
    {
      "id": "INV-88",
      "vendor": "STU Holdings",
      "amount": 16000,
      "status": "",
      "dueDate": "2025-04-01",
      "vendorInfo": {
        "name": "STU Holdings",
        "email": "stu.holdings@gmail.com",
        "phone": "3456789",
        "address": "#6859, Business District"
      },
      "breakdown": {
        "subtotal": 16000.00,
        "tax": 2880.00,
        "discount": 0.00,
        "total": 18880.00
      }
    },
    {
      "id": "INV-89",
      "vendor": "VWX Enterprises",
      "amount": 18500,
      "status": "",
      "dueDate": "2025-04-05",
      "vendorInfo": {
        "name": "VWX Enterprises",
        "email": "vwx.enterprises@gmail.com",
        "phone": "4567890",
        "address": "#6950, Service Lane"
      },
      "breakdown": {
        "subtotal": 18500.00,
        "tax": 3330.00,
        "discount": 0.00,
        "total": 21830.00
      }
    },
    {
      "id": "INV-90",
      "vendor": "XYZ Corporation",
      "amount": 21000,
      "status": "",
      "dueDate": "2025-04-10",
      "vendorInfo": {
        "name": "XYZ Corporation",
        "email": "xyz.corporation@gmail.com",
        "phone": "5678901",
        "address": "#7041, Industrial Estate"
      },
      "breakdown": {
        "subtotal": 21000.00,
        "tax": 3780.00,
        "discount": 0.00,
        "total": 24780.00
      }
    },
    {
      "id": "INV-91",
      "vendor": "ABC Solutions",
      "amount": 17500,
      "status": "",
      "dueDate": "2025-04-15",
      "vendorInfo": {
        "name": "ABC Solutions",
        "email": "abc.solutions@gmail.com",
        "phone": "6789012",
        "address": "#7142, Service Sector"
      },
      "breakdown": {
        "subtotal": 17500.00,
        "tax": 3150.00,
        "discount": 0.00,
        "total": 20650.00
      }
    },
    {
      "id": "INV-92",
      "vendor": "DEF Technologies",
      "amount": 19500,
      "status": "",
      "dueDate": "2025-04-20",
      "vendorInfo": {
        "name": "DEF Technologies",
        "email": "def.tech@gmail.com",
        "phone": "7890123",
        "address": "#7243, Innovation Hub"
      },
      "breakdown": {
        "subtotal": 19500.00,
        "tax": 3510.00,
        "discount": 0.00,
        "total": 23010.00
      }
    },
    {
      "id": "INV-93",
      "vendor": "GHI Group",
      "amount": 22000,
      "status": "",
      "dueDate": "2025-04-25",
      "vendorInfo": {
        "name": "GHI Group",
        "email": "ghi.group@gmail.com",
        "phone": "8901234",
        "address": "#7344, Business Park"
      },
      "breakdown": {
        "subtotal": 22000.00,
        "tax": 3960.00,
        "discount": 0.00,
        "total": 25860.00
      }
    },
    {
      "id": "INV-94",
      "vendor": "JKL Enterprises",
      "amount": 18000,
      "status": "",
      "dueDate": "2025-04-30",
      "vendorInfo": {
        "name": "JKL Enterprises",
        "email": "jkl.enterprises@gmail.com",
        "phone": "9012345",
        "address": "#7445, Service Avenue"
      },
      "breakdown": {
        "subtotal": 18000.00,
        "tax": 3240.00,
        "discount": 0.00,
        "total": 21240.00
      }
    },
    {
      "id": "INV-95",
      "vendor": "MNO Solutions",
      "amount": 21000,
      "status": "",
      "dueDate": "2025-05-01",
      "vendorInfo": {
        "name": "MNO Solutions",
        "email": "mno.solutions@gmail.com",
        "phone": "0123456",
        "address": "#7546, Corporate Plaza"
      },
      "breakdown": {
        "subtotal": 21000.00,
        "tax": 3780.00,
        "discount": 0.00,
        "total": 24780.00
      }
    },
    {
      "id": "INV-96",
      "vendor": "PQR Technologies",
      "amount": 19500,
      "status": "",
      "dueDate": "2025-05-05",
      "vendorInfo": {
        "name": "PQR Technologies",
        "email": "pqr.tech@gmail.com",
        "phone": "1234567",
        "address": "#7647, Tech Hub"
      },
      "breakdown": {
        "subtotal": 19500.00,
        "tax": 3510.00,
        "discount": 0.00,
        "total": 23010.00
      }
    },
    {
      "id": "INV-97",
      "vendor": "STU Holdings",
      "amount": 22000,
      "status": "",
      "dueDate": "2025-05-10",
      "vendorInfo": {
        "name": "STU Holdings",
        "email": "stu.holdings@gmail.com",
        "phone": "2345678",
        "address": "#7748, Business District"
      },
      "breakdown": {
        "subtotal": 22000.00,
        "tax": 3960.00,
        "discount": 0.00,
        "total": 25860.00
      }
    },
    {
      "id": "INV-98",
      "vendor": "VWX Enterprises",
      "amount": 18000,
      "status": "",
      "dueDate": "2025-05-15",
      "vendorInfo": {
        "name": "VWX Enterprises",
        "email": "vwx.enterprises@gmail.com",
        "phone": "3456789",
        "address": "#7849, Service Lane"
      },
      "breakdown": {
        "subtotal": 18000.00,
        "tax": 3240.00,
        "discount": 0.00,
        "total": 21240.00
      }
    },
    {
      "id": "INV-99",
      "vendor": "XYZ Corporation",
      "amount": 21000,
      "status": "",
      "dueDate": "2025-05-20",
      "vendorInfo": {
        "name": "XYZ Corporation",
        "email": "xyz.corporation@gmail.com",
        "phone": "4567890",
        "address": "#7940, Industrial Estate"
      },
      "breakdown": {
        "subtotal": 21000.00,
        "tax": 3780.00,
        "discount": 0.00,
        "total": 24780.00
      }
    },
    {
      id: 'INV-100',
      vendor: 'STU',
      amount: 5000,
      status: '',
      dueDate: '2024-12-01',
      vendorInfo: {
        name: 'STU Technologies',
        email: 'stu@gmail',
        phone: '3456789',
        address: '#101, Innovation Hub'
      },
      breakdown: {
        subtotal: 5000.00,
        tax: 900.00,
        discount: 0.00,
        total: 5900.00
      }
    }
  ];