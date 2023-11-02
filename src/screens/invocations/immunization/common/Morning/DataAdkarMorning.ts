//import { BodyPartType } from '../../../../../domains/purification/BodyPart';
//import { TKeys } from '../../../../../immunization/common/MorningConstants';
//import { PurificationStage } from '../BodyPartsScreen';
//import { dikrType } from '../locales/dikrtype';



export enum TKeys {
  IMMUNIZATION_INTRODUCTION = 'immunization.introduction',
  IMMUNIZATION_MORNING_1 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_1_ND ='10',
  IMMUNIZATION_MORNING_2 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_2_ND ='1',
  IMMUNIZATION_MORNING_3 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_3_ND ='1',
  IMMUNIZATION_MORNING_4 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_4_ND ='1',
  IMMUNIZATION_MORNING_5 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_5_ND ='1',
  IMMUNIZATION_MORNING_6= 'immunization.morning.1',
  IMMUNIZATION_MORNING_6_ND ='1',
  IMMUNIZATION_MORNING_7 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_7_ND ='7',
  IMMUNIZATION_MORNING_8 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_8_ND ='3',
  IMMUNIZATION_MORNING_9 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_9_ND ='1',
  IMMUNIZATION_MORNING_10 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_10_ND ='3',
  IMMUNIZATION_MORNING_11 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_11_ND ='3',
  IMMUNIZATION_MORNING_12 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_12_ND ='1',
  IMMUNIZATION_MORNING_13 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_13_ND ='3',
  IMMUNIZATION_MORNING_14 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_14_ND ='1',
  IMMUNIZATION_MORNING_15 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_15_ND ='3',
  IMMUNIZATION_MORNING_16 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_16_ND ='3',
  IMMUNIZATION_MORNING_17 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_17_ND ='3',
  IMMUNIZATION_MORNING_18 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_18_ND ='1',
  IMMUNIZATION_MORNING_19 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_19_ND ='3',
  IMMUNIZATION_MORNING_20 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_20_ND ='3',
  IMMUNIZATION_MORNING_21 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_21_ND ='3',
  IMMUNIZATION_MORNING_22 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_22_ND ='3',
  IMMUNIZATION_MORNING_23 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_23_ND ='4',
  IMMUNIZATION_MORNING_24 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_24_ND ='3',
  IMMUNIZATION_MORNING_25 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_25_ND ='3',
  IMMUNIZATION_MORNING_26 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_26_ND ='3',
  IMMUNIZATION_MORNING_27 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_27_ND ='3',
  IMMUNIZATION_MORNING_28 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_28_ND ='3',
  IMMUNIZATION_MORNING_29 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_29_ND ='3',
  IMMUNIZATION_MORNING_30 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_30_ND ='3',
  IMMUNIZATION_MORNING_31 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_31_ND ='3',
  IMMUNIZATION_MORNING_32 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_32_ND ='3',
  IMMUNIZATION_MORNING_33 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_33_ND ='3',
  IMMUNIZATION_MORNING_34 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_34_ND ='3',
  IMMUNIZATION_MORNING_35 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_35_ND ='3',
  IMMUNIZATION_MORNING_36 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_36_ND ='3',
  IMMUNIZATION_MORNING_37 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_37_ND ='3',
  IMMUNIZATION_MORNING_38 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_38_ND ='3',
  IMMUNIZATION_MORNING_39 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_39_ND ='1',
  IMMUNIZATION_MORNING_40 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_40_ND ='3',
  IMMUNIZATION_MORNING_41 = 'immunization.morning.1',
  IMMUNIZATION_MORNING_41_ND ='1',




}

//  Data

 type DikrType = 'morning';

