export type Translations = Record<TKeys, string>;
export const GLOBAL_LANGUAGE = 'global.language';

export enum TKeys {
    IMMUNIZATION_INTRODUCTION =' الاستهلال بالصلاة الإبراهيمية صباحا ومساء، كذلك الذكر من القرآن الكريم يتكرر مرتين في اليوم، كل صباح ومساء دون تغيير، ويعقبه الذكر من السنة النبوية وفيه بعض التغييرات بين الصباح والمساء. ',

    IMMUNIZATION_MORNING_1 = ' «اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ، وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ، وَبَارِكْ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ، وَعَلَى آلِ إِبْرَاهِيمَ، فِي الْعَالَمِينَ إِنَّكَ حَمِيدٌ مَجِيدٌ» .  ',
    IMMUNIZATION_MORNING_1_ND = 'عشر مرات',
    IMMUNIZATION_MORNING_2 = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيـــمِ، الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ، الرَّحْمَٰنِ الرَّحِيمِ، مَالِكِ يَوْمِ الدِّيــنِ، إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِين ، اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ، صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ، آمين.',
    IMMUNIZATION_MORNING_2_ND = 'مرة واحدة',
    IMMUNIZATION_MORNING_3 = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيم، الٓـمٓ ذَٰلِكَ ٱلۡكِتَٰبُ لَارَيۡبَۛ فِيهِۛ هُدٗى لِّلۡمُتَّقِينَ،.ٱلَّذِينَ يُؤۡمِنُونَ بِٱلۡغَيۡبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقۡنَٰهُمۡ يُنفِقُونَ، وَٱلَّذِينَ يُؤۡمِنُونَ بِمَآ أُنزِلَ إِلَيۡكَ وَمَآ أُنزِلَ مِن قَبۡلِكَ وَبِٱلۡأٓخِرَةِ هُمۡ يُوقِنُونَ، أُوْلَٰٓئِكَ عَلَىٰ هُدٗى مِّن رَّبِّهِمۡۖ، وأولئك هُمُ ٱلۡمُفۡلِحُونَ',
    IMMUNIZATION_MORNING_3_ND = 'مرة واحدة',
    IMMUNIZATION_MORNING_4 = 'ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلۡحَيُّ ٱلۡقَيُّومُۚ لَا تَأۡخُذُهُۥ سِنَةٞ وَلَا نَوۡمٞۚ لَّهُۥ مَا فِي ٱلسَّمَٰوَٰتِ وَمَا فِي ٱلۡأَرۡضِۗ مَن ذَا ٱلَّذِي يَشۡفَعُ عِندَهُۥٓ إِلَّا بِإِذۡنِهِۦۚ يَعۡلَمُ مَا بَيۡنَ أَيۡدِيهِمۡ وَمَا خَلۡفَهُمۡۖ وَلَا يُحِيطُونَ بِشَيۡءٖ مِّنۡ عِلۡمِهِۦٓ إِلَّا بِمَا شَآءَۚ وَسِعَ كُرۡسِيُّهُ ٱلسَّمَٰوَٰتِ وَٱلۡأَرۡضَۖ وَلَا يَـُٔودُهُۥ حِفۡظُهُمَاۚ وَهُوَ ٱلۡعَلِيُّ ٱلۡعَظِيمُ ، لَآ إِكۡرَاهَ فِي ٱلدِّينِۖ قَد تَّبَيَّنَ ٱلرُّشۡدُ مِنَ ٱلۡغَيِّۚ فَمَن يَكۡفُرۡ بِٱلطَّٰغُوتِ وَيُؤۡمِنۢ بِٱللَّهِ فَقَدِ ٱسۡتَمۡسَكَ بِٱلۡعُرۡوَةِ ٱلۡوُثۡقَىٰ لَاٱنفِصَامَ لَهَاۗ وَٱللَّهُ سَمِيعٌ عَلِيمٌ ، ٱللَّهُ وَلِيُّ ٱلَّذِينَ ءَامَنُواْ يُخۡرِجُهُم مِّنَ ٱلظُّلُمَٰتِ إِلَى ٱلنُّورِۖ وَٱلَّذِينَ كَفَرُوٓاْ أَوۡلِيَآؤُهُمُ ٱلطَّٰغُوتُ يُخۡرِجُونَهُم مِّنَ ٱلنُّورِ إِلَى ٱلظُّلُمَٰتِۗ أُوْلَٰٓئِكَ أَصۡحَٰبُ ٱلنَّارِۖ هُمۡ فِيهَا خَٰلِدُونَ ',
    IMMUNIZATION_MORNING_4_ND = 'مرة واحدة',
    IMMUNIZATION_MORNING_5 = 'لِّلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ وَإِن تُبْدُوا مَا فِي أَنفُسِكُمْ أَوْ تُخْفُوهُ يُحَاسِبْكُم بِهِ اللَّهُ ۖ فَيَغْفِرُ لِمَن يَشَاءُ وَيُعَذِّبُ مَن يَشَاءُ ۗ وَاللَّهُ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ،  آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ  كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ، وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ، لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
    IMMUNIZATION_MORNING_5_ND = 'مرة واحدة',
    IMMUNIZATION_MORNING_6 = 'شَهِدَ اللَّهُ أَنَّهُ لَا إِلَٰهَ إِلَّا هُوَ وَالْمَلَائِكَةُ وَأُولُو الْعِلْمِ قَائِمًا بِالْقِسْطِ ۚ لَا إِلَٰهَ إِلَّا هُوَ الْعَزِيزُ الْحَكِيمُ، إِنَّ الدِّينَ عِندَ اللَّهِ الْإِسْلَامُ',
    IMMUNIZATION_MORNING_6_ND = 'مرة واحدة',
    IMMUNIZATION_MORNING_7 = ' حَسْبِيَ اللَّهُ لا إِلَهَ إِلا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ  ',
    IMMUNIZATION_MORNING_7_ND = 'سبع مرات',
    IMMUNIZATION_MORNING_8 = 'قُلِ ادْعُوا اللَّهَ أَوِ ادْعُوا الرَّحْمَٰنَ ۖ أَيًّا مَّا تَدْعُوا فَلَهُ الْأَسْمَاءُ الْحُسْنَىٰ ۚ وَلَا تَجْهَرْ بِصَلَاتِكَ وَلَا تُخَافِتْ بِهَا وَابْتَغِ بَيْنَ ذَٰلِكَ سَبِيلًا، وَقُلِ الْحَمْدُ لِلَّهِ الَّذِي لَمْ يَتَّخِذْ وَلَدًا وَلَمْ يَكُن لَّهُ شَرِيكٌ فِي الْمُلْكِ وَلَمْ يَكُن لَّهُ وَلِيٌّ مِّنَ الذُّلِّ ۖ وَكَبِّرْهُ تَكْبِيرًا',
    IMMUNIZATION_MORNING_8_ND = 'ثلاث مرات',
    IMMUNIZATION_MORNING_9 = 'أَفَحَسِبْتُمْ أَنَّمَا خَلَقْنَاكُمْ عَبَثًا وَأَنَّكُمْ إِلَيْنَا لَا تُرْجَعُونَ، فَتَعَالَى اللَّهُ الْمَلِكُ الْحَقُّ ۖ لَا إِلَٰهَ إِلَّا هُوَ رَبُّ الْعَرْشِ الْكَرِيمِ، وَمَن يَدْعُ مَعَ اللَّهِ إِلَٰهًا آخَرَ لَا بُرْهَانَ لَهُ بِهِ فَإِنَّمَا حِسَابُهُ عِندَ رَبِّهِ ۚ إِنَّهُ لَا يُفْلِحُ الْكَافِرُونَ، وَقُل رَّبِّ اغْفِرْ وَارْحَمْ وَأَنتَ خَيْرُ الرَّاحِمِينَ',
    IMMUNIZATION_MORNING_9_ND = 'مرة واحدة',
    IMMUNIZATION_MORNING_10 = 'فَسُبْحَانَ اللَّهِ حِينَ تُمْسُونَ وَحِينَ تُصْبِحُونَ، وَلَهُ الْحَمْدُ فِي السَّمَاوَاتِ وَالْأَرْضِ وَعَشِيًّا وَحِينَ تُظْهِرُونَ، يُخْرِجُ الْحَيَّ مِنَ الْمَيِّتِ وَيُخْرِجُ الْمَيِّتَ مِنَ الْحَيِّ وَيُحْيِي الْأَرْضَ بَعْدَ مَوْتِهَا ۚ وَكَذَٰلِكَ تُخْرَجُونَ',
    IMMUNIZATION_MORNING_10_ND = 'ثلاث مرات',
    IMMUNIZATION_MORNING_11 = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ، حم، تَنزِيلُ الْكِتَابِ مِنَ اللَّهِ الْعَزِيزِ الْعَلِيمِ، غَافِرِ الذَّنبِ وَقَابِلِ التَّوْبِ شَدِيدِ الْعِقَابِ ذِي الطَّوْلِ ۖ لَا إِلَٰهَ إِلَّا هُوَ ۖ إِلَيْهِ الْمَصِيرُ',
    IMMUNIZATION_MORNING_11_ND = 'ثلاث مرات',
    IMMUNIZATION_MORNING_12 = 'اللّهُ لاَ إِلَـهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيم',
    IMMUNIZATION_MORNING_12_ND = 'مرة واحدة',
    IMMUNIZATION_MORNING_13 ='أَعُوذُ بِاللهِ السَّمِيعِ العَلِيمِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
    IMMUNIZATION_MORNING_13_ND = 'ثلاث مرات',
    IMMUNIZATION_MORNING_14 = 'هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ ۖ عَالِمُ الْغَيْبِ وَالشَّهَادَةِ ۖ هُوَ الرَّحْمَٰنُ الرَّحِيمُ، هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْمَلِكُ الْقُدُّوسُ السَّلَامُ الْمُؤْمِنُ الْمُهَيْمِنُ الْعَزِيزُ الْجَبَّارُ الْمُتَكَبِّرُ ۚ سُبْحَانَ اللَّهِ عَمَّا يُشْرِكُونَ، هُوَ اللَّهُ الْخَالِقُ الْبَارِئُ الْمُصَوِّرُ ۖ لَهُ الْأَسْمَاءُ الْحُسْنَىٰ ۚ يُسَبِّحُ لَهُ مَا فِي السَّمَاوَاتِ وَالْأَرْضِ ۖ وَهُوَ الْعَزِيزُ الْحَكِيمُ',
    IMMUNIZATION_MORNING_14_ND = 'مرة واحدة',
    IMMUNIZATION_MORNING_15 = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ، قُلْ هُوَ اللَّهُ أَحَدٌ، اللَّهُ الصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُ كُفُوًا أَحَد  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ، قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ، قُلْ أَعُوذُ بِرَبِّ النَّاسِ، مَلِكِ النَّاسِ، إِلَٰهِ النَّاسِ، مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ، الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ، مِنَ الْجِنَّةِ وَالنَّاسِ ',    
    IMMUNIZATION_MORNING_15_ND = 'ثلاث مرات بتتابع',
    IMMUNIZATION_MORNING_16 = 'رَضِيتُ بِاللهِ رَبًّا، وَبِالإِسْلاَمِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
    IMMUNIZATION_MORNING_16_ND = 'ثلاث مرات',
    IMMUNIZATION_MORNING_17 = 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ ',
    IMMUNIZATION_MORNING_17_ND = 'ثلاث مرات',
    IMMUNIZATION_MORNING_18 = 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، عَلَيْكَ تَوَكَّلْتُ، وَأَنْتَ رَبُّ الْعَرْشِ الْعَظِيمِ، مَا شَاءَ اللهُ كَانَ وَمَا لَمْ يَشَأْ لَمْ يَكُنْ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ، أَعْلَمُ أَنَّ اللَّهَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، وَأَنَّ اللَّهَ قَدْ أَحَاطَ بِكُلِّ شَيْءٍ عِلْمًا، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ كُلِّ دَابَّةٍ أَنْتَ آخِذٌ بِنَاصِيَتِهَا، إِنَّ رَبِّي عَلَى صِرَاطٍ مُسْتَقِيمٍ ',
    IMMUNIZATION_MORNING_18_ND = 'مرة واحدة',
    IMMUNIZATION_MORNING_19 = 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ،  لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِير، ٌرَبِّ إنِّي أَسْأَلُكَ خَيْرَ مَا فِي هَذِاِ اليَوم وَخَيْرَ مَا بَعْدَهُ وَأَعُوذُ بِكَ مِنْ شَرِّ هَذِاِ اليَوم وَشَرِّ مَا بَعْدَهُ. رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ. رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
    IMMUNIZATION_MORNING_19_ND = 'ثلاث مرات',
    IMMUNIZATION_MORNING_20 = 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ رَبِّ الْعَالَمِينَ،  اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذَا الْيَوْمِ فَتَحَهُ، وَنَصْرَهُ، وَنُورَهُ، وَبَرَكَتَهُ، وَهُدَاهُ،  وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِيهِ، وَشَرِّ مَا قَبْلَهُ، وَشَرِّ مَا بَعْدَهُ',
    IMMUNIZATION_MORNING_20_ND = 'ثلاث مرات',
    IMMUNIZATION_MORNING_21 = 'اللهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
    IMMUNIZATION_MORNING_21_ND = 'ثلاث مرات', 
    IMMUNIZATION_MORNING_22 = 'اللهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ، فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ',
    IMMUNIZATION_MORNING_22_ND = 'ثلاث مرات ',
    IMMUNIZATION_MORNING_23 = 'اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ وَمَلَائِكَتَكَ، وَجَمِيعَ خَلْقِكَ أَنَّكَ أَنْتَ اللَّهُ لا إله إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ ',
    IMMUNIZATION_MORNING_23_ND = 'أربع مرات',
    IMMUNIZATION_MORNING_24 = 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي، وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي، وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي',
    IMMUNIZATION_MORNING_24_ND = 'ثلاث مرات',
    IMMUNIZATION_MORNING_25 = 'اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلَّا أَنْت ، خَلَقْتَنِي وَأَنَا عَبْدُكَ ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي ، فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    IMMUNIZATION_MORNING_25_ND = 'ثلاث مرات',
    IMMUNIZATION_MORNING_26 = 'أَصْبَحْنا عَلَى فِطْرَةِ الإسْلاَمِ، وَعَلَى كَلِمَةِ الإِخْلاَصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إبْرَاهِيمَ حَنِيفاً مُسْلِماً وَمَا كَانَ مِنَ المُشْرِكِينَ',
    IMMUNIZATION_MORNING_26_ND = 'ثلاث مرات',
    IMMUNIZATION_MORNING_27 = 'اللَّهُمَّ إِنِّي أَصْبَحْتُ مِنْكَ فِي نِعْمَةٍ وَعَافِيَةٍ وَسِتْر،  فَأَتِمَّ عَلَيَّ نِعْمَتَكَ وَعَافِيَتَكَ وَسِتْرَكَ فِي الدُّنْيَا وَالآخِرَةِ',
    IMMUNIZATION_MORNING_27_ND = 'ثلاث مرات ',
    IMMUNIZATION_MORNING_28 = 'اللَّهُمَّ فَاطِرَ السَّمَوَاتِ وَالْأَرْضِ ، عَالِمَ الْغَيْبِ وَالشَّهَادَةِ ، لَا إِلَهَ إِلَّا أَنْتَ رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي ، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءًا أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ',
    IMMUNIZATION_MORNING_28_ND = 'ثلاث مرات',
    IMMUNIZATION_MORNING_29 = 'سُبْحَانَ اللهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ وَرِضَا نَفْسِهِ وَزِنَةَ عَرْشِهِ وَمِدَادَ كَلِمَاتِهِ',
    IMMUNIZATION_MORNING_29_ND = 'ثلاث مرات ',
    IMMUNIZATION_MORNING_30 = 'يَا رَبِّ لَكَ الْحَمْدُ كَمَا يَنْبَغِي لِجَلالِ وَجْهِكَ وَلِعَظِيمِ سُلْطَانِكَ',
    IMMUNIZATION_MORNING_30_ND = 'ثلاث مرات',
    IMMUNIZATION_MORNING_31 = 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ ،  وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ',
    IMMUNIZATION_MORNING_31_ND = 'ثلاث مرات',
    IMMUNIZATION_MORNING_32 = 'سُبْحَانَكَ اللَّهُمَّ وبَحَمْدكَ أشْهدُ أنْ لا إلهَ إلا أنْتَ أَسْتَغْفِرُكَ وأتُوبُ إِلَيْكَ',
    IMMUNIZATION_MORNING_32_ND = 'ثلاث مرات',
    IMMUNIZATION_MORNING_33 = 'اللهُمَّ عَافِنِي فِي بَدَنِي، اللهُمَّ عَافِنِي فِي سَمْعِي، اللهُمَّ عَافِنِي فِي بَصَرِي، لاَ إِلَهَ إِلاَّ أَنْتَ',
    IMMUNIZATION_MORNING_33_ND = 'ثلاث مرات ',
    IMMUNIZATION_MORNING_34 = 'اللهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، اللهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لاَ إِلَهَ إِلاَّ أَنْتَ',
    IMMUNIZATION_MORNING_34_ND = 'ثلاث مرات ',
    IMMUNIZATION_MORNING_35 = 'اللَّهُمَّ أَلْهِمْنِي رُشْدِي، وَأَعِذْنِي مِنْ شَرِّ نَفْسِي',
    IMMUNIZATION_MORNING_35_ND = 'ثلاث مرات ',
    IMMUNIZATION_MORNING_36 = 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنْ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنْ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ، وَقَهْرِ الرِّجَالِ',
    IMMUNIZATION_MORNING_36_ND = 'ثلاث مرات ',
    IMMUNIZATION_MORNING_37 = 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أُشْرِكَ بِكَ وَأَنَا أَعْلَمُ، وَأَسْتَغْفِرُكَ لما لا أَعْلَمُ ',
    IMMUNIZATION_MORNING_37_ND = 'ثلاث مرات',
    IMMUNIZATION_MORNING_38 = 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أُشْرِكَ بِكَ وَأَنَا أَعْلَمُ، وَأَسْتَغْفِرُكَ لما لا أَعْلَمُ',
    IMMUNIZATION_MORNING_38_ND = 'ثلاث مرات ',
    IMMUNIZATION_MORNING_39 = 'سُبْحَانَ اللَّهِ الْعَظِيمِ وَبِحَمْدِهِ، وَلا حَوْلَ وَلا قُوَّةَ إِلا بِاللَّهِ',
    IMMUNIZATION_MORNING_39_ND = 'ثلاث مرات ',
    IMMUNIZATION_MORNING_40 = 'الله أكبر، الله أكبر، الله أكبر، بسم الله على نفسي وديني، بسم الله على كل شيء أعطانيه ربي، بسم الله خير الأسماء، بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء، بسم الله افتتحت وعلى الله توكلت، الله الله ربي لا أشرك به أحداً، أسألك اللهم بخيرك من خيرك الذي لا يعطيه أحد غيرك، عز جارك، وجل ثناؤك، ولا إله غيرك، اجعلني في عياذك من شر كل سلطان ومن الشيطان الرجيم، اللهم إني أحترس بك من شر جميع كل ذي شر خلقته، وأحترز بك منهم، وأقدم بين يدي بسم الله الرحمن الرحيم "قل هو الله أحد الله الصمد لم يلد ولم يولد ولم يكن له كفواً أحد" ومن خلفي مثل ذلك وعن يميني مثل ذلك وعن يساري مثل ذلك ومن فوقي مثل ذلك',
    IMMUNIZATION_MORNING_40_ND = 'مرة واحدة',
    IMMUNIZATION_MORNING_41 = 'اللهم صل على البادئ الخاتم والحامد صاحب المقام المحمود، سيدنا محمد الماد والممدود، والمحب المحبوب، وعلى آل بيته والأحباب، وسلم تسليما ',
    IMMUNIZATION_MORNING_41_ND = 'ثلاث مرات ',
    IMMUNIZATION_CONCLUSION = ' ثم تنفث في كفيك وتمرر على كل جسدك من الأعلى إلى الأسفل، ثم من الأمام إلى الخلف',


};
