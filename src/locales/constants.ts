export type Translations = Record<TKeys, string>;
export const GLOBAL_LANGUAGE = 'global.language';

export enum TKeys {
  WELCOME = 'welcome',
  APPLICATION_TITLE_PRIMARY = 'application.title.primary',
  APPLICATION_TITLE_SECONDARY = 'application.title.secondary',
  PRESENTATION_CENTER = 'home.presentation.center',
  BASMALAH = 'basmala',
  PHASE_1 = 'phase1',
  PHASE_2 = 'phase2',
  PHASE_3 = 'phase3',
  LEVEL = 'level',
  PURIFICATION_INTRODUCTION = 'purification.introduction',
  PURIFICATION_BODYPART_CLEANING = 'purification.bodypart.cleaning',
  PURIFICATION_BODYPART_ENLIGHTENMENT = 'purification.bodypart.enlightenment',
  PURIFICATION_BODYPART_TITLE = 'purification.bodypart.title',
  PURIFICATION_BODYPART_DESCRIPTION = 'purification.bodypart.description',
  PURIFICATION_MIND_TITLE = 'purification.mind.title',
  PURIFICATION_SOUL_TITLE = 'purification.soul.title',
  PURIFICATION_BODY_PARTS_EYE = 'purification.body-parts.eye',
  PURIFICATION_BODY_PARTS_HANDS = 'purification.body-parts.hands',
  PURIFICATION_BODY_PARTS_TONGUE = 'purification.body-parts.tongue',
  PURIFICATION_BODY_PARTS_EAR = 'purification.body-parts.ear',
  PURIFICATION_BODY_PARTS_BELLY = 'purification.body-parts.belly',
  PURIFICATION_BODY_PARTS_FEET = 'purification.body-parts.feet',
  PURIFICATION_BODY_PARTS_PRIVATE_PARTS = 'purification.body-parts.private-parts',

  PURIFICATION_BODYPART_ADD_PHASE = 'purification.bodypart.add.phase',
  PURIFICATION_BODYPART_CLEANING_PHASE = 'purification.bodypart.cleaning.phase',
  PURIFICATION_BODYPART_ENLIGHTENMENT_PHASE = 'purification.bodypart.enlightenment.phase',
  PURIFICATION_BODYPART_DISCIPLINARY_SYSTEM = 'cleaning.bodypart.disciplinary-system',
  PURIFICATION_BODYPART_POSITIVE_USAGE = 'enlightenment.bodypart.disciplinary-system',

  // Eye rules
  PURIFICATION_BODY_PARTS_EYE_CLEANING_RULE_1 = 'purification.body-parts.eye.cleaning.rule-1',
  PURIFICATION_BODY_PARTS_EYE_CLEANING_RULE_2 = 'purification.body-parts.eye.cleaning.rule-2',
  PURIFICATION_BODY_PARTS_EYE_CLEANING_RULE_3 = 'purification.body-parts.eye.cleaning.rule-3',
  PURIFICATION_BODY_PARTS_EYE_CLEANING_RULE_4 = 'purification.body-parts.eye.cleaning.rule-4',
  PURIFICATION_BODY_PARTS_EYE_CLEANING_RULE_5 = 'purification.body-parts.eye.cleaning.rule-5',
  PURIFICATION_BODY_PARTS_EYE_ENLIGHTENMENT_RULE_1 = 'purification.body-parts.eye.enlightenment.rule-1',
  PURIFICATION_BODY_PARTS_EYE_ENLIGHTENMENT_RULE_2 = 'purification.body-parts.eye.enlightenment.rule-2',
  PURIFICATION_BODY_PARTS_EYE_ENLIGHTENMENT_RULE_3 = 'purification.body-parts.eye.enlightenment.rule-3',
  PURIFICATION_BODY_PARTS_EYE_ENLIGHTENMENT_RULE_4 = 'purification.body-parts.eye.enlightenment.rule-4',
  PURIFICATION_BODY_PARTS_EYE_ENLIGHTENMENT_RULE_5 = 'purification.body-parts.eye.enlightenment.rule-5',
  PURIFICATION_BODY_PARTS_EYE_ENLIGHTENMENT_RULE_6 = 'purification.body-parts.eye.enlightenment.rule-6',

