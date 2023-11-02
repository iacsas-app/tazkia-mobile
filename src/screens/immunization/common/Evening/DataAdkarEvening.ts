//import { BodyPartType } from '../../../../../domains/purification/BodyPart';
//import { TKeys } from '../../../../../immunization/common/MorningConstants';
//import { PurificationStage } from '../BodyPartsScreen';
//import { dikrType } from '../locales/dikrtype';



export enum TKeys {
  IMMUNIZATION_INTRODUCTION = 'immunization.introduction',
  IMMUNIZATION_EVENING_1 = 'immunization.evening.1',
  IMMUNIZATION_EVENING_1_ND ='10',
  IMMUNIZATION_EVENING_2 = 'immunization.evening.2',
  IMMUNIZATION_EVENING_2_ND = '1',
  IMMUNIZATION_EVENING_3 = 'immunization.evening.3',
  IMMUNIZATION_EVENING_3_ND = '1',
  IMMUNIZATION_EVENING_4= 'immunization.evening.4',
  IMMUNIZATION_EVENING_4_ND = '1',
  IMMUNIZATION_EVENING_5 = 'immunization.evening.5',
  IMMUNIZATION_EVENING_5_ND = '1',
  IMMUNIZATION_EVENING_6 = 'immunization.evening.6',
  IMMUNIZATION_EVENING_6_ND = '1',
  IMMUNIZATION_EVENING_7 = 'immunization.evening.7',
  IMMUNIZATION_EVENING_7_ND = '7',
  IMMUNIZATION_EVENING_8 = 'immunization.evening.8',
  IMMUNIZATION_EVENING_8_ND = '3',
  IMMUNIZATION_EVENING_9 = 'immunization.evening.9',
  IMMUNIZATION_EVENING_9_ND = '3',
  IMMUNIZATION_EVENING_10 = 'immunization.evening.10',
  IMMUNIZATION_EVENING_10_ND = '3',
  IMMUNIZATION_EVENING_11 = 'immunization.evening.11',
  IMMUNIZATION_EVENING_11_ND = '3',
  IMMUNIZATION_EVENING_12 = 'immunization.evening.12',
  IMMUNIZATION_EVENING_12_ND = '1',
  IMMUNIZATION_EVENING_13 = 'immunization.evening.13',
  IMMUNIZATION_EVENING_13_ND = '3',
  IMMUNIZATION_EVENING_14 = 'immunization.evening.14',
  IMMUNIZATION_EVENING_14_ND = '1',
  IMMUNIZATION_EVENING_15 = 'immunization.evening.15',
  IMMUNIZATION_EVENING_15_ND = '3',
  IMMUNIZATION_EVENING_16 = 'immunization.evening.16',
  IMMUNIZATION_EVENING_16_ND = '3',
  IMMUNIZATION_EVENING_17 = 'immunization.evening.17',
  IMMUNIZATION_EVENING_17_ND = '3',
  IMMUNIZATION_EVENING_18 = 'immunization.evening.18',
  IMMUNIZATION_EVENING_18_ND = '1',
  IMMUNIZATION_EVENING_19 = 'immunization.evening.19',
  IMMUNIZATION_EVENING_19_ND = '3',
  IMMUNIZATION_EVENING_20 = 'immunization.evening.20',
  IMMUNIZATION_EVENING_20_ND = '3',
  IMMUNIZATION_EVENING_21 = 'immunization.evening.21',
  IMMUNIZATION_EVENING_21_ND = '3',
  IMMUNIZATION_EVENING_22 = 'immunization.evening.22',
  IMMUNIZATION_EVENING_22_ND = '3',
  IMMUNIZATION_EVENING_23 = 'immunization.evening.23',
  IMMUNIZATION_EVENING_23_ND = '3',
  IMMUNIZATION_EVENING_24 = 'immunization.evening.24',
  IMMUNIZATION_EVENING_24_ND = '4',
  IMMUNIZATION_EVENING_25 = 'immunization.evening.25',
  IMMUNIZATION_EVENING_25_ND = '3',
  IMMUNIZATION_EVENING_26 = 'immunization.evening.26',
  IMMUNIZATION_EVENING_26_ND = '3',
  IMMUNIZATION_EVENING_27 = 'immunization.evening.27',
  IMMUNIZATION_EVENING_27_ND = '3',
  IMMUNIZATION_EVENING_28 = 'immunization.evening.28',
  IMMUNIZATION_EVENING_28_ND = '3',
  IMMUNIZATION_EVENING_29 = 'immunization.evening.29',
  IMMUNIZATION_EVENING_29_ND = '3',
  IMMUNIZATION_EVENING_30 = 'immunization.evening.30',
  IMMUNIZATION_EVENING_30_ND = '3',
  IMMUNIZATION_EVENING_31 = 'immunization.evening.31',
  IMMUNIZATION_EVENING_31_ND = '3',
  IMMUNIZATION_EVENING_32 = 'immunization.evening.32',
  IMMUNIZATION_EVENING_32_ND = '3',
  IMMUNIZATION_EVENING_33 = 'immunization.evening.33',
  IMMUNIZATION_EVENING_33_ND = '3',
  IMMUNIZATION_EVENING_34 = 'immunization.evening.34',
  IMMUNIZATION_EVENING_34_ND = '3',
  IMMUNIZATION_EVENING_35 = 'immunization.evening.35',
  IMMUNIZATION_EVENING_35_ND = '3',
  IMMUNIZATION_EVENING_36 = 'immunization.evening.36',
  IMMUNIZATION_EVENING_36_ND = '3',
  IMMUNIZATION_EVENING_37 = 'immunization.evening.37',
  IMMUNIZATION_EVENING_37_ND = '3',
  IMMUNIZATION_EVENING_38 = 'immunization.evening.38',
  IMMUNIZATION_EVENING_38_ND = '3',
  IMMUNIZATION_EVENING_39 = 'immunization.evening.39',
  IMMUNIZATION_EVENING_39_ND = '3',
  IMMUNIZATION_EVENING_40 = 'immunization.evening.40',
  IMMUNIZATION_EVENING_40_ND = '1',
  IMMUNIZATION_EVENING_41 = 'immunization.evening.41',
  IMMUNIZATION_EVENING_41_ND = '3',
  IMMUNIZATION_EVENING_42 = 'immunization.evening.42',
  IMMUNIZATION_EVENING_42_ND = '1',
  IMMUNIZATION_CONCLUSION = 'immunization.CONCLUSION',




}

