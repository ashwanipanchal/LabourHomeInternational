import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBarLight } from './CustomStatusBar';
import AppHeader from './CustomAppHeader';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const JobList = (navigation) => {
  return (
    <View>
      <View style={styles.subBox}>
        <SkeletonPlaceholder>
          <View style={{ marginTop: 15, flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
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
        </SkeletonPlaceholder>
      </View>
      <View style={styles.subBox}>
        <SkeletonPlaceholder>
          <View style={{ marginTop: 15, flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
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
        </SkeletonPlaceholder>
      </View>
      <View style={styles.subBox}>
        <SkeletonPlaceholder>
          <View style={{ marginTop: 15, flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
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
        </SkeletonPlaceholder>
      </View>
      <View style={styles.subBox}>
        <SkeletonPlaceholder>
          <View style={{ marginTop: 15, flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
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
        </SkeletonPlaceholder>
      </View>
      <View style={styles.subBox}>
        <SkeletonPlaceholder>
          <View style={{ marginTop: 15, flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
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
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <View style={{ marginTop: 15, flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
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
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <View style={{ marginTop: 15, flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
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
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <View style={{ marginTop: 15, flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
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
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <View style={{ marginTop: 15, flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
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
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <View style={{ marginTop: 15, flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
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
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <View style={{ marginTop: 15, flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
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
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <View style={{ marginTop: 15, flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
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
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <View style={{ marginTop: 15, flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
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
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <View style={{ marginTop: 15, flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
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
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <View style={{ marginTop: 15, flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
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
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <View style={{ marginTop: 15, flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
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
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <View style={{ marginTop: 15, flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
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
        </SkeletonPlaceholder>
      </View>
    </View>

  )
}

export default JobList

const styles = StyleSheet.create({
  subBox: {
    padding: 10,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 5,
  },
})