  // Hands rules
  PURIFICATION_BODY_PARTS_HANDS_CLEANING_RULE_1 = 'purification.body-parts.hands.cleaning.rule-1',
  PURIFICATION_BODY_PARTS_HANDS_CLEANING_RULE_2 = 'purification.body-parts.hands.cleaning.rule-2',
  PURIFICATION_BODY_PARTS_HANDS_CLEANING_RULE_3 = 'purification.body-parts.hands.cleaning.rule-3',
  PURIFICATION_BODY_PARTS_HANDS_CLEANING_RULE_4 = 'purification.body-parts.hands.cleaning.rule-4',
  PURIFICATION_BODY_PARTS_HANDS_CLEANING_RULE_5 = 'purification.body-parts.hands.cleaning.rule-5',
  PURIFICATION_BODY_PARTS_HANDS_CLEANING_RULE_6 = 'purification.body-parts.hands.cleaning.rule-6',
  PURIFICATION_BODY_PARTS_HANDS_ENLIGHTENMENT_RULE_1 = 'purification.body-parts.hands.enlightenment.rule-1',
  PURIFICATION_BODY_PARTS_HANDS_ENLIGHTENMENT_RULE_2 = 'purification.body-parts.hands.enlightenment.rule-2',
  PURIFICATION_BODY_PARTS_HANDS_ENLIGHTENMENT_RULE_3 = 'purification.body-parts.hands.enlightenment.rule-3',
  PURIFICATION_BODY_PARTS_HANDS_ENLIGHTENMENT_RULE_4 = 'purification.body-parts.hands.enlightenment.rule-4',
  PURIFICATION_BODY_PARTS_HANDS_ENLIGHTENMENT_RULE_5 = 'purification.body-parts.hands.enlightenment.rule-5',
  PURIFICATION_BODY_PARTS_HANDS_ENLIGHTENMENT_RULE_6 = 'purification.body-parts.hands.enlightenment.rule-6',

  // Tongue rules
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_1 = 'purification.body-parts.tongue.cleaning.rule-1',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_2 = 'purification.body-parts.tongue.cleaning.rule-2',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_3 = 'purification.body-parts.tongue.cleaning.rule-3',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_4 = 'purification.body-parts.tongue.cleaning.rule-4',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_5 = 'purification.body-parts.tongue.cleaning.rule-5',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_6 = 'purification.body-parts.tongue.cleaning.rule-6',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_7 = 'purification.body-parts.tongue.cleaning.rule-7',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_8 = 'purification.body-parts.tongue.cleaning.rule-8',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_9 = 'purification.body-parts.tongue.cleaning.rule-9',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_10 = 'purification.body-parts.tongue.cleaning.rule-10',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_11 = 'purification.body-parts.tongue.cleaning.rule-11',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_12 = 'purification.body-parts.tongue.cleaning.rule-12',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_13 = 'purification.body-parts.tongue.cleaning.rule-13',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_14 = 'purification.body-parts.tongue.cleaning.rule-14',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_15 = 'purification.body-parts.tongue.cleaning.rule-15',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_16 = 'purification.body-parts.tongue.cleaning.rule-16',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_17 = 'purification.body-parts.tongue.cleaning.rule-17',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_18 = 'purification.body-parts.tongue.cleaning.rule-18',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_19 = 'purification.body-parts.tongue.cleaning.rule-19',
  PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_20 = 'purification.body-parts.tongue.cleaning.rule-20',
  PURIFICATION_BODY_PARTS_TONGUE_ENLIGHTENMENT_RULE_1 = 'purification.body-parts.tongue.enlightenment.rule-1',
  PURIFICATION_BODY_PARTS_TONGUE_ENLIGHTENMENT_RULE_2 = 'purification.body-parts.tongue.enlightenment.rule-2',
  PURIFICATION_BODY_PARTS_TONGUE_ENLIGHTENMENT_RULE_3 = 'purification.body-parts.tongue.enlightenment.rule-3',
  PURIFICATION_BODY_PARTS_TONGUE_ENLIGHTENMENT_RULE_4 = 'purification.body-parts.tongue.enlightenment.rule-4',
  PURIFICATION_BODY_PARTS_TONGUE_ENLIGHTENMENT_RULE_5 = 'purification.body-parts.tongue.enlightenment.rule-5',
  PURIFICATION_BODY_PARTS_TONGUE_ENLIGHTENMENT_RULE_6 = 'purification.body-parts.tongue.enlightenment.rule-6',

