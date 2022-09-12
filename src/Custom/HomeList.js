import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const HomeList = () => {
  return (
      <SkeletonPlaceholder style={{ marginTop: 50 }}>
          <View style={{marginTop:100}}>
              <View style={{ marginTop: 20, flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
                  <View style={{ width: 60, height: 60, borderRadius: 5 }} />
                  <View style={{ marginLeft: 20 }}>
                      <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                      <View
                          style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                      />
                  </View>
              </View>
              <View style={{ width: 300, height: 20, borderRadius: 4, marginTop: 15, marginLeft: 10 }}></View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, marginHorizontal: 10 }}>
                  <View style={{ width: 120, height: 20, borderRadius: 4 }}></View>
                  <View style={{ width: 120, height: 20, borderRadius: 4 }}></View>
              </View>
          </View>
      </SkeletonPlaceholder>
  )
}

export default HomeList

const styles = StyleSheet.create({})