import React from "react";
import { View, StyleSheet } from "react-native";
import { LineChart } from "react-native-gifted-charts"

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { Colors } from '../../../constants/styles';

export default function ProgrssionGraph() {

  const lineData = [
      {value: 0, label: 'Mon'},
      {value: 20, label: 'Tue'},
      {value: 18, label: 'Wed'},
      {value: 40, label: 'Thu'},
      {value: 36, label: 'Fri'},
      {value: 60, label: 'Sat'},
      {value: 54, label: 'Sun'}
  ];

  return (
      <View style={styles.container}>
          <LineChart
              initialSpacing={0}
              data={lineData}
              spacing={wp('14%')}
              textColor1="yellow"
              textShiftY={-8}
              textShiftX={-10}
              textFontSize={13}
              thickness={8}
              hideRules
              hideYAxisText
              yAxisColor={Colors.neutral1100}
              showVerticalLines
              verticalLinesColor={Colors.primary800}
              xAxisColor={Colors.neutral1100}
              color={Colors.primary600}
              height={125}
          />
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width: wp('90%'),
        height: hp('20%'),
        justifyContent: 'center',
        alignItems: 'center'
    }
})