  // Ear rules
  PURIFICATION_BODY_PARTS_EAR_CLEANING_RULE_1 = 'purification.body-parts.ear.cleaning.rule-1',
  PURIFICATION_BODY_PARTS_EAR_CLEANING_RULE_2 = 'purification.body-parts.ear.cleaning.rule-2',
  PURIFICATION_BODY_PARTS_EAR_CLEANING_RULE_3 = 'purification.body-parts.ear.cleaning.rule-3',
  PURIFICATION_BODY_PARTS_EAR_CLEANING_RULE_4 = 'purification.body-parts.ear.cleaning.rule-4',
  PURIFICATION_BODY_PARTS_EAR_ENLIGHTENMENT_RULE_1 = 'purification.body-parts.ear.enlightenment.rule-1',
  PURIFICATION_BODY_PARTS_EAR_ENLIGHTENMENT_RULE_2 = 'purification.body-parts.ear.enlightenment.rule-2',
  PURIFICATION_BODY_PARTS_EAR_ENLIGHTENMENT_RULE_3 = 'purification.body-parts.ear.enlightenment.rule-3',
  PURIFICATION_BODY_PARTS_EAR_ENLIGHTENMENT_RULE_4 = 'purification.body-parts.ear.enlightenment.rule-4',

  // Belly rules
  PURIFICATION_BODY_PARTS_BELLY_CLEANING_RULE_1 = 'purification.body-parts.belly.cleaning.rule-1',
  PURIFICATION_BODY_PARTS_BELLY_CLEANING_RULE_2 = 'purification.body-parts.belly.cleaning.rule-2',
  PURIFICATION_BODY_PARTS_BELLY_CLEANING_RULE_3 = 'purification.body-parts.belly.cleaning.rule-3',
  PURIFICATION_BODY_PARTS_BELLY_CLEANING_RULE_4 = 'purification.body-parts.belly.cleaning.rule-4',
  PURIFICATION_BODY_PARTS_BELLY_ENLIGHTENMENT_RULE_1 = 'purification.body-parts.belly.enlightenment.rule-1',
  PURIFICATION_BODY_PARTS_BELLY_ENLIGHTENMENT_RULE_2 = 'purification.body-parts.belly.enlightenment.rule-2',
  PURIFICATION_BODY_PARTS_BELLY_ENLIGHTENMENT_RULE_3 = 'purification.body-parts.belly.enlightenment.rule-3',
  PURIFICATION_BODY_PARTS_BELLY_ENLIGHTENMENT_RULE_4 = 'purification.body-parts.belly.enlightenment.rule-4',
  PURIFICATION_BODY_PARTS_BELLY_ENLIGHTENMENT_RULE_5 = 'purification.body-parts.belly.enlightenment.rule-5',
  PURIFICATION_BODY_PARTS_BELLY_ENLIGHTENMENT_RULE_6 = 'purification.body-parts.belly.enlightenment.rule-6',

  // Feet rules
  PURIFICATION_BODY_PARTS_FEET_CLEANING_RULE_1 = 'purification.body-parts.feet.cleaning.rule-1',
  PURIFICATION_BODY_PARTS_FEET_CLEANING_RULE_2 = 'purification.body-parts.feet.cleaning.rule-2',
  PURIFICATION_BODY_PARTS_FEET_CLEANING_RULE_3 = 'purification.body-parts.feet.cleaning.rule-3',
  PURIFICATION_BODY_PARTS_FEET_CLEANING_RULE_4 = 'purification.body-parts.feet.cleaning.rule-4',
  PURIFICATION_BODY_PARTS_FEET_CLEANING_RULE_5 = 'purification.body-parts.feet.cleaning.rule-5',
  PURIFICATION_BODY_PARTS_FEET_ENLIGHTENMENT_RULE_1 = 'purification.body-parts.feet.enlightenment.rule-1',
  PURIFICATION_BODY_PARTS_FEET_ENLIGHTENMENT_RULE_2 = 'purification.body-parts.feet.enlightenment.rule-2',
  PURIFICATION_BODY_PARTS_FEET_ENLIGHTENMENT_RULE_3 = 'purification.body-parts.feet.enlightenment.rule-3',
  PURIFICATION_BODY_PARTS_FEET_ENLIGHTENMENT_RULE_4 = 'purification.body-parts.feet.enlightenment.rule-4',
  PURIFICATION_BODY_PARTS_FEET_ENLIGHTENMENT_RULE_5 = 'purification.body-parts.feet.enlightenment.rule-5',

