//import ProgressLine from '../locales/dikrtype';

export type Day = 'monday' | 'tusday' | 'wednesday' | 'friday';

export const jawahirData: Record<Day, Record<string, string[]>> = {
  monday: {
    basmala: ['jawahir.monday.basmala.1', 'jawahir.monday.basmala.2', 'jawahir.monday.basmala.3'],
    haylala: ['jawahir.monday.haylala.1', 'jawahir.monday.haylala.2', 'jawahir.monday.haylala.3'],
  },
  tusday: {
    tasbih: ['jawahir.tusday.1', 'jawahir.tusday.2', 'jawahir.tusday.3'],
  },
  wednesday: {
    hawkala: ['jawahir.wednesday.1', 'jawahir.wednesday.2', 'jawahir.wednesday.3'],
  },
  friday: {
    hamd: ['jawahir.friday.1', 'jawahir.friday.2', 'jawahir.friday.3', 'jawahir.friday.4'],
    chokr: ['jawahir.friday.5', 'jawahir.friday.6', 'jawahir.friday.7', 'jawahir.friday.8'],
  },
};

export enum TKeys {
  jawahir_monday_basmala_1 = 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ، وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ، وَبَارِكْ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ، وَعَلَى آلِ إِبْرَاهِيمَ، فِي الْعَالَمِينَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
  jawahir_monday_basmala_2 = 'هذه الأذكار المحمدية أخذناها من مشايخنا مأذونة، ونحن نأذن فيها لطلبتنا ومريدينا، أو لمن نلمس فيه الحرص على النفع والاستفادة.',
  jawahir_monday_basmala_3 = '',
  jawahir_monday_basmala_4 = '',
  jawahir_monday_basmala_5 = '',
  jawahir_monday_basmala_6 = '',
  jawahir_monday_haylala_1 = '',
  jawahir_monday_haylala_2 = '',

  jawahir_tusday_1 = '',
  jawahir_tusday_2 = '',

  jawahir_friday_4 = '',
}