//  Data

 type DikrType = 'evening';

export const dikrE: Record<number, Record<DikrType,string[]>> = {
  
  1: {
      evening:[
          TKeys.IMMUNIZATION_EVENING_1,
          TKeys.IMMUNIZATION_EVENING_1_ND
          
        ],
      },
  2: {
      evening:[
            TKeys.IMMUNIZATION_EVENING_2,
            TKeys.IMMUNIZATION_EVENING_2_ND
        ],
        
      },
      3: {
        evening:[
              TKeys.IMMUNIZATION_EVENING_3,
              TKeys.IMMUNIZATION_EVENING_3_ND
          ],
          
        },

    4: {
      evening:[
               TKeys.IMMUNIZATION_EVENING_4,
                TKeys.IMMUNIZATION_EVENING_4_ND
            ],
            
         },
   5: {
    evening :[
                TKeys.IMMUNIZATION_EVENING_5,
                TKeys.IMMUNIZATION_EVENING_5_ND
            ],
          },

    6: {
      evening:[
                 TKeys.IMMUNIZATION_EVENING_6,
                 TKeys.IMMUNIZATION_EVENING_6_ND
             ],
         },           
        
    7: {
      evening:[
                TKeys.IMMUNIZATION_EVENING_7,
                TKeys.IMMUNIZATION_EVENING_7_ND
             ],
          },      
          
    8: {
      evening:[
                TKeys.IMMUNIZATION_EVENING_8,
                TKeys.IMMUNIZATION_EVENING_8_ND
             ],
          },      

    9: {
      evening:[
                  TKeys.IMMUNIZATION_EVENING_9,
                  TKeys.IMMUNIZATION_EVENING_9_ND
              ],
         },      


     10: {
      evening:[
                  TKeys.IMMUNIZATION_EVENING_10,
                  TKeys.IMMUNIZATION_EVENING_10_ND
              ],
         },      
         
      11: {
        evening:[
                    TKeys.IMMUNIZATION_EVENING_11,
                    TKeys.IMMUNIZATION_EVENING_11_ND
               ],
          },      
  
      12: {
        evening:[
                     TKeys.IMMUNIZATION_EVENING_12,
                    TKeys.IMMUNIZATION_EVENING_12_ND
                ],
         },      

      13: {
        evening:[
                       TKeys.IMMUNIZATION_EVENING_13,
                      TKeys.IMMUNIZATION_EVENING_13_ND
                 ],
          },     
          
      14: {
        evening:[
                        TKeys.IMMUNIZATION_EVENING_14,
                        TKeys.IMMUNIZATION_EVENING_14_ND
                 ],
           },      

       15: {
        evening:[
                          TKeys.IMMUNIZATION_EVENING_15,
                          TKeys.IMMUNIZATION_EVENING_15_ND
                  ],
          },    
                                
       16: {
        evening:[
                           TKeys.IMMUNIZATION_EVENING_16,
                          TKeys.IMMUNIZATION_EVENING_16_ND
                   ],
           },     
                                
       17: {
        evening:[
                          TKeys.IMMUNIZATION_EVENING_17,
                           TKeys.IMMUNIZATION_EVENING_17_ND
                   ],
           },      

       18: {
        evening:[
                           TKeys.IMMUNIZATION_EVENING_18,
                           TKeys.IMMUNIZATION_EVENING_18_ND
                     ],
                    
           },      

        19: {
          evening:[
                            TKeys.IMMUNIZATION_EVENING_19,
                             TKeys.IMMUNIZATION_EVENING_19_ND
                    ],
           },      
         20: {
          evening:[
                             TKeys.IMMUNIZATION_EVENING_20,
                            TKeys.IMMUNIZATION_EVENING_20_ND
                    ],
            },      

         21: {
          evening:[
                             TKeys.IMMUNIZATION_EVENING_21,
                            TKeys.IMMUNIZATION_EVENING_21_ND
                     ],
             },      

        22: {
          evening:[
                             TKeys.IMMUNIZATION_EVENING_22,
                             TKeys.IMMUNIZATION_EVENING_22_ND
                      ],
             },      

       23: {
        evening:[
                              TKeys.IMMUNIZATION_EVENING_23,
                            TKeys.IMMUNIZATION_EVENING_23_ND
                          ],                            
             },                                       
       24: {
        evening:[
                             TKeys.IMMUNIZATION_EVENING_24,
                           TKeys.IMMUNIZATION_EVENING_24_ND
                         ],                            
            },                                       

      25: {
        evening:[
                             TKeys.IMMUNIZATION_EVENING_25,
                           TKeys.IMMUNIZATION_EVENING_25_ND
                         ],                            
            },                                       
       26: {
        evening:[
                             TKeys.IMMUNIZATION_EVENING_26,
                           TKeys.IMMUNIZATION_EVENING_26_ND
                         ],                            
            },                                       
      27: {
        evening:[
                             TKeys.IMMUNIZATION_EVENING_27,
                           TKeys.IMMUNIZATION_EVENING_27_ND
                         ],                            
            },                                       
      28: {
        evening:[
                             TKeys.IMMUNIZATION_EVENING_28,
                           TKeys.IMMUNIZATION_EVENING_28_ND
                         ],                            
            },                                       

     29: {
      evening:[
                             TKeys.IMMUNIZATION_EVENING_29,
                           TKeys.IMMUNIZATION_EVENING_29_ND
                         ],                            
            },                                       

     30: {
      evening:[
                             TKeys.IMMUNIZATION_EVENING_30,
                           TKeys.IMMUNIZATION_EVENING_30_ND
                         ],                            
            },                                       
     31: {
      evening:[
                             TKeys.IMMUNIZATION_EVENING_31,
                           TKeys.IMMUNIZATION_EVENING_31_ND
                         ],                            
            },                                       
     32: {
      evening:[
                             TKeys.IMMUNIZATION_EVENING_32,
                           TKeys.IMMUNIZATION_EVENING_32_ND
                         ],                            
            },                                       
     33: {
      evening:[
                             TKeys.IMMUNIZATION_EVENING_33,
                           TKeys.IMMUNIZATION_EVENING_33_ND
                         ],                            
            },                                       
     34: {
      evening:[
                             TKeys.IMMUNIZATION_EVENING_34,
                           TKeys.IMMUNIZATION_EVENING_34_ND
                         ],                            
            },                                       
      35: {
        evening:[
                             TKeys.IMMUNIZATION_EVENING_35,
                           TKeys.IMMUNIZATION_EVENING_35_ND
                         ],                            
            },                                       

     36: {
      evening:[
                             TKeys.IMMUNIZATION_EVENING_36,
                           TKeys.IMMUNIZATION_EVENING_36_ND
                         ],                            
            },                                       
     37: {
      evening:[
                             TKeys.IMMUNIZATION_EVENING_37,
                           TKeys.IMMUNIZATION_EVENING_37_ND
                         ],                            
            },
     38: {
      evening:[
                             TKeys.IMMUNIZATION_EVENING_38,
                           TKeys.IMMUNIZATION_EVENING_38_ND
                         ],                            
            },                                       
      39: {
        evening:[
                             TKeys.IMMUNIZATION_EVENING_39,
                           TKeys.IMMUNIZATION_EVENING_39_ND
                         ],                            
            },                                                                         
      40: {
        evening:[
                             TKeys.IMMUNIZATION_EVENING_40,
                           TKeys.IMMUNIZATION_EVENING_40_ND
                         ],                            
            },                                       
      41: {
        evening:[
                             TKeys.IMMUNIZATION_EVENING_41,
                           TKeys.IMMUNIZATION_EVENING_41_ND
                         ],                            
            },                                       


}  


  






























































    