  // Private parts
  PURIFICATION_BODY_PARTS_PRIVATE_PARTS_CLEANING_RULE_1 = 'purification.body-parts.private-parts.cleaning.rule-1',
  PURIFICATION_BODY_PARTS_PRIVATE_PARTS_CLEANING_RULE_2 = 'purification.body-parts.private-parts.cleaning.rule-2',
  PURIFICATION_BODY_PARTS_PRIVATE_PARTS_CLEANING_RULE_3 = 'purification.body-parts.private-parts.cleaning.rule-3',
  PURIFICATION_BODY_PARTS_PRIVATE_PARTS_CLEANING_RULE_4 = 'purification.body-parts.private-parts.cleaning.rule-4',
  PURIFICATION_BODY_PARTS_PRIVATE_PARTS_CLEANING_RULE_5 = 'purification.body-parts.private-parts.cleaning.rule-5',
  PURIFICATION_BODY_PARTS_PRIVATE_PARTS_CLEANING_RULE_6 = 'purification.body-parts.private-parts.cleaning.rule-6',
  PURIFICATION_BODY_PARTS_PRIVATE_PARTS_CLEANING_RULE_7 = 'purification.body-parts.private-parts.cleaning.rule-7',
  PURIFICATION_BODY_PARTS_PRIVATE_PARTS_ENLIGHTENMENT_RULE_1 = 'purification.body-parts.private-parts.enlightenment.rule-1',
  PURIFICATION_BODY_PARTS_PRIVATE_PARTS_ENLIGHTENMENT_RULE_2 = 'purification.body-parts.private-parts.enlightenment.rule-2',
  PURIFICATION_BODY_PARTS_PRIVATE_PARTS_ENLIGHTENMENT_RULE_3 = 'purification.body-parts.private-parts.enlightenment.rule-3',
  PURIFICATION_BODY_PARTS_PRIVATE_PARTS_ENLIGHTENMENT_RULE_4 = 'purification.body-parts.private-parts.enlightenment.rule-4',
  PURIFICATION_BODY_PARTS_PRIVATE_PARTS_ENLIGHTENMENT_RULE_5 = 'purification.body-parts.private-parts.enlightenment.rule-5',
  PURIFICATION_BODY_PARTS_PRIVATE_PARTS_ENLIGHTENMENT_RULE_6 = 'purification.body-parts.private-parts.enlightenment.rule-6',

  // Mind purification
  PURIFICATION_MIND_SUMMARY_LEVEL_1 = 'purification.mind.summary.level-1',
  PURIFICATION_MIND_SUMMARY_LEVEL_2 = 'purification.mind.summary.level-2',
  PURIFICATION_MIND_SUMMARY_LEVEL_3 = 'purification.mind.summary.level-3',
  PURIFICATION_MIND_SUMMARY_LEVEL_4 = 'purification.mind.summary.level-4',
  PURIFICATION_MIND_SUMMARY_LEVEL_5 = 'purification.mind.summary.level-5',
  PURIFICATION_MIND_SUMMARY_LEVEL_6 = 'purification.mind.summary.level-6',
  PURIFICATION_MIND_SUMMARY_LEVEL_7 = 'purification.mind.summary.level-7',
  PURIFICATION_MIND_SUMMARY_LEVEL_8 = 'purification.mind.summary.level-8',
  PURIFICATION_MIND_SUMMARY_LEVEL_9 = 'purification.mind.summary.level-9',
  PURIFICATION_MIND_DESCRIPTION_LEVEL_1 = 'purification.mind.description.level-1',
  PURIFICATION_MIND_DESCRIPTION_LEVEL_2 = 'purification.mind.description.level-2',
  PURIFICATION_MIND_DESCRIPTION_LEVEL_3 = 'purification.mind.description.level-3',
  PURIFICATION_MIND_DESCRIPTION_LEVEL_4 = 'purification.mind.description.level-4',
  PURIFICATION_MIND_DESCRIPTION_LEVEL_5 = 'purification.mind.description.level-5',
  PURIFICATION_MIND_DESCRIPTION_LEVEL_6 = 'purification.mind.description.level-6',
  PURIFICATION_MIND_DESCRIPTION_LEVEL_7 = 'purification.mind.description.level-7',
  PURIFICATION_MIND_DESCRIPTION_LEVEL_8 = 'purification.mind.description.level-8',
  PURIFICATION_MIND_DESCRIPTION_LEVEL_9 = 'purification.mind.description.level-9',