export const dikrM: Record<number, Record<DikrType,string[]>> = {
  
  1: {
      morning:[
          TKeys.IMMUNIZATION_MORNING_1,
          TKeys.IMMUNIZATION_MORNING_1_ND
          
        ],
      },
  
      2: {
        morning:[
              TKeys.IMMUNIZATION_MORNING_2,
              TKeys.IMMUNIZATION_MORNING_2_ND
          ],
          
        },
      3: {
          morning:[
                TKeys.IMMUNIZATION_MORNING_3,
                TKeys.IMMUNIZATION_MORNING_3_ND
            ],
            
          },

      4: {
          morning:[
                 TKeys.IMMUNIZATION_MORNING_4,
                  TKeys.IMMUNIZATION_MORNING_4_ND
              ],
              
           },
     5: {
           morning:[
                  TKeys.IMMUNIZATION_MORNING_5,
                  TKeys.IMMUNIZATION_MORNING_5_ND
              ],
            },

      6: {
           morning:[
                   TKeys.IMMUNIZATION_MORNING_6,
                   TKeys.IMMUNIZATION_MORNING_6_ND
               ],
           },           
          
      7: {
           morning:[
                  TKeys.IMMUNIZATION_MORNING_7,
                  TKeys.IMMUNIZATION_MORNING_7_ND
               ],
            },      
            
      8: {
           morning:[
                  TKeys.IMMUNIZATION_MORNING_8,
                  TKeys.IMMUNIZATION_MORNING_8_ND
               ],
            },      

      9: {
            morning:[
                    TKeys.IMMUNIZATION_MORNING_9,
                    TKeys.IMMUNIZATION_MORNING_9_ND
                ],
           },      


       10: {
              morning:[
                    TKeys.IMMUNIZATION_MORNING_10,
                    TKeys.IMMUNIZATION_MORNING_10_ND
                ],
           },      
           
        11: {
              morning:[
                      TKeys.IMMUNIZATION_MORNING_11,
                      TKeys.IMMUNIZATION_MORNING_11_ND
                 ],
            },      
    
        12: {
               morning:[
                       TKeys.IMMUNIZATION_MORNING_12,
                      TKeys.IMMUNIZATION_MORNING_12_ND
                  ],
           },      

        13: {
               morning:[
                         TKeys.IMMUNIZATION_MORNING_13,
                        TKeys.IMMUNIZATION_MORNING_13_ND
                   ],
            },     
            
        14: {
               morning:[
                          TKeys.IMMUNIZATION_MORNING_14,
                          TKeys.IMMUNIZATION_MORNING_14_ND
                   ],
             },      

         15: {
               morning:[
                            TKeys.IMMUNIZATION_MORNING_15,
                            TKeys.IMMUNIZATION_MORNING_15_ND
                    ],
            },    
                                  
         16: {
               morning:[
                             TKeys.IMMUNIZATION_MORNING_16,
                            TKeys.IMMUNIZATION_MORNING_16_ND
                     ],
             },     
                                  
         17: {
               morning:[
                            TKeys.IMMUNIZATION_MORNING_17,
                             TKeys.IMMUNIZATION_MORNING_17_ND
                     ],
             },      

         18: {
              morning:[
                             TKeys.IMMUNIZATION_MORNING_18,
                             TKeys.IMMUNIZATION_MORNING_18_ND
                       ],
                      
             },      

          19: {
               morning:[
                              TKeys.IMMUNIZATION_MORNING_19,
                               TKeys.IMMUNIZATION_MORNING_19_ND
                      ],
             },      
           20: {
               morning:[
                               TKeys.IMMUNIZATION_MORNING_20,
                              TKeys.IMMUNIZATION_MORNING_20_ND
                      ],
              },      
 
           21: {
               morning:[
                               TKeys.IMMUNIZATION_MORNING_21,
                              TKeys.IMMUNIZATION_MORNING_21_ND
                       ],
               },      

          22: {
               morning:[
                               TKeys.IMMUNIZATION_MORNING_22,
                               TKeys.IMMUNIZATION_MORNING_22_ND
                        ],
               },      

         23: {
                 morning:[
                                TKeys.IMMUNIZATION_MORNING_23,
                              TKeys.IMMUNIZATION_MORNING_23_ND
                            ],                            
               },                                       
         24: {
                morning:[
                               TKeys.IMMUNIZATION_MORNING_24,
                             TKeys.IMMUNIZATION_MORNING_24_ND
                           ],                            
              },                                       

        25: {
                morning:[
                               TKeys.IMMUNIZATION_MORNING_25,
                             TKeys.IMMUNIZATION_MORNING_25_ND
                           ],                            
              },                                       
         26: {
                morning:[
                               TKeys.IMMUNIZATION_MORNING_26,
                             TKeys.IMMUNIZATION_MORNING_26_ND
                           ],                            
              },                                       
        27: {
                morning:[
                               TKeys.IMMUNIZATION_MORNING_27,
                             TKeys.IMMUNIZATION_MORNING_27_ND
                           ],                            
              },                                       
        28: {
                morning:[
                               TKeys.IMMUNIZATION_MORNING_28,
                             TKeys.IMMUNIZATION_MORNING_28_ND
                           ],                            
              },                                       

       29: {
                morning:[
                               TKeys.IMMUNIZATION_MORNING_29,
                             TKeys.IMMUNIZATION_MORNING_29_ND
                           ],                            
              },                                       

       30: {
                morning:[
                               TKeys.IMMUNIZATION_MORNING_30,
                             TKeys.IMMUNIZATION_MORNING_30_ND
                           ],                            
              },                                       
       31: {
                morning:[
                               TKeys.IMMUNIZATION_MORNING_31,
                             TKeys.IMMUNIZATION_MORNING_31_ND
                           ],                            
              },                                       
       32: {
                morning:[
                               TKeys.IMMUNIZATION_MORNING_32,
                             TKeys.IMMUNIZATION_MORNING_32_ND
                           ],                            
              },                                       
       33: {
                morning:[
                               TKeys.IMMUNIZATION_MORNING_33,
                             TKeys.IMMUNIZATION_MORNING_33_ND
                           ],                            
              },                                       
       34: {
                morning:[
                               TKeys.IMMUNIZATION_MORNING_34,
                             TKeys.IMMUNIZATION_MORNING_34_ND
                           ],                            
              },                                       
        35: {
                morning:[
                               TKeys.IMMUNIZATION_MORNING_35,
                             TKeys.IMMUNIZATION_MORNING_35_ND
                           ],                            
              },                                       

       36: {
                morning:[
                               TKeys.IMMUNIZATION_MORNING_36,
                             TKeys.IMMUNIZATION_MORNING_36_ND
                           ],                            
              },                                       
       37: {
                morning:[
                               TKeys.IMMUNIZATION_MORNING_37,
                             TKeys.IMMUNIZATION_MORNING_37_ND
                           ],                            
              },
       38: {
                morning:[
                               TKeys.IMMUNIZATION_MORNING_38,
                             TKeys.IMMUNIZATION_MORNING_38_ND
                           ],                            
              },                                       
        39: {
                morning:[
                               TKeys.IMMUNIZATION_MORNING_39,
                             TKeys.IMMUNIZATION_MORNING_39_ND
                           ],                            
              },                                                                         
        40: {
                morning:[
                               TKeys.IMMUNIZATION_MORNING_40,
                             TKeys.IMMUNIZATION_MORNING_40_ND
                           ],                            
              },                                       
        41: {
                morning:[
                               TKeys.IMMUNIZATION_MORNING_41,
                             TKeys.IMMUNIZATION_MORNING_41_ND
                           ],                            
              },                                       


}  


    