  SUNNAHS_DESCRIPTION = 'sunnahs.description',
  SUNNAHS_INTRODUTION = 'sunnahs.introdution',
  SUNNAHS_TYPE_VERBAL = 'sunnahs.type.verbal',
  SUNNAHS_TYPE_ACTIONAL = 'sunnahs.type.actional',

  SUNNAHS_INTRODUTION_RULE_1 = 'sunnahs.introdution.rule1',
  SUNNAHS_INTRODUTION_RULE_2 = 'sunnahs.introdution.rule2',
  SUNNAHS_INTRODUTION_RULE_3 = 'sunnahs.introdution.rule3',
  SUNNAHS_INTRODUTION_RULE_4 = 'sunnahs.introdution.rule4',
  SUNNAHS_HABITS_TITLE = 'sunnahs.habits.title',
  SUNNAHS_WORSHIP_TITLE = 'sunnahs.worship.title',
  SUNNAHS_TRUTHS_TITLE = 'sunnahs.truths.title',

  // Habits sunnahs
  SUNNAHS_HABITS_INTRODUCTION = 'sunnahs.habits.introduction',
  SUNNAHS_HABITS_1_TITLE = 'sunnahs.habits.1.title',
  SUNNAHS_HABITS_1_VERBAL_RULE_1 = 'sunnahs.habits.1.verbal.rule1',
  SUNNAHS_HABITS_1_VERBAL_RULE_2 = 'sunnahs.habits.1.verbal.rule2',
  SUNNAHS_HABITS_1_VERBAL_RULE_3 = 'sunnahs.habits.1.verbal.rule3',

  SUNNAHS_HABITS_2_TITLE = 'sunnahs.habits.2.title',
  SUNNAHS_HABITS_2_VERBAL_RULE_1 = 'sunnahs.habits.2.verbal.rule1',

  SUNNAHS_HABITS_3_TITLE = 'sunnahs.habits.3.title',
  SUNNAHS_HABITS_3_VERBAL_RULE_1 = 'sunnahs.habits.3.verbal.rule1',

  SUNNAHS_HABITS_4_TITLE = 'sunnahs.habits.4.title',
  SUNNAHS_HABITS_4_VERBAL_RULE_1 = 'sunnahs.habits.4.verbal.rule1',
  

   SUNNAHS_HABITS_5_TITLE ='sunnahs.habits.5.title',
  SUNNAHS_HABITS_5_VERBAL_RULE_1 = 'sunnahs.habits.5.verbal.rule1',
  SUNNAHS_HABITS_5_ACTIONAL_RULE_1 = 'sunnahs.habits.5.actional.rule1',

  SUNNAHS_HABITS_6_TITLE ='sunnahs.habits.6.title',
  SUNNAHS_HABITS_6_VERBAL_RULE_1 = 'sunnahs.habits.6.verbal.rule1',
  SUNNAHS_HABITS_6_ACTIONAL_RULE_1 = 'sunnahs.habits.6.actional.rule1',

  
  SUNNAHS_HABITS_7_TITLE ='sunnahs.habits.7.title',
  SUNNAHS_HABITS_7_VERBAL_RULE_1 = 'sunnahs.habits.7.verbal.rule1',
  SUNNAHS_HABITS_7_VERBAL_RULE_2 = 'sunnahs.habits.7.verbal.rule2',
  SUNNAHS_HABITS_7_VERBAL_RULE_3 = 'sunnahs.habits.7.verbal.rule3',
  SUNNAHS_HABITS_7_ACTIONAL_RULE_1 = 'sunnahs.habits.7.actional.rule1',

  SUNNAHS_HABITS_8_TITLE ='sunnahs.habits.8.title',
  SUNNAHS_HABITS_8_VERBAL_RULE_1 = 'sunnahs.habits.8.verbal.rule1',
  SUNNAHS_HABITS_8_ACTIONAL_RULE_1 = 'sunnahs.habits.8.actional.rule1',

  SUNNAHS_HABITS_9_TITLE ='sunnahs.habits.9.title',
  SUNNAHS_HABITS_9_VERBAL_RULE_1 = 'sunnahs.habits.9.verbal.rule1',
  SUNNAHS_HABITS_9_ACTIONAL_RULE_1 = 'sunnahs.habits.9.actional.rule1',
  SUNNAHS_HABITS_9_ACTIONAL_RULE_2 = 'sunnahs.habits.9.actional.rule2',
  SUNNAHS_HABITS_9_ACTIONAL_RULE_3 = 'sunnahs.habits.9.actional.rule3',

  SUNNAHS_HABITS_10_TITLE ='sunnahs.habits.10.title',
  SUNNAHS_HABITS_10_VERBAL_RULE_1 = 'sunnahs.habits.10.verbal.rule1',
  SUNNAHS_HABITS_10_ACTIONAL_RULE_1 = 'sunnahs.habits.10.actional.rule1',

  SUNNAHS_HABITS_11_TITLE ='sunnahs.habits.11.title',
  SUNNAHS_HABITS_11_VERBAL_RULE_1 = 'sunnahs.habits.11.verbal.rule1',
  SUNNAHS_HABITS_11_ACTIONAL_RULE_1 = 'sunnahs.habits.11.actional.rule1',

  SUNNAHS_HABITS_12_TITLE ='sunnahs.habits.12.title',
  SUNNAHS_HABITS_12_VERBAL_RULE_1 = 'sunnahs.habits.12.verbal.rule1',
  SUNNAHS_HABITS_12_ACTIONAL_RULE_1 = 'sunnahs.habits.12.actional.rule1',

  SUNNAHS_HABITS_13_TITLE ='sunnahs.habits.13.title',
  SUNNAHS_HABITS_13_VERBAL_RULE_1 = 'sunnahs.habits.13.verbal.rule1',
  SUNNAHS_HABITS_13_ACTIONAL_RULE_1 = 'sunnahs.habits.13.actional.rule1',

  SUNNAHS_HABITS_14_TITLE ='sunnahs.habits.14.title',
  SUNNAHS_HABITS_14_VERBAL_RULE_1 = 'sunnahs.habits.14.verbal.rule1',
  SUNNAHS_HABITS_14_ACTIONAL_RULE_1 = 'sunnahs.habits.14.actional.rule1',


  


  // worship sunnahs
  SUNNAHS_worship_INTRODUCTION = 'sunnahs.worship.introduction',
  SUNNAHS_worship_1_TITLE = 'sunnahs.worship.1.title',
  SUNNAHS_worship_1_VERBAL_RULE_1 = 'sunnahs.worship.1.verbal.rule1',
  SUNNAHS_worship_1_VERBAL_RULE_2 = 'sunnahs.worship.1.verbal.rule2',
  SUNNAHS_worship_1_VERBAL_RULE_3 = 'sunnahs.worship.1.verbal.rule3',
  SUNNAHS_worship_1_VERBAL_RULE_4 = 'sunnahs.worship.1.verbal.rule4',
  SUNNAHS_worship_1_VERBAL_RULE_5 = 'sunnahs.worship.1.verbal.rule5',
  SUNNAHS_worship_1_VERBAL_RULE_6 = 'sunnahs.worship.1.verbal.rule6',
  SUNNAHS_worship_1_VERBAL_RULE_7 = 'sunnahs.worship.1.verbal.rule7',
  SUNNAHS_worship_1_VERBAL_RULE_8 = 'sunnahs.worship.1.verbal.rule8',
  SUNNAHS_worship_1_ACTIONAL_RULE_1 = 'sunnahs.worship.1.actional.rule1',

  SUNNAHS_worship_2_TITLE = 'sunnahs.worship.2.title',
  SUNNAHS_worship_2_VERBAL_RULE_1 = 'sunnahs.worship.2.verbal.rule1',

  SUNNAHS_worship_3_TITLE = 'sunnahs.worship.3.title',
  SUNNAHS_worship_3_VERBAL_RULE_1 = 'sunnahs.worship.3.verbal.rule1',

  SUNNAHS_worship_4_TITLE = 'sunnahs.worship.4.title',
  SUNNAHS_worship_4_VERBAL_RULE_1 = 'sunnahs.worship.4.verbal.rule1',
  SUNNAHS_worship_4_VERBAL_RULE_2 = 'sunnahs.worship.4.verbal.rule2',
  SUNNAHS_worship_4_ACTIONAL_RULE_1 = 'sunnahs.worship.5.actional.rule1',

  SUNNAHS_worship_5_TITLE = 'sunnahs.worship.5.title',
  SUNNAHS_worship_5_VERBAL_RULE_1 = 'sunnahs.worship.5.verbal.rule1',
  SUNNAHS_worship_5_ACTIONAL_RULE_1 = 'sunnahs.worship.5.actional.rule1',

  SUNNAHS_worship_6_TITLE = 'sunnahs.worship.6.title',
  SUNNAHS_worship_6_VERBAL_RULE_1 = 'sunnahs.worship.6.verbal.rule1',

  SUNNAHS_worship_7_TITLE = 'sunnahs.worship.7.title',
  SUNNAHS_worship_7_ACTIONAL_RULE_1 = 'sunnahs.worship.7.actional.rule1',
  SUNNAHS_worship_7_ACTIONAL_RULE_2 = 'sunnahs.worship.7.actional.rule2',
  SUNNAHS_worship_7_ACTIONAL_RULE_3 = 'sunnahs.worship.7.actional.rule3',
  SUNNAHS_worship_7_ACTIONAL_RULE_4 = 'sunnahs.worship.7.actional.rule4',
  SUNNAHS_worship_7_ACTIONAL_RULE_5 = 'sunnahs.worship.7.actional.rule5',
  


  SUNNAHS_worship_8_TITLE = 'sunnahs.worship.8.title',
  SUNNAHS_worship_8_VERBAL_RULE_1 = 'sunnahs.worship.8.verbal.rule1',
  SUNNAHS_worship_8_VERBAL_RULE_2 = 'sunnahs.worship.8.verbal.rule2',
  SUNNAHS_worship_8_VERBAL_RULE_3 = 'sunnahs.worship.8.verbal.rule3',
  SUNNAHS_worship_8_VERBAL_RULE_4 = 'sunnahs.worship.8.verbal.rule4',
  SUNNAHS_worship_8_VERBAL_RULE_5 = 'sunnahs.worship.8.verbal.rule5',
  SUNNAHS_worship_8_VERBAL_RULE_6 = 'sunnahs.worship.8.verbal.rule6',

  SUNNAHS_worship_9_TITLE = 'sunnahs.worship.9.title',
  SUNNAHS_worship_9_VERBAL_RULE_1 = 'sunnahs.worship.9.verbal.rule1',

  SUNNAHS_worship_10_TITLE = 'sunnahs.worship.10.title',
  SUNNAHS_worship_10_VERBAL_RULE_1 = 'sunnahs.worship.10.verbal.rule1',

  SUNNAHS_worship_11_TITLE = 'sunnahs.worship.11.title',
  SUNNAHS_worship_11_VERBAL_RULE_1 = 'sunnahs.worship.11.verbal.rule1',

  SUNNAHS_worship_12_TITLE = 'sunnahs.worship.12.title',
  SUNNAHS_worship_12_VERBAL_RULE_1 = 'sunnahs.worship.12.verbal.rule1',

  SUNNAHS_worship_13_TITLE = 'sunnahs.worship.13.title',
  SUNNAHS_worship_13_VERBAL_RULE_1 = 'sunnahs.worship.13.verbal.rule1',

  SUNNAHS_worship_14_TITLE = 'sunnahs.worship.14.title',
  SUNNAHS_worship_14_VERBAL_RULE_1 = 'sunnahs.worship.14.verbal.rule1',


 //  truths sunnahs

 SUNNAHS_truths_INTRODUCTION = 'sunnahs.truths.introduction',
 SUNNAHS_truths_1_TITLE = 'sunnahs.truth.1.title',
 SUNNAHS_truths_1_ACTIONAL_RULE_1 = 'sunnahs.truths.1.actional.rule1',

 SUNNAHS_truths_2_TITLE = 'sunnahs.truth.2.title',
 SUNNAHS_truths_2_ACTIONAL_RULE_1 = 'sunnahs.truths.2.actional.rule1',

 SUNNAHS_truths_3_TITLE = 'sunnahs.truth.3.title',
 SUNNAHS_truths_3_ACTIONAL_RULE_1 = 'sunnahs.truths.3.actional.rule1',

 SUNNAHS_truths_4_TITLE = 'sunnahs.truth.4.title',
 SUNNAHS_truths_4_ACTIONAL_RULE_1 = 'sunnahs.truths.4.actional.rule1',


 SUNNAHS_truths_5_TITLE = 'sunnahs.truth.5.title',
 SUNNAHS_truths_5_ACTIONAL_RULE_1 = 'sunnahs.truths.5.actional.rule1',
 SUNNAHS_truths_5_ACTIONAL_RULE_2 = 'sunnahs.truths.5.actional.rule2',
 SUNNAHS_truths_5_ACTIONAL_RULE_3 = 'sunnahs.truths.5.actional.rule3',
 SUNNAHS_truths_5_ACTIONAL_RULE_4 = 'sunnahs.truths.5.actional.rule4',


 SUNNAHS_truths_6_TITLE = 'sunnahs.truth.6.title',
 SUNNAHS_truths_6_ACTIONAL_RULE_1 = 'sunnahs.truths.6.actional.rule1',
 SUNNAHS_truths_6_ACTIONAL_RULE_2 = 'sunnahs.truths.6.actional.rule2',
 SUNNAHS_truths_6_ACTIONAL_RULE_3 = 'sunnahs.truths.6.actional.rule3',
 SUNNAHS_truths_6_ACTIONAL_RULE_4 = 'sunnahs.truths.6.actional.rule4',
 

 SUNNAHS_truths_7_TITLE = 'sunnahs.truth.7.title',
 SUNNAHS_truths_7_ACTIONAL_RULE_1 = 'sunnahs.truths.7.actional.rule1',
 SUNNAHS_truths_7_ACTIONAL_RULE_2 = 'sunnahs.truths.7.actional.rule2',
 SUNNAHS_truths_7_ACTIONAL_RULE_3 = 'sunnahs.truths.7.actional.rule3',
 SUNNAHS_truths_7_ACTIONAL_RULE_4 = 'sunnahs.truths.7.actional.rule4',
 SUNNAHS_truths_7_ACTIONAL_RULE_5 = 'sunnahs.truths.7.actional.rule5',


  
  LANGUAGE_ARABIC = 'language.arabic',
  LANGUAGE_FRENCH = 'language.french',
  LANGUAGE_ENGLISH = 'language.english',
  LANGUAGE_INDONESIAN = 'language.indonesian',
  BUTTON_YES = 'button.yes',
  BUTTON_NO = 'button.no',
  BUTTON_CLOSE = 'button.close',
  BUTTON_ADD = 'button.add',
  BUTTON_SAVE = 'button.save',
  BUTTON_CLEANING = 'button.cleaning',
  BUTTON_ENLIGHTENMENT = 'button.enlightenment',
  MENU_HOME = 'menu.home',
  MENU_PURIFICATION = 'menu.purification',
  MENU_SUNNAHS = 'menu.sunnahs',
  MENU_INVOCATIONS = 'menu.invocations',
  MENU_SETTINGS = 'menu.settings',
  SETTINGS_LANGUAGE = 'settings.app-language',
  SETTINGS_LANGUAGE_DEFAULT = 'settings.language.default',
  SETTINGS_RESET = 'settings.reset',
  PROGRESS_TITLE = 'progress.title',
  PROGRESS_START_DATE = 'progress.start-date',
  PROGRESS_END_DATE = 'progress.end-date',
  PROGRESS_SUCCESSFUL_DAYS = 'progress.successful-days',
  PROGRESS_TOTAL_DAYS = 'progress.total-days',
  PROGRESS_FAILED_ATTEMPTS = 'progress.failed-attempts',
  PROGRESS_FAILED_ATTEMPTS_RULE = 'progress.failed-attempts.rule',
  PROGRESS_FAILED_ATTEMPTS_RULE_SIMPLE = 'progress.failed-attempts.rule.simple',
  PROGRESS_START_DAILY_EVALUATION = 'progress.start-daily-evaluation',
  PROGRESS_EVALUATION_MESSAGE = 'progress.daily-evaluation.message',
  PROGRESS_EVALUATION_QUESTION = 'progress.evaluation.question',
}
